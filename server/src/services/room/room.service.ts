import { Room } from "@models";
import { PrismaClient } from "@prisma/client";

/** Prisma client. */

const prisma = new PrismaClient();

/** Room service. */

/**
 * Creates a room.
 * @param name The room name.
 * @param participants The participants.
 * @returns The room.
 */
export async function createRoom(
  name: string,
  adId: number,
  participants: number[]
) {
  const roomData = await prisma.room.create({
    data: {
      name,
      adId,
      RoomParticipant: {
        create: participants.map((participant) => ({
          userId: participant,
        })),
      },
    },
    select: {
      id: true,
    },
  });

  return new Room(roomData.id, name, adId, participants);
}

/**
 * Gets a room by ID.
 * @param roomId The room ID.
 */
export async function getRoomById(roomId: number) {
  const roomData = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    select: {
      id: true,
      name: true,
      adId: true,
      RoomParticipant: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!roomData) {
    return null;
  }

  return new Room(
    roomData.id,
    roomData.name,
    roomData.adId,
    roomData.RoomParticipant.map((p) => p.userId)
  );
}

/**
 * Gets all rooms' data for a user.
 * @param userId The user ID.
 */
export async function getRoomsData(userId: number) {
  const roomsData = await prisma.room.findMany({
    where: {
      RoomParticipant: {
        some: {
          userId,
        },
      },
    },
  });

  return roomsData;
}
