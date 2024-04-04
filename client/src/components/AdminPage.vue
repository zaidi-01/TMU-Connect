<template>
  <div class="admin-dashboard">
    <Header />
    <h1>Admin Dashboard</h1>
    <nav>
      <ul>
        <li @click="currentTab = 'ads'">Manage Ads</li>
        <li @click="currentTab = 'users'">Manage Users</li>
      </ul>
    </nav>
     <div class="feedback-message" v-if="feedbackMessage">{{ feedbackMessage }}</div>
    <section v-if="currentTab === 'users'">
      <h2>Users Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
                <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-if="currentTab === 'ads'">
    <h2>Ads Management</h2>
        <table>
            <thead>
            <tr>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="ad in ads" :key="ad.id">
                <td>{{ ad.title }}</td>
                <td>
                <button @click="deleteAd(ad.id)">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
    </section>
    
  </div>
</template>


<script>
import Header from './Header.vue'
import axios from 'axios';

export default {
  name: 'ItemsWanted',
  components:
  {
    Header
  },
  data() {
    return {
      currentTab: 'ads',
      // Testing with mock data 
      ads: [
        { id: 1, title: "Gently Used Textbooks" },
        { id: 2, title: "Brand New Laptop for Sale" },
        { id: 3, title: "Desk and Chair Set" }
      ],
      users: [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }
      ],
      feedbackMessage: '',
    };
  },
  methods: {
    fetchAds() {
    // Add correct url from backend 
      axios.get('api/ad{id}')
        .then(response => {
          this.ads = response.data;
        })
        .catch(error => console.error("Error fetching ads:", error));
    },
    fetchUsers() {
      axios.get('https://backend/users')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => console.error("Error fetching users:", error));
    },
    deleteAd(adId) {

      // This is for testing
      if (!confirm("Are you sure you want to delete this ad?")) return;
      // Simulating deletion
      this.ads = this.ads.filter(ad => ad.id !== adId);
      this.feedbackMessage = 'Ad is successfully deleted.';


      // Backend use
      if (!confirm("Are you sure you want to delete this ad?")) return;
      axios.delete('api/ad{id}')
        .then(() => {
          this.ads = this.ads.filter(ad => ad.id !== adId);
        })
        .catch(error => console.error("Error deleting ad:", error));
    },
    deleteUser(userId) {

      // This is for testing 
      if (!confirm("Are you sure you want to delete this user?")) return;
      // Simulating deletion
      this.users = this.users.filter(user => user.id !== userId);
      this.feedbackMessage = 'User successfully deleted.';


      // Backend use
      if (!confirm("Are you sure you want to delete this user?")) return;
      axios.delete(`https://backend/users/${userId}`)
        .then(() => {
          this.users = this.users.filter(user => user.id !== userId);
          this.feedbackMessage = 'User successfully deleted.';
        })
        .catch(error => console.error("Error deleting user:", error));
        this.feedbackMessage = 'Failed to delete user. Please try again later.';
    },
  },
  mounted() {
    this.fetchAds();
    this.fetchUsers();
  },
};
</script>



<style scoped>
.admin-dashboard h1 {
  text-align: center;
  padding-top: 150px;
}

nav ul {
  display: flex;
  justify-content: space-around;
  padding: 0;
  list-style-type: none;
}

nav ul li {
  cursor: pointer;
  padding: 10px;
  background-color: #f0f0f0;
}

nav ul li:hover {
  background-color: #ddd;
}

.logo {
  position: absolute; 
  top: 10px; 
  left: 10px;
  height: 80px; 
  width: auto; 
}

section h2 {
  text-align: center;
}


</style>
