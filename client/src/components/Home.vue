<template>
<div>
  <Header />

  <div class="item-list">
    <div class="item" v-for="item in items" :key="item.id">
      <h3>{{ item.title }}</h3>
      <p>{{ item.type }}</p>
      <p>{{ item.description }}</p>
      <p class="price">${{ item.price }}</p>
    </div>
  </div>
</div>
</template>

<script>
import Header from './Header.vue'

export default
{
  name: 'HomePage',
  components:
  {
    Header
  },
  data()
  {
    return {
      navLinks:
      [
        { id: 1, text: 'HOME', route: '/' },
        {id: 2, text: 'POST AN AD', route: '/new-post'},
        {id: 3, text: 'MY MESSAGES ', route: ''}
      ],
      showDropdown: false,
      searchQuery: '',

      items:
      []

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

    fetchItems()
    {
      fetch('http://localhost:8080/api/ad')
      .then(response => response.json())
      .then(data => {
        this.items = data;
      })
      .catch(error => {
        console.error('Error fetching items', error);
      });
    }
  }
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
    padding: 12px;
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
