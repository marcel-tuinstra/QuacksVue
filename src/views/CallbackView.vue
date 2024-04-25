<template>
    <div>
        Handling authentication...
    </div>
</template>

<script>
import AuthService from "@/services/AuthService";

export default {
    data() {
        return {
            user: this.$auth0.user,
        };
    },
    watch: {
        user() {
            AuthService.login(this.user)
                .then(() => {
                    this.$router.push({name: 'home'})
                }).catch((error) => {
                // Handle errors, e.g., show a message to the user
                console.error('Login error:', error);
            });
        }
    },
};
</script>
