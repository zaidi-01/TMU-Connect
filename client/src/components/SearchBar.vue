<template>
<div class="search-bar">
    <input
        type="text"
        v-model="searchQuery"
        @input="performSearch"
        placeholder="Search TMU Connect..."
    />
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

.search-bar input {
    width: 350px;
    height: 20px;
    border-radius: 20px;
    border: 2px solid rgb(0, 0, 222);
    padding: 5px 10px;
    font-size: 16px; 
}


</style>