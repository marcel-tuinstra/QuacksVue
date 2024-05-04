<template>
    <h2 class="mb-2">User Profile</h2>

    {{ currentUser }}
</template>

<script>
import UserAPI from "@/services/UserAPI";
import store from "@/store";

export default {
    name: 'ProjectsView',
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
    },
    computed: {
        currentUser() {
            return store.getters.currentUser;
        }
    }
}
</script>
