<template>
    <label class="form-control w-full max-w-xs">
        <div class="label">
            <span class="label-text">
                {{ label }} <i class="text-xs" v-if="!isRequired">(optional)</i>
            </span>
        </div>
        <input type="text" class="input input-bordered input-sm md:input-md w-full max-w-xs"
               :id="id + '-input'" placeholder="Awesome potato" v-model="object[id]" :required="isRequired" :disabled="isDisabled"/>
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
        label: '',
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