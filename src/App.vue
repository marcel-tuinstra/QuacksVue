<template>
    <div class="min-h-screen flex flex-col md:flex-row">
        <aside class="navigation hidden md:block m-10">
            <div class="bg-neutral text-neutral-content rounded-lg py-1">
                <router-link class="router-link router-link-active" to="/">
                    <img class="rounded" src="@/assets/images/logo.svg" width="40" alt="Quacks Logo">
                </router-link>

                <span class="block border-b-2 border-neutral-content/20 my-1 mx-6 rounded"></span>

                <router-link class="router-link" to="/">
                    <i class="fa-solid fa-house"></i>
                    <span>Home</span>
                </router-link>

                <router-link class="router-link" to="/project">
                    <i class="fa-solid fa-diagram-project"></i>
                    <span>Projects</span>
                </router-link>

                <router-link class="router-link" to="/unknown">
                    <i class="fa-solid fa-bug"></i>
                    <span>Unknown</span>
                </router-link>

                <span class="block border-b-2 border-neutral-content/20 my-1 mx-6 rounded"></span>

                <div class="dropdown dropdown-right router-link">
                    <div tabindex="0" role="button">
                        <i class="fa-solid fa-user-astronaut"></i>
                        <span>Profile</span>
                    </div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu ms-1 p-2 shadow bg-neutral text-neutral-content rounded-box w-52">
                        <li>
                            <router-link class="hover:bg-neutral-content/20" to="/profile">
                                <i class="fa-solid fa-id-card"></i> Your Account
                            </router-link>
                        </li>
                        <li>
                            <a class="hover:bg-neutral-content/20" @click="logout">
                                <i class="fa-solid fa-right-from-bracket"></i> Sign Out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>

        <main class="flex-grow mt-5 md:mt-10 mx-5 md:ms-0 md:me-10">
            <h1 class="font-bold text-lg" v-text="currentRouteName"></h1>
            <router-view/>
        </main>

        <footer class="flex md:hidden bg-neutral text-neutral-content rounded-t-lg navbar">
            <router-link class="router-link" to="/">
                <i class="fa-solid fa-house"></i>
                <span>Home</span>
            </router-link>

            <router-link class="router-link" to="/project">
                <i class="fa-solid fa-diagram-project"></i>
                <span>Projects</span>
            </router-link>

            <router-link class="router-link" to="/unknown">
                <i class="fa-solid fa-bug"></i>
                <span>Unknown</span>
            </router-link>

            <div class="dropdown dropdown-top dropdown-end router-link">
                <div tabindex="0" role="button">
                    <i class="fa-solid fa-user-astronaut"></i>
                    <span>Profile</span>
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu mb-4 p-2 shadow bg-neutral rounded-box w-52">
                    <li>
                        <router-link class="hover:bg-neutral-content/20" to="/profile">
                            <i class="fa-solid fa-id-card"></i> Your Account
                        </router-link>
                    </li>
                    <li>
                        <a class="hover:bg-neutral-content/20" @click="logout">
                            <i class="fa-solid fa-right-from-bracket"></i> Sign Out
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    </div>
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
        currentRouteName() {
            return this.$route.meta.title;
        },
        currentUser() {
            return store.getters.currentUser;
        }
    }
};
</script>