/**
 * The message object for websocket
 */
interface WebSocketMessage {
  /** The type of message */
  type: string;
  /** The action to call */
  action: string;
  /** The data to send */
  data: any;
}

export default WebSocketMessage;
