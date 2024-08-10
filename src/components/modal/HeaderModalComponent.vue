<template>
    <button class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3" @click="$emit(closeModalAction)">✕</button>
    <h3 v-text="modalHeading"></h3>
</template>

<script>
export default {
    name: 'ButtonsModalComponent',
    props: {
        closeModalAction: {
            type: String,
            default: 'closeModal'
        },
        modalHeading: {
            type: String,
            default: 'Example Heading'
        }
    }
}
</script>