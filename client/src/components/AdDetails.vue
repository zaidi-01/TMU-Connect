<template>
  <Header />

  <div class="ad-details">
    <p v-if="!ad">Loading...</p>
    <template v-else>
      <div class="ad-details-image-view">
        <img
          :src="ad.image || '/not-found.jpg'"
          alt="Ad image"
          @error="(e) => (e.target.src = '/not-found.jpg')"
        />
      </div>
      <div class="ad-details-info-view">
        <span>{{ $filters.formatDateTime(ad.createdAt) }}</span>
        <h1 class="ad-details-title">{{ ad.title }}</h1>
        <p class="ad-details-subtitle">
          <span class="price">${{ ad.price }}</span> -
          <span>{{ adTypeMap(ad.type) }}</span>
        </p>
        <div class="ad-details-description">
          <p>{{ ad.description }}</p>
        </div>
        <form @submit.prevent="sendMessage" class="ad-details-footer">
          <input v-model="newMessage" placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>
      </div>
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
p {
  text-align: initial;
}

.ad-details-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ad-details-footer {
  width: 100%;
}

.ad-details-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.ad-details-subtitle {
  margin: 0;
}

.ad-details {
  height: 100%;
  display: flex;
  padding: 160px 25% 60px 25%;
}

.ad-details-info-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.ad-details-image-view {
  margin-right: 20px;
}

.ad-details-image-view img {
  width: 300px;
  aspect-ratio: 1;
  background-color: #e1eaf1;
  object-fit: contain;
}

.ad-details-description {
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
