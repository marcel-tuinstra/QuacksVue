<template>
    <div class="modal-action">
        <button class="btn btn-link text-base-content" @click="$emit(closeModalAction)">Close</button>
        <button class="btn btn-primary" @click="$emit(submitModalAction)" v-text="submitModalButton"></button>
    </div>
</template>

<script>
export default {
    name: 'ButtonsModalComponent',
    props: {
        closeModalAction: {
            type: String,
            default: 'closeModal'
        },
        submitModalAction: {
            type: String,
            default: 'submitModal'
        },
        submitModalButton: {
            type: String,
            default: 'Some Button'
        }
    }
}
</script>