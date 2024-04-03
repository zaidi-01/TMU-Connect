<template>
  <div class="communication-page">
    <Header />
    <aside class="chat-list">
      <h2 class="chat-title">Chats</h2>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <ul>
        <li v-for="chat in chats" :key="chat.id" @click="selectChat(chat)">
          {{ chat.postTitle }} with {{ chat.name }}
        </li>
      </ul>
    </aside>
    <section class="chat-window">
      <div class="chat-header" v-if="currentChat">
        <h3>{{ currentChat.postTitle }} with {{ currentChat.name }}</h3>
      </div>
      <div class="messages" v-if="currentChat">
        <div v-for="message in currentChat.messages" :key="message.id" class="message">
          <div :class="{'mine': message.isMine}">
            {{ message.content }}
          </div>
        </div>
      </div>
      <form @submit.prevent="sendMessage" v-if="currentChat">
        <input v-model="newMessage" placeholder="Type a message...">
        <button type="submit">Send</button>
      </form>
    </section>
  </div>
</template>


<script>
import Header from './Header.vue'
import axios from 'axios';

export default {
  name: 'CommunicationPage',
  components:
  {
    Header
  },
  data() {
    return {
      // Sample data for testing
      //chats: [
      //  { id: 1, name: 'John Doe', postTitle: "Selling Textbooks", messages: [
      //    { id: 1, content: 'Testing chat', isMine: false },
      //    { id: 2, content: 'Testing chat from user', isMine: true }
      //  ] }
      //],

      // Fetch this from backend 
      chats: [],
      currentChat: null,
      newMessage: '',
      errorMessage: '',


    };
  },
  methods: {
    selectChat(chat) {
      this.currentChat = chat;
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        // Simulate sending a message
        const message = {
          id: Date.now(),
          content: this.newMessage,
          isMine: true
        };
        // Push the new message to the current chat
        this.currentChat.messages.push(message);
        // Clear the input field
        this.newMessage = '';
      }
    },
    fetchChats() {
        axios.get('/api/chats')
          .then(response => {
            this.chats = response.data;
            // Clear error message if user chats have been accessed 
             this.errorMessage = ''; 
          })
          .catch(error => {
            console.error('There was an error in accessing the chats:', error);
            // Show the error
            this.errorMessage = 'Failed to load chats. Please try again later.';
          });
      },
  },
   mounted() {
      this.fetchChats();
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
  width: 30%; 
  background: #f2f2f2; 
  overflow-y: auto; 
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

.chat-list, .chat-window {
  padding-top: 20px; 
}

.chat-title {
  padding: 10px 20px; 
  border-bottom: 1px solid #ccc; 
  background-color: #f2f2f2; 
}

.chat-title, .chat-header h3 {
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

.message .mine {
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
