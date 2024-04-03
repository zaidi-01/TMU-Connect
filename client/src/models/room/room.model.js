/* eslint-disable no-unused-vars */
import { Observable } from "rxjs";
import ChatMessage from "../chat-message.model";
/* eslint-enable no-unused-vars */

// TODO: Lazy load the messages

/**
 * Represents a room.
 */
class Room {
  /** @type {Observable<ChatMessage>} */
  message$;
  /** @type {(content: string) => Promise<void>} */
  sendMessage;

  /**
   * Initializes a new instance of the Room class.
   * @param {number} roomId The room ID.
   * @param {string} name The room name.
   */
  constructor(roomId, name) {
    /** The room ID. */
    this.roomId = roomId;
    /** The room name. */
    this.name = name;
  }
}

export default Room;
