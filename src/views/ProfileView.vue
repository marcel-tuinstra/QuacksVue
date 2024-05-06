<template>
    <div class="flex flex-col md:flex-row md:items-center relative">
        <div class="md:me-2">
            <i class="fa-solid fa-circle-user icon-5xl"></i>
        </div>
        <div>
            <h2 class="font-bold text-lg">{{ currentUser.name }}</h2>
            <div class="hidden md:block">{{ currentUser.email }}</div>
            <div class="md:hidden text-sm">
                <span class="text-nowrap">{{ currentUser.email }}</span>
                &#x2022;
                <span class="text-nowrap">9 projects</span>
                &#x2022;
                <span class="text-nowrap">11 May 2024</span>
            </div>
        </div>
        <div class="absolute right-0 mt-2 md:mt-0 md:relative md:ms-auto">
            <button class="btn btn-outline btn-sm md:btn-md" @click="openModal">
                Edit Profile
            </button>
        </div>
    </div>

    <dialog id="modal_profile" class="modal">
        <div class="modal-box">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
            <h3 class="font-bold text-lg">Edit your profile</h3>
            <form id="user_profile_form" @submit.prevent="submitForm">
                <div class="columns-1 md:columns-2">
                    <TextInputComponent id="nickname" label="Nickname" required="0" disabled="0" :object="user"/>
                    <TextInputComponent id="email" label="Email" required="1" disabled="1" :object="user"/>
                </div>
            </form>

            <div class="modal-action">
                <button class="btn btn-outline" @click="closeModal">Close</button>
                <button class="btn btn-primary" @click="submitForm">Save Changes</button>
            </div>
        </div>
    </dialog>
</template>

<script>
import store from "@/store";
import UserAPI from "@/services/UserAPI";
import TextInputComponent from "@/components/TextInputComponent";
import FormHelper from "@/helpers/FormHelper"

export default {
    name: 'ProjectsView',
    components: {TextInputComponent},
    data: function () {
        return {
            user: {
                id: null,
                email: '',
                nickname: '',
            }
        };
    },
    methods: {
        async submitForm() {
            const vm = this;

            UserAPI.updateUser(this.currentUser.id, this.user)
                .then(function (response) {
                    store.dispatch('updateUser', {
                        user: response.data
                    });

                    vm.closeModal();
                })
                .catch(function (error) {
                    const responseData = error.response.data;

                    FormHelper.handleErrors('user_profile_form', responseData.errors);
                });
        },
        mapUserProperties(objectDTO, object) {
            Object.keys(objectDTO).forEach(key => {
                if (object.hasOwnProperty(key)) {
                    objectDTO[key] = object[key];
                }
            });
        },
        openModal() {
            this.mapUserProperties(this.user, this.currentUser);
            modal_profile.showModal();
        },
        closeModal() {
            this.mapUserProperties(this.user, this.currentUser);
            FormHelper.resetForm('user_profile_form');
            modal_profile.close();
        }
    },
    computed: {
        currentUser() {
            return store.getters.currentUser;
        }
    }
}
</script>
