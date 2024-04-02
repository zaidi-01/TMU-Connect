<template>
    <div class="header">
        <div class="welcome-message">
            <p>Welcome to TMU Connect! Your online marketplace for connecting with the TMU community.</p>
        </div>
    
        <div class="logo-menu-container">
            <div class="dropdown-menu">
                <button @click="toggleDropdown">≡</button>

                <div v-show="showDropdown">
                    <router-link v-for="link in navLinks" :key="link.id" :to="link.route" class="dropdown-link">
                
                        <div>
                            {{ link.text }}
                        </div>
                    </router-link>
                </div>
            </div>
            
            <img alt="TMU logo" src="@/assets/TMU_Logo.svg" width="100px">
            
            <nav class="header-menu">
                <ul>
                    <li v-for="link in navLinks" :key="link.id">
                        <router-link :to="link.route">{{ link.text }}</router-link>
                    </li>
                </ul>
            </nav>
            
            <div class="search-login-container">
                <div class="search-bar">
                    <input type="text" v-model="searchQuery" @input="performSearch" placeholder="Search TMU Connect...">
                    <button class="search-button" @click="performSearch">&#128269;</button>
                </div>
                
                <button class="login-button" @click="performLogin">&#128100;</button>
            </div>
        </div>
    </div>
</template>

<script>
export default
{
  name: 'appHeader',
  data()
  {
    return {
      navLinks:
      [
        { id: 1, text: 'HOME', route: '/' },
        { id: 2, text: 'POST AN AD', route: '/new-post' },
      ],
      showDropdown: false,
      searchQuery: '',
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
    performLogin()
    {

    },
  },
};
</script>

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
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

  }
  
  .dropdown-menu
  {
    display: none;
    align-items: center;
    box-sizing: border-box;
    
  }

  .dropdown-menu button
  {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
  }

  .dropdown-menu div
  {
    display: block;
    position: absolute;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 1;
    box-sizing: content-box;
  }

  .dropdown-link
  {
    display: block; 
    padding: 10px;
    text-decoration: none;
    color: black;
    margin-bottom: 10px;
    width: 160px;
    height: 10px;
    white-space: nowrap;
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

  button
  {
    background-color: rgb(255, 255, 138);
  }

  @media (max-width: 768px)
  {

    .search-bar
    {
      margin-left: auto;
    }

    .header-menu
    {
      display: none;
    }

    .dropdown-menu
    {
      display: block;
    }
    .dropdown-menu div
    {
      display: block;
    }
  }
</style>