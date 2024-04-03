import { MessageType } from "@enums";

/**
 * The message object for websocket.
 */
interface WebSocketMessage<T = any> {
  /** The type of message. */
  type: MessageType;
  /** The action to call. */
  action: string;
  /** The data to send. */
  data: T;
}

export default WebSocketMessage;
