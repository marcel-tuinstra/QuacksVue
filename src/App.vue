<template>
    <div class="min-h-screen flex flex-col md:flex-row">
        <NavigationSideComponent :logout="logout"/>

        <main class="flex-grow mt-5 md:mt-10 mx-5 md:ms-0 md:me-10">
            <h1 class="font-bold text-2xl mb-3" v-text="currentRouteName"></h1>
            <router-view/>
        </main>

        <NavigationFooterComponent :logout="logout"/>
    </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import NavigationSideComponent from "@/components/layout/NavigationSideComponent.vue";
import NavigationFooterComponent from "@/components/layout/NavigationFooterComponent.vue";

export default {
    components: {NavigationFooterComponent, NavigationSideComponent},
    methods: {
        logout() {
            AuthService.logout();
            this.$router.go();
        }
    },
    computed: {
        currentRouteName() {
            return this.$route.meta.title;
        },
    }
};
</script>