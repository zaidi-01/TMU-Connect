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

.ad-details
{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 140px;
}

.ad-title
{
    margin-bottom: 2px;
}

.ad-type
{
    margin-bottom: 10px;
}

.ad-description
{
    text-align: center;
    margin-top: 50px;
    margin-bottom: 40px;
}

.ad-info
{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    
}

.ad-description {
  flex: 1;
}

.timestamp
{
    font-size: small;
    margin-bottom: 2px;
}

.message-container
{
    align-self: flex-end;
}

.message-input
{
    font-size: 16px;
    padding: 6px;
    margin-right: 2px;
}

.message-button
{
    background-color: yellow;
    color: rgb(0, 0, 222);
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.message-button:hover
        {
            background-color: rgb(0, 0, 222);
            color: yellow;
            font-weight: bold;
        }

</style>

