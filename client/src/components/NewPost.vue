<template>
  <div>
    <Header />

    <div class="post-container">
      <h2>Post a New Ad</h2>
      <form class="post-form" @submit.prevent="createAd($event.target)">
        <div class="type" type="type">
          <label>Post Type:</label>
          <select required name="type">
            <option value="SALE">Item for Sale</option>
            <option value="WANTED">Item Wanted</option>
            <option value="SERVICE">Academic Service</option>
          </select>
        </div>
        <div>
          <label>Title:</label>
          <input required name="title" type="text" />
        </div>

        <div class="image-upload">
          <input
            name="image"
            id="file-upload"
            type="file"
            accept="image/*"
            style="display: none"
            @change="handleImageUpload"
          />
          <label for="file-upload" class="custom-file-upload">
            <div class="image-upload-overlay">
              <i v-if="!imageData" class="fas fa-plus">+</i>
            </div>
            <img v-if="imageData" :src="imageData" alt="Ad Image" />
          </label>
        </div>

        <div class="description">
          <label>Description:</label>
          <textarea required name="description" rows="4"></textarea>
        </div>

        <div class="price">
          <label>Price:</label>
          <input required name="price" type="number" />
        </div>

        <button>Create Ad</button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import { adService } from "@/services";

export default {
  name: "NewPost",
  components: {
    Header,
  },
  data() {
    return {
      imageData: null,
    };
  },
  methods: {
    /**
     * Create a new ad.
     */
    createAd(formData) {
      const type = formData.type.value;
      const title = formData.title.value;
      const description = formData.description.value;
      const price = parseFloat(formData.price.value);

      if (!title || !description || !price || !type) {
        return;
      }

      const image = formData.image.files[0];

      adService
        .createAd(title, description, price, type, image)
        .then(() => {
          window.alert("Your ad has been created successfully");

          this.imageData = null;
          formData.reset();
        })
        .catch((error) => {
          console.error("Error creating ad", error);
          window.alert("Failed to create ad. Please try again.");
        });
    },
    /**
     * Handle image upload.
     */
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageData = e.target.result;
      };
      reader.readAsDataURL(file);
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: rgb(0, 0, 222);
  border: 2px dashed rgb(0, 0, 222);
  border-radius: 8px;
  cursor: pointer;
  font-size: 100px;
  overflow: hidden;
  position: relative;
}

.image-upload-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.image-upload-overlay:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.custom-file-upload img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.type {
  margin-bottom: 20px;
}

textarea {
  resize: none;
}
</style>
