<template>
    <label class="form-control w-full">
        <div class="label" v-if="label">
            <span class="label-text">
                {{ label }} <sup class="fa-solid fa-asterisk text-error" v-if="isRequired"></sup>
            </span>
        </div>
        <textarea class="textarea textarea-ghost min-h-32" placeholder="Awesome potato"
                  :id="id + '-input'"
                  v-model="object[id]"
                  :required="isRequired"
                  :disabled="isDisabled"
                  @focus="autoResize"
                  @input="autoResize"
                  @change="$emit('onChange')"
                  ref="textarea"></textarea>
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
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        object: {
            type: Object,
            required: true,
        }
    },
    computed: {
        isRequired() {
            return this.required == 1;
        },
        isDisabled() {
            return this.disabled == 1;
        }
    },
    methods: {
        autoResize() {
            const textarea = this.$refs.textarea;
            textarea.style.height = 'auto'; // Reset height to auto to accurately calculate the scrollHeight
            textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to scrollHeight
        }
    }
}
</script>