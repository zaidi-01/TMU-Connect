<template>
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
</template>

<script>
export default {
    name: "SearchBar",
    props: {
        value: String,
    },
    data() {
        return {
            searchQuery: "",
        };
    },
    methods: {
        performSearch() {
        },
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
</style>