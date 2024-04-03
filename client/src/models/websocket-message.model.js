// eslint-disable-next-line no-unused-vars
import { WebSocketMessageType } from "@/enums";

/**
 * The message object for websocket.
 * @template T
 */
class WebSocketMessage {
  /**
   * The type of message.
   * @type {WebSocketMessageType}
   */
  type;
  /**
   * The action to call.
   * @type {string}
   */
  action;
  /**
   * The data to send.
   * @type {T}
   */
  data;
}

export default WebSocketMessage;
