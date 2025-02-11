import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const createRequirement = async (req: Request, res: Response) => {
  try {
    const requirement = await prisma.requirement.create({ data: req.body });
    res.status(201).json(requirement);
  } catch (error) {
    res.status(500).json({ error: "Error add requirement" });
  }
};
