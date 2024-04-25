<template>
    <div class="home">
        <button @click="getUsers()">Test call</button>
        <ul>
            <li v-for="(user, index) in users" :key="user.id">
                {{ index }}: {{ user }}
            </li>
        </ul>
    </div>
</template>

<script>
import UserAPI from "@/services/UserAPI";

export default {
    name: 'HomeView',
    data: function () {
        return {
            users: null
        };
    },
    methods: {
        async getUsers() {
            try {
                const response = await UserAPI.getUsers();
                this.users = response.data;
            } catch (error) {
                console.error('There was an error fetching the users:', error);
            }
        }
    }
}
</script>
