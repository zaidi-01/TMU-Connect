<template>
  <div>
    <Header />

    <div class="post-container">
      <h2>Post a New Ad</h2>
      <div class="post-form">
        <div class="type" type="type">
          <label>Post Type:</label>
          <select v-model="type">
            <option value="SALE">Item for Sale</option>
            <option value="WANTED">Item Wanted</option>
            <option value="SERVICE">Academic Service</option>
          </select>
        </div>
        <div>
          <label>Title:</label>
          <input required type="text" v-model="title" />
        </div>

        <!-- TODO: Add image upload functionality
        <div class="image-upload">
          <input
            id="file-upload"
            type="file"
            @change="handleImageUpload"
            accept="image/"
            style="display: none"
          />
          <label for="file-upload" class="custom-file-upload">
            <i class="fas fa-plus">+</i>
          </label>
        </div> -->

        <div class="description">
          <label>Description:</label>
          <textarea required rows="4" v-model="description"></textarea>
        </div>

        <div class="price">
          <label>Price:</label>
          <input required type="number" v-model="price" />
        </div>

        <button @click="createAd">Create Ad</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import { AdType } from "@/enums";
import { adService } from "@/services";

export default {
  name: "NewPost",
  components: {
    Header,
  },
  data() {
    return {
      type: AdType.SALE,
      title: "",
      description: "",
      price: "",
    };
  },

  methods: {
    createAd() {
      if (!this.title || !this.description || !this.price) {
        return;
      }

      adService
        .createAd(this.title, this.description, this.price, this.type)
        .then(() => {
          window.alert("Your ad has been created successfully");

          this.type = AdType.SALE;
          this.title = "";
          this.description = "";
          this.price = null;
        })
        .catch((error) => {
          console.error("Error creating ad", error);
          window.alert("Failed to create ad. Please try again.");
        });
    },
  },
};
</script>

<style scoped>
.post-container {
  margin-top: 130px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-form {
  max-width: 600px;
  margin: auto;
}

.post-form label {
  display: flex;
  margin-bottom: 8px;
  font-weight: bold;
}

.post-form input,
.post-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid black;
}

.post-form select {
  width: 25%;
  display: block;
  padding: 8px;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 5px;
}

.post-form button {
  display: grid;
  background-color: yellow;
  color: rgb(0, 0, 222);
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.post-form button:hover {
  background-color: rgb(0, 0, 222);
  color: yellow;
  font-weight: bold;
}

.image-upload {
  align-self: center;
  width: 450px;
  height: 450px;
  margin: auto;
  margin-bottom: 20px;
}

.custom-file-upload {
  display: fixed;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: rgb(0, 0, 222);
  border: 2px dashed rgb(0, 0, 222);
  border-radius: 8px;
  cursor: pointer;
  font-size: 100px;
}

.custom-file-upload:hover {
  background-color: rgb(212, 212, 212);
}

.type {
  margin-bottom: 20px;
}

textarea {
  resize: none;
}
</style>
