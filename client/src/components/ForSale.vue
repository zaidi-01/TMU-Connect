<template>
<div>
  <div class="header">
    <div class="welcome-message">
      <p>Welcome to TMU Connect! Your online marketplace for connecting with the TMU community.</p>
    </div>
    
    <div class="logo-menu-container">
      <img alt="TMU logo" src="@/assets/TMU_Logo.svg" width="100px">

      <nav class="header-menu">
        <ul>
          <li><a href="#">ITEMS FOR SALE</a></li>
          <li><a href="#">ITEMS WANTED</a></li>
          <li><a href="#">ACADEMIC SERVICES</a></li>
          <li><a href="#">MY ACCOUNT</a></li>
        </ul>
      </nav>
      
      <div class="search-login-container">
        <div class="search-bar">
          <input type="text" v-model="searchQuery" @input="performSearch" placeholder="Search TMU Connect...">
          <button class="search-button" @click="performSearch">Search</button>
        </div>
        
        <a href="#">LOGIN/SIGN UP</a>

      </div>
    </div>
  </div>

  <div class="item-list">
    <div class="item">
      <img src="item1.jpg" alt="Item 1">
      <h3>Item 1 Name</h3>
      <p>Description of Item 1</p>
      <p class="price">$9.99</p>
      <button type="button">Add to Cart</button>
    </div>

    <div class="item">
      <img src="item2.jpg" alt="Item 2">
      <h3>Item 2 Name</h3>
      <p>Description of Item 2</p>
      <p class="price">$44.99</p>
      <button type="button">Add to Cart</button>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'ForSalePage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  .welcome-message
  {
    background-color:rgb(0, 0, 222);
    padding: 8px;
    text-align: center;
    color: white;
  }
  
  .welcome-message p
  {
    margin: 0;
  }

  .header
  {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 0px;
    margin: 0px;
    color: black;
  }

  .logo-menu-container
  {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

  }
  
  .header-menu
  {
    display: flex;
    align-items: center;
  }

  .header-menu ul
  {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  .header-menu li
  {
    padding: 20px;
    white-space: nowrap;
    margin-right: 0px;
  }

  .header-menu a
  {
    text-decoration: none;
    color: black;
  }

  .header-menu a:hover
  {
    border-bottom: 2px solid blue;
  }

  .search-login-container
  {
    display: flex;
    align-items: center;
  }
  .search-bar
  {
    display: flex;
    align-items: center;
  }

  .search-bar input
  {
    margin-right: 2px;
  }

  .search-button
  {
    margin-right: 15px;
  }
  
  .login-button
  {
    margin-right: 25px;
  }

  @media (max-width: 768px)
  {
    .search-bar
    {
      margin-left: auto;
    }
  }

  .item-list
  {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
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
