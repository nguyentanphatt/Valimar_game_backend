import { Request, Response } from "express";
import prisma from "../models/prismaClient";
import { GameData } from "../constant/types";

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany()
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Error get all game" + error });
  }
};

export const createGame = async (req: Request, res: Response) => {
  const gameData: GameData = req.body;
  try {
    const game = await prisma.game.create({
      data: {
        ...gameData,
        requirements: { create: gameData.requirements },
        screenshots: { create: gameData.screenshots },
      },
      include: {
        requirements: true,
        screenshots: true,
      },
    });
    res.status(201).json(game);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ error: "Error add game" });
  }
};
