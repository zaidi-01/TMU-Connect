/**
 * Enum for chat message actions.
 */
enum WebSocketChatAction {
  /** Send a chat message by ad ID. */
  SEND_AD_MESSAGE = "SEND_AD_MESSAGE",
  /** New chat message in room. */
  ROOM_MESSAGE = "ROOM_MESSAGE",
  /** List of messages in room. */
  ROOM_MESSAGE_LIST = "ROOM_MESSAGE_LIST",
  /** New room created. */
  ROOM_CREATED = "ROOM_CREATED",
  /** List of rooms. */
  ROOM_LIST = "ROOM_LIST",
  // TODO: Add action to handle room deletion.
}

export default WebSocketChatAction;
