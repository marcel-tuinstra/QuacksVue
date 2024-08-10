<template>
    <label class="form-control w-full">
        <div class="label" v-if="label">
            <span class="label-text">
                {{ label }} <sup class="fa-solid fa-asterisk text-error" v-if="isRequired"></sup>
            </span>
        </div>
        <input :id="id + '-input'" type="text" class="input input-ghost w-full" placeholder="Awesome potato"
               v-model="object[id]" :required="isRequired" :disabled="isDisabled" @change="$emit('onChange')">
        <div class="label justify-start gap-1 hidden">
            <i class="fa-solid fa-circle-info text-error"></i>
            <span class="label-text-alt label-text-error text-error" :id="id + '-error'"></span>
        </div>
    </label>
</template>

<script>
export default {
    name: 'TextInputComponent',
    props: {
        id: '',
        label: null,
        required: 0,
        disabled: 0,
        object: {}
    },
    computed: {
        isRequired() {
            return this.required == 1
        },
        isDisabled() {
            return this.disabled == 1
        }
    }
}
</script>