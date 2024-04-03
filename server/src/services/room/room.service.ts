import { MessageType, WebSocketChatAction } from "@enums";
import { Room } from "@models";
import { PrismaClient } from "@prisma/client";
import { websocketService } from "@services";

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

  participants.forEach((participant) => {
    websocketService.sendMessageToUser(participant, {
      type: MessageType.CHAT,
      action: WebSocketChatAction.ROOM_CREATED,
      data: {
        id: roomData.id,
        name,
        adId,
        participants,
      },
    });
  });

  return new Room(roomData.id, name, adId, participants);
}

/**
 * Gets or creates a room by ad ID.
 * @param adId The ad ID.
 * @param currentUserId The current user ID.
 * @returns The room.
 */
export async function getOrCreateRoomByAdId(
  adId: number,
  currentUserId: number
) {
  const roomData = await prisma.room.findFirst({
    where: {
      adId,
      RoomParticipant: {
        some: {
          userId: currentUserId,
        },
      },
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

  if (roomData) {
    return new Room(
      roomData.id,
      roomData.name,
      roomData.adId,
      roomData.RoomParticipant.map((p) => p.userId)
    );
  }

  const adData = await prisma.ad.findUnique({
    where: {
      id: adId,
    },
  });

  if (!adData) {
    return null;
  }

  return createRoom(adData.title, adId, [currentUserId, adData.userId]);
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
