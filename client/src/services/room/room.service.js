/* eslint-disable no-unused-vars */
import { WebSocketMessageType } from "@/enums";
import { ChatMessage, Room, User } from "@/models";
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  filter,
  map,
  take,
} from "rxjs";
import * as authService from "../auth/auth.service";
import * as userService from "../user/user.service";
import * as webSocketService from "../websocket/websocket.service";
import { WebSocketChatAction } from "./enums";
/* eslint-enable no-unused-vars */

// TODO: Add chat related model
// TODO: Lazy load the rooms

/** @type {BehaviorSubject<Room[]>} */
const _rooms$ = new BehaviorSubject([]);
/** @type {Subject<ChatMessage[]>} */
const _message$ = new Subject();

/** @type {Observable<Room[]>} */
export const rooms$ = _rooms$.asObservable();

authService.isAuthenticated$
  .pipe(filter((isAuthenticated) => isAuthenticated))
  .subscribe(() => {
    webSocketService
      .once$(WebSocketMessageType.CHAT, WebSocketChatAction.ROOM_LIST)
      .subscribe(
        /**
         * Handle the room list.
         * @param {{ id: number, name: string }[]} roomsData The room list data.
         */
        (roomsData) => {
          _rooms$.next(
            roomsData.map((roomData) =>
              roomFromData(roomData.id, roomData.name)
            )
          );
        }
      );
    webSocketService
      .on$(WebSocketMessageType.CHAT, WebSocketChatAction.ROOM_CREATED)
      .subscribe(
        /**
         * Handle the room creation.
         * @param {{ id: number, name: string }} roomData The room data.
         */
        (roomData) => {
          _rooms$.next([
            ..._rooms$.value,
            roomFromData(roomData.id, roomData.name),
          ]);
        }
      );
    combineLatest([
      webSocketService.on$(
        WebSocketMessageType.CHAT,
        WebSocketChatAction.ROOM_MESSAGE
      ),
      userService.getCurrentUser(),
    ]).subscribe(
      /**
       * Handle the room message.
       * @param {{ id: number, roomId: number, content: string, userId: number, createdAt: Date, updatedAt: Date }} messageData The message data.
       * @param {User} currentUser The current user.
       */
      ([messageData, currentUser]) => {
        _message$.next(
          new ChatMessage(
            messageData.id,
            messageData.roomId,
            messageData.content,
            messageData.userId,
            messageData.createdAt,
            messageData.updatedAt,
            messageData.userId === currentUser.id
          )
        );
      }
    );

    webSocketService.sendAction(
      WebSocketMessageType.CHAT,
      WebSocketChatAction.ROOM_LIST
    );
  });

/**
 * Send a chat message by ad ID.
 * @param {number} adId The ad ID.
 * @param {string} content The message.
 * @returns {Promise<void>}
 */
export async function sendAdMessage(adId, content) {
  await webSocketService.sendData(
    WebSocketMessageType.CHAT,
    WebSocketChatAction.SEND_AD_MESSAGE,
    {
      adId,
      content,
    }
  );
}

/**
 * Create a room from the data.
 * @param {number} roomId The room ID.
 * @param {string} name The room name.
 * @returns {Room} The room object.
 */
function roomFromData(roomId, name) {
  const messages$ = new BehaviorSubject([]);

  const room = new Room(roomId, name);
  room.messages$ = messages$.asObservable();
  room.sendMessage = async (content) => {
    await webSocketService.sendData(
      WebSocketMessageType.CHAT,
      WebSocketChatAction.ROOM_MESSAGE,
      {
        roomId,
        content,
      }
    );
  };

  _message$.subscribe((message) => {
    if (message.roomId === room.roomId) {
      messages$.next([...messages$.value, message]);
    }
  });
  combineLatest([
    webSocketService
      .on$(WebSocketMessageType.CHAT, WebSocketChatAction.ROOM_MESSAGE_LIST)
      .pipe(
        filter((messagesData) => messagesData.roomId === room.roomId),
        take(1),
        map((messagesData) => messagesData.messages)
      ),
    userService.getCurrentUser(),
  ]).subscribe(
    /**
     * Handle the room message list.
     * @param {{ id: number, roomId: number, content: string, userId: number, createdAt: Date, updatedAt: Date }[]} messages The message list data.
     * @param {User} currentUser The current user.
     */
    ([messages, currentUser]) => {
      messages$.next(
        messages.map(
          (message) =>
            new ChatMessage(
              message.id,
              message.roomId,
              message.content,
              message.userId,
              message.createdAt,
              message.updatedAt,
              message.userId === currentUser.id
            )
        )
      );
    }
  );

  webSocketService.sendData(
    WebSocketMessageType.CHAT,
    WebSocketChatAction.ROOM_MESSAGE_LIST,
    room.roomId
  );

  return room;
}
