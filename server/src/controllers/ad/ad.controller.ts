import { Ad, PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { default as asyncHandler } from "express-async-handler";
import { AdCreateUpdateDto, AdDetailsDto, AdSearchDto } from "./models";

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
    res.sendStatus(404);
    return;
  }

  if (ad.userId !== userId) {
    res.sendStatus(403);
    return;
  }

  await prisma.ad.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.sendStatus(204);
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
      res.sendStatus(404);
      return;
    }

    res.status(200).json(ad);
  }
);

/**
 * Search ads.
 * @param req Request.
 * @param res Response.
 */
export const searchAds = asyncHandler(async (req: Request, res: Response) => {
  const { query, take, skip } = req.body as AdSearchDto;

  const ads = (await prisma.ad.findMany({
    where: {
      title: {
        contains: query,
      },
    },
    take: take,
    skip: skip,
  })) as AdDetailsDto[];

  res.status(200).json(ads);
});
