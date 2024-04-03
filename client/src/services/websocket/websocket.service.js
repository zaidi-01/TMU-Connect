/* eslint-disable no-unused-vars */
import { WebSocketMessage } from "@/models";
import { WebSocketMessageType } from "@/enums";
import { Observable, Subject, filter, take } from "rxjs";
/* eslint-enable no-unused-vars */

const ws = new WebSocket(
  `${window.location.protocol === "https:" ? "wss" : "ws"}://${
    window.location.host
  }/ws`
);

/** @type {Subject<WebSocketMessage>} */
const _message$ = new Subject();
export const message$ = _message$.asObservable();

ws.addEventListener("open", () => {
  console.log("WebSocket connection established.");

  ws.addEventListener("message", (event) => {
    /** @type {WebSocketMessage} */
    const message = JSON.parse(event.data);
    _message$.next(
      new WebSocketMessage(message.type, message.action, message.data)
    );
  });
});
ws.addEventListener("error", console.error);

/**
 * Send a message.
 * @param {WebSocketMessage} message The message to send.
 * @returns {Promise<void>}
 */
export async function sendMessage(message) {
  while (ws.readyState !== ws.OPEN) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  ws.send(JSON.stringify(message));
}

/**
 * Send a message with data.
 * @template T
 * @param {keyof WebSocketMessageType} type The type of message.
 * @param {string} action The action to call.
 * @param {T} data The data to send.
 * @returns {Promise<void>}
 */
export async function sendData(type, action, data) {
  await sendMessage(new WebSocketMessage(type, action, data));
}

/**
 * Send an empty message.
 * @param {keyof WebSocketMessageType} type The type of message.
 * @param {string} action The action to call.
 * @returns {Promise<void>}
 */
export async function sendAction(type, action) {
  await sendMessage(new WebSocketMessage(type, action, null));
}

/**
 * Emits messages of a specific type and action.
 * @param {keyof WebSocketMessageType} type The type of message.
 * @param {string} action The action to listen for.
 * @returns {Observable<WebSocketMessage>}
 */
export function on$(type, action) {
  return message$.pipe(
    filter((message) => message.type === type && message.action === action)
  );
}

/**
 * Emits the first message of a specific type and action.
 * @param {keyof WebSocketMessageType} type The type of message.
 * @param {string} action The action to listen for.
 * @returns {Observable<WebSocketMessage>}
 */
export function once$(type, action) {
  return on$(type, action).pipe(take(1));
}
