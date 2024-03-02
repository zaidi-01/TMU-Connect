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
        </ul>
      </nav>
      
      <div class="search-bar">
        <input type="text" v-model="searchQuery" @input="performSearch" placeholder="Search TMU Connect...">
        <button @click="performSearch">Search</button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
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

  .search-bar
  {
    display: flex;
    align-items: center;
  }

  .search-bar input
  {
    margin-right: 10px;
  }

  @media (max-width: 768px)
  {
    .search-bar
    {
      margin-left: auto;
    }
  }

</style>
