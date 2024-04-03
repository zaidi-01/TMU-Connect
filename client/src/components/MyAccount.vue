<template>
<div>
    <Header />
</div>
</template>

<script>
import Header from './Header.vue'

export default
{
    name: 'MyAccount',
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
    },
};
</script>