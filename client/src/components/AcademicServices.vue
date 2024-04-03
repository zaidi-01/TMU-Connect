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
  name: 'ItemsWanted',
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