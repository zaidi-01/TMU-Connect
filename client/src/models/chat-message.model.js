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
    this.id = id;
    this.roomId = roomId;
    this.content = content;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default ChatMessage;
