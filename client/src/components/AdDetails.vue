<template>
    <div>
        <Header />

        <div class="ad-details">
            <h1 class="ad-title">{{ ad.title }}</h1>
            <p class="ad-type">{{ ad.type }}</p>
            <div class="ad-description">{{ ad.description }}</div>
            <div class="ad-info">
                <h2 class="price">${{ ad.price }}</h2>
                <p class="timestamp">Ad Posted: {{ ad.createdAt }}</p>
                <p class="timestamp">Last Updated: {{ ad.updatedAt }}</p>
            </div>
            <div class="message-container">
                <input type="text" v-model="messageText" placeholder="Message User..." class="message-input">
                <button class="message-button" @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios';

export default
{
    name: 'AdDetails',
    components:
    {
        Header
    },
    data()
    {
        return {
            ad:
            {
                title: 'Used Car',
                type:'SALE',
                description: 'Selling my used car. This is the model, it has this many kilometers on it, no major damages',
                price: '300',
                createdAt: "2024-03-17T12:00:00Z",
                updatedAt:"2024-03-17T12:00:00Z"
            }
        };
    },
    created()
    {
        this.fetchAdDetails();
    },
    methods:
    {
        fetchAdDetails()
        {
            const adId = this.$route.params.id;
            axios.get(`/api/ad/${adId}`)
            .then(response => {
                this.ad = response.data;
            })
            .catch(error => {
                console.error('Error fetching ad details', error);
            });
        },
        sendMessage()
        {

        }
    }
};

</script>

<style scoped>

.ad-details
{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 140px;
}

.ad-title
{
    margin-bottom: 2px;
}

.ad-type
{
    margin-bottom: 10px;
}

.ad-description
{
    text-align: center;
    margin-top: 50px;
    margin-bottom: 40px;
}

.ad-info
{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    
}

.price
{
    font-weight: bold;
}

.timestamp
{
    font-size: small;
    margin-bottom: 2px;
}

.message-container
{
    align-self: flex-end;
}

.message-input
{
    font-size: 16px;
    padding: 6px;
    margin-right: 2px;
}

.message-button
{
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

.message-button:hover
        {
            background-color: rgb(0, 0, 222);
            color: yellow;
            font-weight: bold;
        }

</style>