// eslint-disable-next-line no-unused-vars
import { WebSocketMessageType } from "@/enums";

/**
 * The message object for websocket.
 * @template T
 */
class WebSocketMessage {
  /**
   * Initializes a new instance of the WebSocketMessage class.
   */
  constructor(type, action, data) {
    /**
     * The type of message.
     * @type {WebSocketMessageType}
     */
    this.type = type;
    /**
     * The action to call.
     * @type {string}
     */
    this.action = action;
    /**
     * The data to send.
     * @type {T}
     */
    this.data = data;
  }
}

export default WebSocketMessage;
