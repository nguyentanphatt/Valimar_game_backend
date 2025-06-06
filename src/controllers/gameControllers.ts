import { Request, Response } from "express";
import prisma from "../models/prismaClient";
import { GameData } from "../constant/types";
import bcrypt from "bcrypt";

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany();
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
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "Error add game" });
  }
};

export const getGameByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const game = await prisma.game.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "Error get game by name" });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await prisma.game.findUnique({
      where: { id: parseInt(id) },
      include: {
        requirements: true,
        screenshots: true,
      },
    });
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "Error get game by id" });
  }
};

export const getGameWithDiscount = async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany({
      where: {
        discountPercent: {
          gt: 50
        }
      },
      take: 12,
    });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Error getting games with discount" });
  }
}

export const getGameNewRelease = async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany({
      where: {
        releaseDate: {
          gt: new Date("2024-05-01")
        }
      },
      take: 12,
    });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Error getting games with new release" });
  }
}

export const getGameRelevantByGenre = async (req: Request, res: Response) => {
  try {
    const { firstGenre } = req.params;
    const games = await prisma.game.findMany({
      where:{
        genre: {
          contains: firstGenre
        }
      },
      take: 12
    })
    res.status(200).json(games)
  } catch (error) {
    res.status(500).json({ error: "Error getting relevant games" });
  }
}

export const generateGameKey = async (req: Request, res: Response) => {
  const { id } = req.body
  try {
    const game = await prisma.game.findUnique({where: {id}})
    if(!game){
      res.status(200).json({error: "Game not found"})
    }
    const firstChar = game.name.split(' ')[0][0].toUpperCase()
    const randomString = Math.floor(10000000 + Math.random()*90000000)
    const key = `${firstChar}${randomString}`
    const hashKey = bcrypt.hashSync(key, 10)
    await prisma.gameKey.create({
      data: {
          gameId: id,
          key: hashKey
      }
  });
    res.status(200).json({key})
  } catch (error) {
    res.status(500).json({ error: "Error created key" });
  }
}
