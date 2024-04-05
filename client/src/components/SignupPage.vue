<template>
  <div class="signup-page">
    <img src="../assets/TMU_Logo.svg" alt="TMU Logo" class="logo" />
    <div class="signup-form-container">
      <div class="signup-form">
        <h1>Sign Up</h1>
        <div class="toggle-buttons">
          <router-link
            v-for="link in links"
            :key="link.name"
            :to="link.to"
            class="toggle-btn"
          >
            <button class="toggle-btn">{{ link.name }}</button>
          </router-link>
          <button class="toggle-btn active">Create account</button>
        </div>

        <form @submit.prevent="signup">
          <p v-if="error" class="error-message">
            {{ error }}
          </p>
          <div class="input-field">
            <label for="name">Full Name*</label>
            <input
              type="name"
              id="name"
              v-model="name"
              placeholder="Jane Doe"
              required
            />
          </div>
          <div class="input-field">
            <label for="email">Email*</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="jane@torontomu.ca"
              required
            />
          </div>

          <div class="input-field">
            <label for="password">Password*</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="***********"
              required
            />
          </div>

          <button type="submit" class="signup-btn">Sign up</button>
        </form>
      </div>
    </div>
    <!-- Right side with heading -->
    <div class="right-side">
      <h1>TMU Connect</h1>
      <h3>Welcome to TMU's Marketplace</h3>
      <h3>Connecting all TMU Students: This is your ultimate hub to:</h3>
      <ul>
        <li>Buy and Sell Resources</li>
        <li>Browse Academic Services</li>
        <li>Connect with Other TMU Students</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { authService } from "@/services";

export default {
  data() {
    return {
      links: [{ name: "Log in", to: "/login" }],
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    signup() {
      // Handle signup
      if (!this.name || !this.email || !this.password) {
        this.error = "Please fill in the required fields.";
      }

      // Handle response from the backend.
      authService
        .register(this.name, this.email, this.password)
        .then(() => {
          // Handle response from the backend.
          // showing a success message, or storing a session token.
          console.log("Signup successful");
          // TODO: add flag to show success message
          this.$router.push("/login"); // Redirect to login page
        })
        .catch((error) => {
          console.error("Signup error:", error);
          this.error = error.message;
        });
    },
  },
};
</script>

<style scoped>
.signup-page {
  display: flex;
  position: relative;
  min-height: 100vh;
}

.signup-form-container,
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

.signup-form {
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
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

.input-field label {
  display: block;
  margin-bottom: 0.5em;
}

.input-field input {
  flex: 1;
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

.signup-btn {
  width: 100%;
  padding: 1em;
  background-color: #163a96;
  border: none;
  color: white;
  cursor: pointer;
  margin-bottom: 1em;
}

.signup-btn:hover {
  background-color: #0f2c7b;
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
  content: "✔";
  color: yellow;
  font-size: 24px;
  position: absolute;
  left: 0;
  top: 0;
}

.right-side h1 {
  font-size: 4em;
}

.error-message {
  padding: 0.5em;
  color: white;
  background-color: #cc0000;
}

@media (max-width: 768px) {
  .signup-page {
    flex-direction: column;
  }

  .right-side {
    order: 1;
  }
}
</style>
