<template>
    <aside class="navigation hidden md:block m-10">
        <div class="bg-neutral text-neutral-content rounded-lg py-1">
            <router-link class="router-link router-link-active" to="/">
                <img class="rounded" src="../../assets/images/logo.svg" width="40" alt="Quacks Logo">
            </router-link>

            <span class="block border-b-2 border-neutral-content/20 my-1 mx-6 rounded"></span>

            <router-link class="router-link" to="/">
                <i class="fa-solid fa-house"></i>
                <span>Home</span>
            </router-link>

            <router-link class="router-link" to="/investment">
                <i class="fa-solid fa-money-bill-trend-up"></i>
                <span>Investments</span>
            </router-link>

            <router-link class="router-link" to="/project">
                <i class="fa-solid fa-diagram-project"></i>
                <span>Projects</span>
            </router-link>

            <span class="block border-b-2 border-neutral-content/20 my-1 mx-6 rounded"></span>

            <div class="dropdown dropdown-right router-link"
                 :class="{ 'router-link-active': isCurrentRouteProfile }">
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
</template>
<script>
export default {
    name: 'navigationSide',
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