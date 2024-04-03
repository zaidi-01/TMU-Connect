/**
 * Enum for WebSocket chat actions.
 */
const WebSocketChatAction = {
  /** Send a chat message by ad ID. */
  SEND_AD_MESSAGE: "SEND_AD_MESSAGE",
  /** New chat message in room. */
  ROOM_MESSAGE: "ROOM_MESSAGE",
  /** Request for room message list. */
  ROOM_MESSAGE_LIST: "ROOM_MESSAGE_LIST",
  /** Request for room list. */
  ROOM_LIST: "ROOM_LIST",
  /** New room created. */
  ROOM_CREATED: "ROOM_CREATED",
};

export default WebSocketChatAction;
