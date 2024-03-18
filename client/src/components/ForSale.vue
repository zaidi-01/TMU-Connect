<template>
<div>
  <Header />

  <div class="item-list">
    <div class="item" v-for="item in items" :key="item.id">
      <img :src="item.imageURL" :alt="Item.name">
      <h3>{{  item.name  }}</h3>
      <p>{{  item.description  }}</p>
      <p class="price">${{  item.price.toFixed(2)  }}</p>
      <button type="button">Add to Cart</button>
    </div>
  </div>
</div>
</template>

<script>
import Header from './Header.vue'

export default
{
  name: 'ForSalePage',
  components:
  {
    Header
  },
  data()
  {
    return {
      navLinks:
      [
        { id: 1, text: 'ITEMS FOR SALE', route: '/' },
        {id: 2, text: 'ITEMS WANTED', route: '/items-wanted'},
        {id: 3, text: 'ACADEMIC SERVICES', route: '/academic-services'},
        {id: 4, text: 'MY ACCOUNT', route: '/my-account'},
      ],
      showDropdown: false,
    };
  },
  methods:
  {
    toggleDropdown()
    {
      this.showDropdown = !this.showDropdown;
    },
    performSearch()
    {

    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item-list
  {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-top: 150px;
  }

  .item
  {
    width: 250px;
    margin: 20px;
    padding: 15px;
    border: 1px solid black;
    text-align: center;
  }

  .item img
  {
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
  }

  .item h3
  {
    font-size: 1.2em;
    margin-bottom: 10px;
  }

  .item p
  {
    margin-bottom: 10px;
  }

  .price
  {
    font-weight: bold;
    color: rgb(0, 0, 222);
  }

  button
  {
    background-color: rgb(255, 255, 138);
  }

</style>
