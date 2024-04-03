import { MessageType, WebSocketChatAction } from "@enums";
import { PrismaClient } from "@prisma/client";
import { websocketService } from "@services";

// TODO: Create DTO models for the database models

/**
 * Represents a room.
 */
class Room {
  private static prisma = new PrismaClient();

  /**
   * Room ID.
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Room name.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Ad ID.
   */
  public get adId(): number {
    return this._adId;
  }

  /**
   * Participants.
   */
  public get participants(): number[] {
    return this._participants;
  }

  /**
   * Initializes a new instance of the Room class.
   * @param _id The room ID.
   * @param _name The room name.
   * @param _adId The ad ID.
   * @param _participants The participants.
   */
  constructor(
    private _id: number,
    private _name: string,
    private _adId: number,
    private _participants: number[]
  ) {}

  /**
   * Gets all messages in the room.
   * @returns The messages.
   */
  public async getMessages() {
    return Room.prisma.message.findMany({
      where: {
        roomId: this.id,
      },
    });
  }

  /**
   * Sends a message in the room.
   * @param participant The participant.
   * @param content The message.
   */
  public async sendMessage(participant: number, content: string) {
    if (!this.participants.includes(participant)) {
      throw new Error("Participant not found");
    }

    const message = await Room.prisma.message.create({
      data: {
        roomId: this.id,
        userId: participant,
        content: content,
      },
    });

    this.participants.forEach((p) => {
      websocketService.sendMessageToUser(p, {
        type: MessageType.CHAT,
        action: WebSocketChatAction.ROOM_MESSAGE,
        data: message,
      });
    });
  }
}

export default Room;
