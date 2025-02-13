import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const addScreenshot = async (req: Request, res: Response) => {
  try {
    const screenshots = await prisma.screenshot.create({ data: req.body });
    res.status(201).json(screenshots);
  } catch (error) {
    res.status(500).json({ error: "Error add screenshot" });
  }
};

export const getScreenshotsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const screenshots = await prisma.screenshot.findMany({
      where: { gameId: parseInt(id) },
    });
    res.status(200).json(screenshots);
  } catch (error) {
    res.status(500).json({ error: "Error get screenshots" });
  }
}
