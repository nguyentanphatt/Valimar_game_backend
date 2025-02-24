import { Request, Response } from "express";
import prisma from "../models/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error signup" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(400).json({ error: "Email not found" });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(400).json({ error: "Invalid password" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

export const userProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const userLoginWithOath = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, name, image, provider } = req.body;

  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { name, email, image },
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("OAuth login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const changeSubcriptionOfUser = async (
  req: Request,
  res: Response
): Promise<void> => {

  const { email } = req.params;
  const { newPlan } = req.body;

  const plans = ["free", "pathfinder", "trailblazer", "luminary"]

  if(!plans.includes(newPlan)){
    res.status(400).json({ error: "Invalid subscription plan" });
    return;
  }

  try {
    const user  = await prisma.user.findUnique({where: {email}})
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const currentPlanIndex = plans.indexOf(user.plan);
    const newPlanIndex = plans.indexOf(newPlan);
    if (newPlanIndex < currentPlanIndex) {
      res.status(400).json({ error: "Downgrading to a lower subscription is not allowed" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { plan: newPlan },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
