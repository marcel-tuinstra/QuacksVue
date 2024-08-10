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
                <span class="text-nowrap">{{ currentUser.counters.projects }} projects</span>
                &#x2022;
                <span class="text-nowrap">{{ currentUser.meta.createdAt }}</span>
            </div>
        </div>
        <div class="absolute right-0 mt-2 md:mt-0 md:relative md:ms-auto">
            <button class="btn btn-outline btn-sm md:btn-md" @click="openModal">
                Edit Profile
            </button>
        </div>
    </div>

    <div class="block md:flex md:gap-3 justify-between mt-5">
        <div class="opacity-25">Some reserved space :)</div>
        <div class="hidden md:block w-60 lg:w-72 bg-base-200 base-content p-3 rounded-lg">
            <h3 class="font-bold text-lg text-nowrap border-b border-base-300 mb-2 pb-2 truncate">
                {{ currentUser.name }}
            </h3>
            <div class="columns-2">
                <div class="w-full flex flex-col">
                    <span class="font-bold text-sm">{{ currentUser.counters.projects }}</span>
                    <span class="text-xs">Projects</span>
                </div>
                <div class="w-full flex flex-col">
                    <span class="font-bold text-sm">{{ memberSinceFormatted }}</span>
                    <span class="text-xs">Member since</span>
                </div>
            </div>
        </div>
    </div>

    <dialog id="modal_profile" class="modal">
        <div class="modal-box">
            <HeaderModalComponent @close-modal="closeModal" modal-heading="Edit your profile"/>
            <form id="user_profile_form" @submit.prevent="submitForm">
                <TextInputComponent id="email" label="Email" required="1" disabled="1" :object="user"/>
                <TextInputComponent id="nickname" label="Nickname" required="0" disabled="0" :object="user"/>
            </form>
            <FooterModalComponent @close-modal="closeModal" @submit-modal="submitForm" submit-modal-button="Save Changes"/>
        </div>
    </dialog>
</template>

<script>
import store from "@/store";
import UserAPI from "@/services/UserAPI";
import TextInputComponent from "@/components/form/TextInputComponent";
import FooterModalComponent from "@/components/modal/FooterModalComponent";
import HeaderModalComponent from "@/components/modal/HeaderModalComponent";
import FormHelper from "@/helpers/FormHelper"
import {formatAsDate} from "@/helpers/DateTimeHelper"

export default {
    name: 'ProjectsView',
    components: {FooterModalComponent, HeaderModalComponent, TextInputComponent},
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
        },
        memberSinceFormatted() {
            return formatAsDate(this.currentUser.meta.createdAt);
        }
    }
}
</script>
