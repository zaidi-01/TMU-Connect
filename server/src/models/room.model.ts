import { PrismaClient } from "@prisma/client";

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
   * @param message The message.
   */
  public async sendMessage(participant: number, message: string) {
    if (!this.participants.includes(participant)) {
      throw new Error("Participant not found");
    }

    await Room.prisma.message.create({
      data: {
        roomId: this.id,
        userId: participant,
        content: message,
      },
    });
  }
}

export default Room;
