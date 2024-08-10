<template>
    <footer class="block md:hidden navbar">
        <div class="flex bg-neutral text-neutral-content justify-between max-w-96 mx-auto rounded-lg">
            <router-link class="router-link" to="/">
                <i class="fa-solid fa-house"></i>
                <span>Home</span>
            </router-link>

            <router-link class="router-link" to="/project">
                <i class="fa-solid fa-diagram-project"></i>
                <span>Projects</span>
            </router-link>

            <div class="dropdown dropdown-top dropdown-end router-link"
                 :class="{ 'router-link-active': isCurrentRouteProfile }">
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
        </div>
    </footer>
</template>
<script>
export default {
    name: 'NavigationFooterComponent',
    props: {
        logout: {}
    },
    computed: {
        isCurrentRouteProfile() {
            return this.$route.name === 'profile';
        }
    }
}
</script>