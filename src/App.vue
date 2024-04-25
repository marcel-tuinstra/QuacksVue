<template>
    <nav>
        <router-link to="/">Home</router-link>
        <button @click="logout">Log out</button>
    </nav>
    <router-view/>
</template>

<script>
import store from '@/store';
import AuthService from "@/services/AuthService";

export default {
    methods: {
        logout() {
            AuthService.logout();
            this.$router.go();
        }
    },
    computed: {
        user() {
            return store.getters.currentUser;
        }
    }
};
</script>