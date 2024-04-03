/**
 * Enum for chat message actions.
 */
enum WebSocketChatAction {
  /** Send chat message by Ad ID. */
  SEND_AD_MESSAGE = "SEND_AD_MESSAGE",
  /** New chat message in room. */
  ROOM_MESSAGE = "ROOM_MESSAGE",
  /** New room created. */
  ROOM_CREATED = "ROOM_CREATED",
}

export default WebSocketChatAction;
