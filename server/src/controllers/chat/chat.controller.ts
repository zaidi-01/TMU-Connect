import { ExtWebSocket, WebSocketMessage } from "@interfaces";
import { roomService } from "@services";

// TODO: add models for websocket messages' data

/** Chat controller */

export async function sendAdMessage(
  client: ExtWebSocket,
  message: WebSocketMessage
) {
  const { adId, content } = message.data as { adId: number; content: string };

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
