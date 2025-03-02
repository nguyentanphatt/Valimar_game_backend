import { Request, Response } from "express";
import prisma from "../models/prismaClient";

export const checkPromocode = async (req: Request, res: Response): Promise<void> => {
  const { promo } = req.body;

  try {
    const currentPromocode = await prisma.promocode.findFirst({
      where: { promocode: promo },
    });

    if (!currentPromocode) {
      res.status(400).json({ error: "Invalid promocode" });
      return;
    }

    const currentDate = new Date();
    if (currentPromocode.validDate < currentDate) {
      res.status(400).json({ error: "Your promocode is expired" });
      return;
    }

    res.status(200).json({ percent: currentPromocode.percent });
    return;
  } catch (error) {
    console.error("Error checking promocode:", error);
    res.status(500).json({ error: "Error when checking promocode" });
    return;
  }
};
