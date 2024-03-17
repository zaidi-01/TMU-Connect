import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { default as asyncHandler } from "express-async-handler";
import { AdDetailsDto } from "./models";

/** Prisma client */
const prisma = new PrismaClient();

/** Ad controller */

/**
 * Get ad details
 * @param req Request
 * @param res Response
 */
export const getAdDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const ad = (await prisma.ad.findUnique({
      where: {
        id: parseInt(id),
      },
    })) as AdDetailsDto;

    if (!ad) {
      res.status(404);
      throw new Error("Ad not found");
    }

    res.status(200).json(ad);
  }
);
