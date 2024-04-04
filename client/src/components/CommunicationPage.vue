<template>
  <div class="communication-page">
    <Header />
    <aside class="chat-list">
      <h2 class="chat-title">Chats</h2>
      <div class="loader">
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <p v-if="!rooms && !errorMessage">Loading chats...</p>
        <p v-if="rooms && !rooms.length && !errorMessage">No chats available</p>
      </div>
      <ul v-if="rooms && rooms.length">
        <li v-for="room in rooms" :key="room.id" @click="selectRoom(room)">
          {{ room.name }}
        </li>
      </ul>
    </aside>
    <section class="chat-window">
      <div class="chat-header" v-if="currentRoom">
        <h3>{{ currentRoom.postTitle }} with {{ currentRoom.name }}</h3>
      </div>
      <div class="messages" v-if="currentRoom">
        <div v-for="message in messages" :key="message.id" class="message">
          <div :class="{ 'local': message.isLocal }">
            {{ message.content }}
          </div>
        </div>
      </div>
      <form @submit.prevent="sendMessage" v-if="currentRoom">
        <input v-model="newMessage" placeholder="Type a message...">
        <button type="submit">Send</button>
      </form>
    </section>
  </div>
</template>


<script>
/* eslint-disable no-unused-vars */
import { ChatMessage, Room } from '@/models';
import { roomService } from '@/services';
import { Subject, Subscription, takeUntil } from 'rxjs';
import Header from './Header.vue';
/* eslint-enable no-unused-vars */

export default {
  name: 'CommunicationPage',
  components:
  {
    Header
  },
  data() {
    return {
      /** @type {Room[]} */
      rooms: null,
      /** @type {Room} */
      currentRoom: null,
      /** @type {ChatMessage[]} */
      messages: [],
      /** @type {Subscription} */
      messagesSubscription: null,
      /** @type {Subject} */
      destroy$: new Subject(),
      newMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    /**
     * Selects a chat room.
     * @param {Room} room The chat room to select.
     */
    selectRoom(room) {
      this.currentRoom = room;

      this.messagesSubscription?.unsubscribe();
      this.messagesSubscription = this.currentRoom.messages$
        .pipe(
          takeUntil(this.destroy$),
        )
        .subscribe({
          next: messages => {
            this.messages = messages;
          },
          error: error => {
            // TODO: Handle chat messages error separately
            this.errorMessage = error.message;
          },
        });
    },
    /**
   * Fetches chat rooms.
   */
    getRooms() {
      roomService.rooms$
        .pipe(
          takeUntil(this.destroy$),
        )
        .subscribe({
          next: rooms => {
            this.rooms = rooms;
          },
          error: error => {
            this.errorMessage = error.message;
          },
        });
    }
  },
  mounted() {
    this.getRooms();
  },
  beforeUnmount() {
    this.destroy$.next();
    this.destroy$.complete();
  },
};
</script>




<style scoped>
.communication-page {
  display: flex;
  height: calc(100vh - 160px);
  margin-top: 160px;
  overflow: hidden;
}

.chat-list {
  display: flex;
  flex-direction: column;
  width: 30%;
  background: #f2f2f2;
  overflow-y: auto;
}

.chat-list .loader {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  color: #666;
}

.chat-list ul {
  list-style-type: none;
  padding-left: 0;
}

.chat-list li {
  padding: 5px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s;
}

.chat-list li:hover {
  background-color: #e3e3e3;
}

.chat-list,
.chat-window {
  padding-top: 20px;
}

.chat-title {
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  background-color: #f2f2f2;
}

.chat-title,
.chat-header h3 {
  margin: 0;
  padding: 0 20px;
}

.chat-window {
  width: 70%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 10px 20px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #ddd;
}

.chat-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: normal;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
}

.message {
  display: flex;
  justify-content: flex-start;
  padding: 5px;
}

.message .local {
  justify-content: flex-end;
  background-color: #cbe6ef;
  margin-left: auto;
}

.message div {
  max-width: 80%;
  padding: 10px;
  border-radius: 10px;
  background-color: #f1f0f0;
}

form {
  display: flex;
  margin-top: 10px;
}

input {
  flex-grow: 1;
  margin-right: 5px;
}

button {
  padding: 6px 12px;
}
</style>
