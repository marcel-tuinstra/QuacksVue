<template>
    <label class="form-control w-full">
        <div class="label" v-if="label">
            <span class="label-text">
                {{ label }} <sup class="fa-solid fa-asterisk text-error" v-if="isRequired"></sup>
            </span>
        </div>
        <input :id="id + '-input'" type="date" class="input input-ghost w-full" placeholder="2024-09-17"
               :min="now" v-model="object[id]" :required="isRequired" :disabled="isDisabled" @change="$emit('onChange')">
        <div class="label justify-start gap-1 hidden">
            <i class="fa-solid fa-circle-info text-error"></i>
            <span class="label-text-alt label-text-error text-error" :id="id + '-error'"></span>
        </div>
    </label>
</template>

<script>
import {now} from "@/helpers/DateTimeHelper";
import { format, parseISO } from 'date-fns';

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
        },
        now() {
            return now();
        }
    }
}
</script>