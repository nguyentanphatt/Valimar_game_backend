import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const addScreenshot = async (req: Request, res: Response) => {
  try {
    const screenshot = await prisma.screenshot.create({ data: req.body });
    res.status(201).json(screenshot);
  } catch (error) {
    res.status(500).json({ error: "Error add screenshot" });
  }
};
