<template>
  <Header />

  <div class="ad-details">
    <p v-if="!ad">Loading...</p>
    <template v-else>
      <div class="ad-header">
        <h1 class="ad-title">{{ ad.title }}</h1>
        <span>{{ $filters.formatDateTime(ad.createdAt) }}</span>
      </div>
      <p class="ad-subtitle">
        <span class="price">${{ ad.price }}</span> -
        <span>{{ adTypeMap(ad.type) }}</span>
      </p>
      <div class="ad-description">
        <p>{{ ad.description }}</p>
      </div>
      <form @submit.prevent="sendMessage" class="ad-footer">
        <input v-model="newMessage" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </template>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Header from "./Header.vue";
import { adService, roomService } from "@/services";
import { AdDetails } from "@/models";
import { AdType } from "@/enums";
/* eslint-enable no-unused-vars */

export default {
  name: "AdDetails",
  components: {
    Header,
  },
  data() {
    return {
      /**
       * Ad details
       * @type {AdDetails}
       */
      ad: null,
      /**
       * New message to send
       * @type {string}
       */
      newMessage: "",
    };
  },
  created() {
    this.loadAdDetails();
  },
  methods: {
    /**
     * Load ad details
     */
    loadAdDetails() {
      const adId = this.$route.params.id;
      adService.getAdById(adId).then((ad) => (this.ad = ad));
    },
    /**
     * Sends a chat message.
     */
    sendMessage() {
      if (!this.newMessage || !this.ad) {
        return;
      }

      roomService.sendAdMessage(this.ad.id, this.newMessage).then(() => {
        this.newMessage = "";
      });
    },
    /**
     * Maps the ad type to a human-readable string.
     * @param {keyof AdType} type The ad type.
     * @returns {string} The human-readable string.
     */
    adTypeMap(type) {
      switch (type) {
        case AdType.SALE:
          return "For Sale";
        case AdType.WANTED:
          return "Wanted";
        case AdType.SERVICE:
          return "Service";
      }
    },
  },
};
</script>

<style scoped>
.ad-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ad-footer {
  width: 100%;
}

.ad-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.ad-subtitle {
  margin: 0;
}

.ad-details {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 160px 25% 60px 25%;
}

.ad-description {
  flex: 1;
}

.price {
  font-weight: bold;
}

.timestamp {
  font-size: 0.8em;
}

.message-button {
  align-self: flex-end;
  margin-top: 20px;
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
