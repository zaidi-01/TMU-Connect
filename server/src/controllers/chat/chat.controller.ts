import { WebSocketChatAction } from "@enums";
import { ExtWebSocket, WebSocketMessage } from "@interfaces";
import { roomService } from "@services";

// TODO: add models for websocket messages' data

/** Chat controller */

/**
 * Sends a message for an ad.
 * @param client The client.
 * @param message The websocket message.
 * @returns The result of the operation.
 */
export async function sendAdMessage(
  client: ExtWebSocket,
  message: WebSocketMessage<{ adId: number; content: string }>
) {
  const { adId, content } = message.data;

  if (!adId || !content) {
    client.sendError(message, "Missing data");
    return;
  }

  const room = await roomService.getOrCreateRoomByAdId(adId, client.userId);

  if (!room) {
    client.sendError(message, "Room not found");
    return;
  }

  await room.sendMessage(client.userId, content);
}

/**
 * Gets rooms.
 * @param client The client.
 * @param message The websocket message.
 * @returns The result of the operation.
 */
export async function getRooms(
  client: ExtWebSocket,
  message: WebSocketMessage
) {
  const rooms = await roomService.getRoomsData(client.userId);

  client.sendMessage({
    type: message.type,
    action: WebSocketChatAction.ROOM_LIST,
    data: rooms,
  });
}

/**
 * Sends a message in a room.
 * @param client The client.
 * @param message The websocket message.
 * @returns The result of the operation.
 */
export async function sendMessage(
  client: ExtWebSocket,
  message: WebSocketMessage<{ roomId: number; content: string }>
) {
  const { roomId, content } = message.data;

  if (!roomId || !content) {
    client.sendError(message, "Missing data");
    return;
  }

  const room = await roomService.getRoomById(roomId);

  if (!room) {
    client.sendError(message, "Room not found");
    return;
  }

  await room.sendMessage(client.userId, content);
}
