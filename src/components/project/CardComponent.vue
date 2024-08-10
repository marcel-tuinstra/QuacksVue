<template>
    <div class="border-2 border-base-content rounded p-2 w-full md:w-80">
        <div class="flex justify-between">
            <label class="cursor-pointer font-semibold" for="drawer-project" @click="$emit('preview', project)">
                <i class="fa-solid fa-folder-closed me-1"></i>
                <span v-text="project.title"></span>
            </label>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-xs">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu mt-1 p-2 shadow bg-base-200 rounded-box w-52">
                    <li><a @click="$emit('delete', project, index)"><i class="fa-solid fa-trash"></i> Trash</a></li>
                    <li><a @click="$emit('clone', project)"><i class="fa-solid fa-clone"></i> Duplicate</a></li>
                    <li class="menu-divider"></li>
                </ul>
            </div>
        </div>
        <div class="flex gap-2 mt-2">
            <div class="badge badge-ghost badge-sm capitalize" v-text="toLabel('category', project.category)"></div>
        </div>
        <div class="badge badge-secondary badge-sm items-center mt-4">
            <i class="fa-solid fa-circle fa-2xs opacity-20 me-1"></i>
            {{ toLabel('status', project.status) }}
        </div>
        <div class="flex gap-2 items-center mt-1">
            <span class="text-sm">{{ project.percentage }}%</span>
            <div class="w-24">
                <progress class="progress progress-accent w-24" :value="project.percentage" max="100"></progress>
            </div>
        </div>
        <div class="mt-2 text-sm">
            <i class="fa-regular fa-clock me-1"></i>
            <span v-text="dueDateFormatted"></span>
        </div>
    </div>
</template>

<script>
import {formatAsDate} from "@/helpers/DateTimeHelper";
import ProjectHelper from "@/helpers/ProjectHelper";

export default {
    name: "CardComponent",
    props: {
        project: {
            required: true,
            type: Object
        },
        index: {
            required: true,
            type: Number
        }
    },
    computed: {
        dueDateFormatted() {
            return formatAsDate(this.project.dueAt);
        }
    },
    methods: {
        toLabel(type, value) {
            if (type === 'status') {
                return ProjectHelper.statusToLabel(value);
            } else if (type === 'category') {
                return ProjectHelper.categoryToLabel(value);
            }
        }
    }
}
</script>