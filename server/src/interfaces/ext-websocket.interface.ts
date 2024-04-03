import { WebSocket } from "ws";
import WebSocketMessage from "./websocket-message.interface";

/**
 * Extended WebSocket interface
 */
interface ExtWebSocket extends WebSocket {
  /** Whether the client is alive */
  isAlive: boolean;
  /** User ID */
  userId: number;
  /**
   * Sends a message
   * @param message The message to send
   * @param cb Callback
   */
  sendMessage<T>(message: WebSocketMessage<T>, cb?: (err?: Error) => void): void;
  /**
   * Sends an error message
   * @param message The message that caused the error
   * @param error The error
   * @param cb Callback
   */
  sendError(
    message: WebSocketMessage,
    error: string,
    cb?: (err?: Error) => void
  ): void;
}

export default ExtWebSocket;
