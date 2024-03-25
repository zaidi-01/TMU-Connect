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

        <div class="content">
            <label>Content:</label>
            <textarea rows="6" v-model="content"></textarea>
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
        {id: 4, text: 'MY ACCOUNT', route: '/my-account'},
        ],
        showDropdown: false,

        title:'',
        content:'',
        postType: 'Items for Sale' // Default Value
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
        handleSubmit()
        {
            const newPost =
            { 
                title: this.title,
                content: this.content,
                postType: this.postType
            };

            fetch('',
            {
                method: 'POST',
                headers:
                {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            })
            .then(response => response.json())
            .then(data =>
            {
                window.alert('Your post has been submitted successfully!');
                this.$emit('postAdded', data);
                this.title = '';
                this.content = '';
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
</style>
