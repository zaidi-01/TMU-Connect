<template>
    <div>
        <Header />
    
        <div class="post-container">
            <h2>Add a New Post</h2>
            <form class="post-form" @sumbit.prevent="handleSubmit">
            <div type="postType">
                <label>Post Type:</label>
                <select v-model="postType">
                    <option value="Items for Sale">Item for Sale</option>
                    <option value="Items Wanted">Item Wanted</option>
                    <option value="Academic Services">Academic Service</option>
                </select>
            </div>
            <div>
                <label>Title:</label>
                <input type="text" v-model="title" />
            </div>
    
            <div class="image-upload">
                <input id="file-upload" type="file" @change="handleImageUpload" accept="image/" style="display: none;"/>
                <label for="file-upload" class="custom-file-upload">
                    <i class="fas fa-plus">+</i>
                </label>
            </div>
    
            <div class="description">
                <label>Description:</label>
                <textarea rows="4" v-model="description"></textarea>
            </div>
    
            <div class="price">
                <label>Price:</label>
                <textarea v-model="price"></textarea>
            </div>
    
            <button type="submit">Add Post</button>
            </form>
        </div>
    </div>
    </template>
    
    <script>
    
    import Header from './Header.vue'
    
    export default
    {
        name: 'NewPost',
        components:
        {
            Header
        },
        data()
        {
            return {
            navLinks:
            [
            { id: 1, text: 'ITEMS FOR SALE', route: '/' },
            {id: 2, text: 'ITEMS WANTED', route: '/items-wanted'},
            {id: 3, text: 'ACADEMIC SERVICES', route: '/academic-services'},
            {id: 4, text: 'MAKE NEW POST', route: '/new-post'},
            ],
            showDropdown: false,
    
            title:'',
            content:'',
            postType: 'Items for Sale', // Default Value
            image: null
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
            handleImageUpload(event)
            {
                const file = event.target.files[0];
                this.image = file;
            },
            handleSubmit()
            {
                const newPost =
                { 
                    title: this.title,
                    description: this.description,
                    postType: this.postType
                };
    
                const formData = new formData();
                formData.append('image', this.image);
                formData.append('post', JSON.stringify(newPost));
    
                fetch('',
                {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data =>
                {
                    window.alert('Your post has been submitted successfully!');
                    this.$emit('postAdded', data);
                    this.title = '';
                    this.description = '';
                    this.postType = 'Items for Sale'; // Reset after submission
    
                    switch (data.postType)
                    {
                        case 'Items for Sale':
                        this.$router.push('/');
                        break;
                        case 'Items Wanted':
                        this.$router.push('/items-wanted');
                        break;
                        case 'Academic Services':
                        this.$router.push('/academic-services');
                        break;
                        default:
                        this.$router.push('/items-wanted');
                    }
                })
                .catch(error => console.error('Error adding post:', error));
            }
        }   
    }
    </script>
    
    <style scoped>
    
        .post-container
        {
            margin-top: 130px;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    
        .post-form
        {
            max-width: 600px;
            margin: auto;
        }
    
        .post-form label
        {
            display: flex;
            margin-bottom:8px;
            font-weight: bold;
        }
    
        .post-form input,
        .post-form textarea
        {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid black;
        }
    
        .post-form select
        {
            width: 25%;
            display: block;
            padding: 8px;
            border-radius: 12px;;
            cursor: pointer;
            margin-bottom: 5px;
        }
    
        .post-form button
        {
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
    
        .post-form button:hover
        {
            background-color: rgb(0, 0, 222);
            color: yellow;
            font-weight: bold;
        }
    
        .image-upload
        {
            align-self: center;
            width: 450px;
            height: 450px;
            margin: auto;
            margin-bottom: 20px;
        }
    
        .custom-file-upload
        {
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
    
        .custom-file-upload:hover
        {
            background-color: rgb(212, 212, 212);
        }
        
    
    </style>
    
    