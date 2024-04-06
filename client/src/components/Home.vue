<template>
  <div class="home">
    <Header />

    <SearchBar @query="onSearch" />

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
import SearchBar from "./SearchBar.vue";
import { adService } from "@/services";
import { AdDetails } from "@/models";
import { AdType } from "@/enums";
import { Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";
import { AdFilterOptions } from "@/models";
/* eslint-enable no-unused-vars */

/**
 * Items per page.
 * @type {number}
 */
const ITEMS_PER_PAGE = 20;

export default {
  name: "HomePage",
  components: {
    Header,
    SearchBar,
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
      /**
       * Search query.
       * @type {string}
       */
      query: "",
      /**
       * Search subject.
       * @type {Subject<string>}
       */
      search$: new Subject(),
      /**
       * Destroy subject.
       * @type {Subject<void>}
       */
      destroy$: new Subject(),
    };
  },
  methods: {
    /**
     * Load ads.
     */
    loadAds() {
      const filterOptions = {
        query: this.query,
      };

      adService
        .getAds(ITEMS_PER_PAGE, this.ads ? this.ads.length : 0, filterOptions)
        .then((ads) => {
          this.allAdsLoaded = ads.length < ITEMS_PER_PAGE;
          this.ads ? this.ads.push(...ads) : (this.ads = ads);
        })
        .catch((error) => console.error("Error fetching ads", error));
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
    /**
     * View ad details.
     * @param {number} adID The ad ID.
     */
    viewAdDetails(adID) {
      this.$router.push(`/ad/${adID}`);
    },
    /**
     * Emits the search query.
     * @param {string} query The search query.
     */
    onSearch(query) {
      this.query = query;
      this.search$.next(query);
    },
  },
  mounted() {
    this.loadAds();

    this.search$
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((query) => {
        /** @type {AdFilterOptions} */
        const filterOptions = {
          query,
        };

        adService
          .getAds(ITEMS_PER_PAGE, 0, filterOptions)
          .then((ads) => {
            this.allAdsLoaded = ads.length < ITEMS_PER_PAGE;
            this.ads = ads;
          })
          .catch((error) => console.error("Error searching ads", error));
      });
  },
  beforeUnmount() {
    this.destroy$.next();
    this.destroy$.complete();
  },
};
</script>

<style scoped>
.home {
  margin: 150px 0 20px 0;
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
</style>
