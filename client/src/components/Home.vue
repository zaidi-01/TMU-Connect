<template>
  <div>
    <Header />

    <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            @input="performSearch"
            placeholder="Search TMU Connect..."
          />
          <button class="search-button" @click="performSearch">
            &#128269;
          </button>
    </div>

    <div class="item-list">
      <p v-if="!ads">Loading ads...</p>
      <p v-if="ads && !ads.length">No ads found</p>
      <div
        v-else
        class="item"
        v-for="ad in ads"
        :key="ad.id"
        @click="viewAdDetails(ad.id)"
      >
        <h3>{{ ad.title }}</h3>
        <p>{{ adTypeMap(ad.type) }}</p>
        <p class="description">{{ ad.description }}</p>
        <p class="price">${{ ad.price }}</p>
      </div>
    </div>

    <div v-if="!allAdsLoaded && ads">
      <button @click="loadAds">Load More</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Header from "./Header.vue";
import { adService } from "@/services";
import { AdDetails } from "@/models";
import { AdType } from "@/enums";
/* eslint-enable no-unused-vars */

/**
 * Items per page.
 * @type {number}
 */
const ITEMS_PER_PAGE = 50;

export default {
  name: "HomePage",
  components: {
    Header,
  },
  data() {
    return {
      /**
       * List of ads.
       * @type {AdDetails[]}
       */
      ads: null,
      /**
       * Whether all ads have been loaded.
       * @type {boolean}
       */
      allAdsLoaded: false,
      searchQuery: "",
    };
  },
  methods: {
    /**
     * Load ads.
     */
    loadAds() {
      adService
        .getAds(ITEMS_PER_PAGE, this.ads ? this.ads.length : 0)
        .then((ads) => {
          this.allAdsLoaded = ads.length < ITEMS_PER_PAGE;
          this.ads ? this.ads.push(...ads) : (this.ads = ads);
        })
        .catch((error) => console.error("Error fetching ads", error));
    },
    performSearch() {},
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
    /**
     * View ad details.
     * @param {number} adID The ad ID.
     */
    viewAdDetails(adID) {
      this.$router.push(`/ad/${adID}`);
    },
  },
  mounted() {
    this.loadAds();
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  margin-top: 150px;
  align-items: center;
  justify-content: flex-end;
}

.search-bar input {
  margin-right: 2px;
}

.search-button {
  margin-right: 15px;
}

button {
  cursor: pointer;
  background-color: rgb(255, 255, 138);
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
}

.item {
  width: 250px;
  margin: 20px;
  padding: 12px;
  border: 1px solid black;
  text-align: center;
  cursor: pointer;
}

.item img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.item h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.item p {
  margin-bottom: 10px;
}

.description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.price {
  font-weight: bold;
  color: rgb(0, 0, 222);
}

@media (max-width: 768px) {
  .search-bar {
    margin-left: auto;
  }
}
</style>
