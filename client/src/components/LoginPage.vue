<template>
  <div class="login-page">
    <img src="../assets/TMU_Logo.svg" alt="TMU Logo" class="logo">
    <div class="login-form-container">
      <div class="login-form">
        <h1>Log In</h1>
        <div class="toggle-buttons">
          <button class="toggle-btn active ">Log in</button>
          <router-link v-for="link in links" :key="link.name" :to="link.to" class="toggle-btn">
            {{ link.name }}
          </router-link>
        </div>


        <form @submit.prevent="login">
          <div v-if="error" class="error-message">{{ error }}</div>

          <div class="input-field">
            <label for="email">Email*</label>
            <input type="email" id="email" v-model="email" placeholder="jane@torontomu.ca" required>
          </div>
          <div class="input-field">
            <label for="password">Password*</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit" class="login-btn">Log In</button>
        </form>

      </div>
    </div>


    <!-- Right side of the page-->
    <div class="right-side">
      <h1>TMU Connect</h1>
      <h3>Welcome to TMU's Marketplace</h3>
      <h3>Connecting all TMU Students: This is your ultimate hub to:</h3>
      <ul>
        <li>Buy and Sell Resources</li>
        <li>Browse Acadmic Services</li>
        <li>Connect with Other TMU Students</li>
      </ul>
    </div>
  </div>
</template>


<script>
import { authService } from '@/services';

export default {
  data() {
    return {
      links: [{ name: 'Create account', to: '/register' }],
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    login() {
      // User must enter information for both fields
      if (!this.email || !this.password) {
        alert('Please fill in all required fields.');
        this.error = "Please fill in all required fields.";
        return;
      }

      authService.login(this.email, this.password)
        .then(() => {
          // TODO: add redirection to the previous page
          // Redirect to home page
          this.$router.push('/');
        })
        .catch(error => {
          // TODO: Add error handling
          // Login failed 
          console.error('Login error:', error);
          this.error = 'An error occurred during login. Please try again.';
        });
    },
  },
};

</script>


<style scoped>
.login-page {
  display: flex;
  position: relative;
  min-height: 100vh;
}

.login-form-container,
.right-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 80px;
  width: auto;
}

.right-side h2 {
  margin: 0;
}


.login-form {
  max-width: 400px;
  width: 100%;
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-bottom: 1em;
}

.toggle-btn {
  background: none;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
}

.toggle-btn.active {
  border-bottom: 2px solid currentColor;
}

.input-field {
  margin-bottom: 1em;
}

.input-field label {
  display: block;
  margin-bottom: 0.5em;
}

.input-field input {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ddd;
}

.checkbox-field {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.checkbox-field label {
  margin-left: 0.5em;
}

.login-btn {
  width: 100%;
  padding: 1em;
  background-color: #163a96;
  border: none;
  color: white;
  cursor: pointer;
  margin-bottom: 1em;
}

.right-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: #163a96;
  height: 100vh;
  margin: 0;
  padding: 0;
  color: white;
}

.right-side ul {
  list-style: none;
  padding: 0;
}

.right-side li {
  margin-bottom: 0.5em;
  position: relative;
  padding-left: 30px;
}

.right-side li::before {
  content: '✔';
  color: yellow;
  font-size: 24px;
  position: absolute;
  left: 0;
  top: 0;
}

.right-side h1 {
  font-size: 4em;
}


@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }

  .right-side {
    order: 1;
  }
}
</style>
