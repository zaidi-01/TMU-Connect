import { WebSocket } from "ws";

/**
 * Extended WebSocket interface
 */
interface ExtWebSocket extends WebSocket {
  /** Whether the client is alive */
  isAlive: boolean;
  /** User ID */
  userId: number;
}

export default ExtWebSocket;
