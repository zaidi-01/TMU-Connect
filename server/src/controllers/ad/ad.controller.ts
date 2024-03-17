import { Ad, PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { default as asyncHandler } from "express-async-handler";
import { AdCreateUpdateDto, AdDetailsDto } from "./models";

/** Prisma client */
const prisma = new PrismaClient();

/** Ad controller */

// TODO: Add error handling for all routes.

/**
 * Create an ad
 * @param req Request
 * @param res Response
 */
export const createAd = asyncHandler(async (req: Request, res: Response) => {
  const adDto = req.body as AdCreateUpdateDto;

  const ad = {
    ...adDto,
    userId: (req.user as User).id,
  } as Ad;

  const createdAd = (await prisma.ad.create({
    data: ad,
  })) as AdDetailsDto;

  res.status(201).json(createdAd);
});

/**
 * Update an ad
 * @param req Request
 * @param res Response
 */
export const updateAd = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const adDto = req.body as AdCreateUpdateDto;

  const ad = {
    ...adDto,
    userId: (req.user as User).id,
  } as Ad;

  const updatedAd = (await prisma.ad.update({
    where: {
      id: parseInt(id),
    },
    data: ad,
  })) as AdDetailsDto;

  res.status(200).json(updatedAd);
});

/**
 * Delete an ad
 * @param req Request
 * @param res Response
 */
export const deleteAd = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req.user as User).id;

  const ad = (await prisma.ad.findUnique({
    where: {
      id: parseInt(id),
    },
  })) as Ad;

  if (!ad) {
    res.status(404);
    throw new Error("Ad not found");
  }

  if (ad.userId !== userId) {
    res.status(403);
    throw new Error("Unauthorized");
  }

  await prisma.ad.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.status(204).end();
});

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
