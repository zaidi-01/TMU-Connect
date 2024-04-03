/**
 * Represents a chat message.
 */
class ChatMessage {
  /**
   * Initializes a new instance of the ChatMessage class.
   * @param {number} id The message ID.
   * @param {number} roomId The room ID.
   * @param {string} content The message content.
   * @param {userId} userId The user ID.
   * @param {Date} createdAt The creation date.
   * @param {Date} updatedAt The last update date.
   */
  constructor(id, roomId, content, userId, createdAt, updatedAt) {
    /** The message ID. */
    this.id = id;
    /** The room ID. */
    this.roomId = roomId;
    /** The message content. */
    this.content = content;
    /** The user ID. */
    this.userId = userId;
    /** The creation date. */
    this.createdAt = createdAt;
    /** The last update date. */
    this.updatedAt = updatedAt;
  }
}

export default ChatMessage;
