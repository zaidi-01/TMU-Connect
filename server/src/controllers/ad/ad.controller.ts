import { Ad, PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { default as asyncHandler } from "express-async-handler";
import { AdDetailsDto } from "./models";
import AdCreateDto from "./models/ad-create-dto.model";

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

/**
 * Create an ad
 * @param req Request
 * @param res Response
 */
export const createAd = asyncHandler(async (req: Request, res: Response) => {
  const adDto = req.body as AdCreateDto;

  const ad = {
    ...adDto,
    userId: (req.user as User).id,
  } as Ad;

  const createdAd = await prisma.ad.create({
    data: ad,
  });

  res.status(201).json(createdAd);
});
