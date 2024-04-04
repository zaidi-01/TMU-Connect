<template>
    <div>
        <Header />

        <div class="ad-details">
            <h1 class="ad-title">{{ ad.title }}</h1>
            <div class="ad-info">
                <p>{{ ad.type }}</p>
                <p>{{ ad.description }}</p>
                <p class="price">${{ ad.price }}</p>
                <p class="timestamp">Ad Posted: {{ ad.createdAt }}</p>
                <p class="timestamp">Ad Updated: {{ ad.updatedAt }}</p>
            </div>
            <button class="message-button" @click="sendMessage">Message User</button>
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
            ad: {title: 'Item 1', type:'SALE', description: 'This is the test item', price: '300', createdAt: "2024-03-17T12:00:00Z", updatedAt: "2024-03-17T12:00:00Z"}
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

.ad-title
{
    font-weight: bold;
}

.ad-details
{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 70%;
    padding: 20px;
}

.ad-info
{
    width: 70%
}

.price
{
    font-weight: bold;
}

.timestamp
{
    font-size: 0.8em;
}

.message-button
{
    align-self: flex-end;
    margin-top: 20px;
}

</style>