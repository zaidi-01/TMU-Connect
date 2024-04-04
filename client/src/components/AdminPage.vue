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
            <th>Title</th>
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
import { AdDetails, User } from '@/models';
import { adService, userService } from '@/services';
import Header from './Header.vue';

export default {
  name: 'ItemsWanted',
  components:
  {
    Header
  },
  data() {
    return {
      /**
       * The current tab that is being displayed.
       * @type {null | "ads" | "users"}
       */
      currentTab: null,
      /**
       * The ads that are being displayed.
       * @type {null | AdDetails[]}
       */
      ads: null,
      /**
       * The users that are being displayed.
       * @type {null | User[]}
       */
      users: null,
      feedbackMessage: '',
    };
  },
  methods: {
    /**
     * Loads the ads.
     */
    loadAds() {
      adService.getAds(20, this.ads ? this.ads.length : 0)
        .then((ads) => this.ads ? this.ads.push(...ads) : this.ads = ads
        )
        .catch(error => console.error("Error fetching ads", error));
    },
    /**
     * Loads the users.
     */
    loadUsers() {
      userService.getUsers(20, this.users ? this.users.length : 0)
        .then((users) => this.users ? this.users.push(...users) : this.users = users)
        .catch(error => console.error("Error fetching users", error));
    },
    /**
     * Deletes an ad.
     * @param {number} adId The ID of the ad to delete.
     */
    deleteAd(adId) {
      if (!confirm("Are you sure you want to delete this ad?")) {
        return;
      }

      adService.deleteAd(adId)
        .then(() => {
          this.ads = this.ads.filter((ad) => ad.id !== adId);
          this.feedbackMessage = 'Ad successfully deleted.';
        })
        .catch(error => {
          console.error("Error deleting ad:", error);
          this.feedbackMessage = 'Failed to delete ad. Please try again later.';
        });
    },
    /**
     * Deletes a user.
     * @param {number} userId The ID of the user to delete.
     */
    deleteUser(userId) {
      if (!confirm("Are you sure you want to delete this user?")) {
        return;
      }

      userService.deleteUser(userId)
        .then(() => {
          this.users = this.users.filter((user) => user.id !== userId);
          this.feedbackMessage = 'User successfully deleted.';
        })
        .catch(error => {
          console.error("Error deleting user:", error);
          this.feedbackMessage = 'Failed to delete user. Please try again later.';
        });
    },
    /**
   * Switches the tab.
   * @param {"ads" | "users"} tab The tab to switch to.
   * @returns {Promise<void>} A promise that resolves when the tab has been switched.
   */
    async switchTab(tab) {
      this.currentTab = tab;

      switch (tab) {
        case 'ads':
          if (!this.ads) {
            this.loadAds();
          }
          break;
        case 'users':
          if (!this.users) {
            this.loadUsers();
          }
          break;
      }
    },
  },
  mounted() {
    this.switchTab('ads');
  }
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

table {
  width: 100%;
}
</style>
