<template>
  <div class="admin-dashboard">
    <Header />
    <h1>Admin Dashboard</h1>
    <nav>
      <ul>
        <li @click="switchTab('ads')">Manage Ads</li>
        <li @click="switchTab('users')">Manage Users</li>
      </ul>
    </nav>
    <div class="feedback-message" v-if="feedbackMessage">
      {{ feedbackMessage }}
    </div>
    <section v-if="currentTab === 'users'">
      <h2>Users Management</h2>
      <span v-if="!users">Loading...</span>
      <template v-if="users">
        <table>
          <thead>
            <tr>
              <th class="id">ID</th>
              <th class="name">Name</th>
              <th class="email">Email</th>
              <th class="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td class="actions">
                <button
                  v-bind:disabled="user.id === userId"
                  @click="deleteUser(user.id)"
                >
                  Delete
                </button>
                <button
                  v-bind:disabled="user.id === userId"
                  @click="changeRole(user.id)"
                >
                  {{ user.role === adminRole ? "Revoke Admin" : "Make Admin" }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button v-if="!allUsersLoaded" @click="loadUsers">Load More</button>
      </template>
    </section>

    <section v-if="currentTab === 'ads'">
      <h2>Ads Management</h2>
      <span v-if="!ads">Loading...</span>
      <template v-if="ads">
        <table>
          <thead>
            <tr>
              <th class="id">ID</th>
              <th class="title">Title</th>
              <th class="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ad in ads" :key="ad.id">
              <td>{{ ad.id }}</td>
              <td>{{ ad.title }}</td>
              <td class="actions">
                <button @click="deleteAd(ad.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button v-if="!allAdsLoaded" @click="loadAds">Load More</button>
      </template>
    </section>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { UserRole } from "@/enums";
import { AdDetails, User } from "@/models";
import { adService, userService } from "@/services";
import Header from "./Header.vue";
/* eslint-enable no-unused-vars */

/**
 * The number of items to load per page.
 * @type {number}
 */
const ITEMS_PER_PAGE = 20;

export default {
  name: "ItemsWanted",
  components: {
    Header,
  },
  data() {
    return {
      /**
       * The current tab that is being displayed.
       * @type {null | "ads" | "users"}
       */
      currentTab: null,
      /**
       * Current user ID.
       * @type {number}
       */
      userId: 0,
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
      /**
       * The feedback message to display.
       * @type {string}
       */
      feedbackMessage: "",
      /**
       * Whether all ads have been loaded.
       * @type {boolean}
       */
      allAdsLoaded: false,
      /**
       * Whether all users have been loaded.
       * @type {boolean}
       */
      allUsersLoaded: false,
      /**
       * Admin role.
       * @type {keyof UserRole}
       */
      adminRole: UserRole.ADMIN,
    };
  },
  methods: {
    /**
     * Loads the ads.
     */
    loadAds() {
      adService
        .getAds(ITEMS_PER_PAGE, this.ads ? this.ads.length : 0)
        .then((ads) => {
          this.allAdsLoaded = ads.length < ITEMS_PER_PAGE;
          this.ads ? this.ads.push(...ads) : (this.ads = ads);
        })
        .catch((error) => console.error("Error fetching ads", error));
    },
    /**
     * Loads the users.
     */
    loadUsers() {
      userService
        .getUsers(ITEMS_PER_PAGE, this.users ? this.users.length : 0)
        .then((users) => {
          this.allUsersLoaded = users.length < ITEMS_PER_PAGE;
          this.users ? this.users.push(...users) : (this.users = users);
        })
        .catch((error) => console.error("Error fetching users", error));
    },
    /**
     * Deletes an ad.
     * @param {number} adId The ID of the ad to delete.
     */
    deleteAd(adId) {
      if (!confirm("Are you sure you want to delete this ad?")) {
        return;
      }

      adService
        .deleteAd(adId)
        .then(() => {
          this.ads = this.ads.filter((ad) => ad.id !== adId);
          this.feedbackMessage = "Ad successfully deleted.";
        })
        .catch((error) => {
          console.error("Error deleting ad:", error);
          this.feedbackMessage = "Failed to delete ad. Please try again later.";
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

      userService
        .deleteUser(userId)
        .then(() => {
          this.users = this.users.filter((user) => user.id !== userId);
          this.feedbackMessage = "User successfully deleted.";
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          this.feedbackMessage =
            "Failed to delete user. Please try again later.";
        });
    },
    /**
     * Switches the tab.
     * @param {"ads" | "users"} tab The tab to switch to.
     * @returns {Promise<void>} A promise that resolves when the tab has been switched.
     */
    switchTab(tab) {
      this.currentTab = tab;

      switch (tab) {
        case "ads":
          if (!this.ads) {
            this.loadAds();
          }
          break;
        case "users":
          if (!this.users) {
            this.loadUsers();
          }
          break;
      }
    },
    /**
     * Changes the role of a user.
     * @param {number} userId The ID of the user to change the role of.
     */
    changeRole(userId) {
      const user = this.users.find((user) => user.id === userId);

      if (!user) {
        return;
      }

      const newRole =
        user.role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN;

      userService
        .updateUserRole(userId, newRole)
        .then(() => {
          user.role = newRole;
          this.feedbackMessage = `User role successfully changed to ${newRole}.`;
        })
        .catch((error) => {
          console.error("Error changing user role:", error);
          this.feedbackMessage =
            "Failed to change user role. Please try again later.";
        });
    },
  },
  mounted() {
    this.switchTab("ads");
    userService.getCurrentUser().then((user) => (this.userId = user.id));
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

table {
  width: 100%;
  margin-bottom: 10px;
}

thead .id {
  width: 10%;
}

thead .title {
  width: 70%;
}

thead .name {
  width: 40%;
}

thead .email {
  width: 40%;
}

thead .actions {
  width: 10%;
}

tbody .actions {
  display: flex;
  justify-content: space-around;
}
</style>
