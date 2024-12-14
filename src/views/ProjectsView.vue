<template>
    <h2 class="mb-2">Manage your projects.</h2>

    <div role="tablist" class="tabs tabs-bordered overflow-x-auto">
        <input type="radio" name="project_tabs" role="tab" class="tab" data-icon="folder" aria-label="All" checked/>
        <div role="tabpanel" class="tab-content">
            <div class="flex flex-col md:flex-row md:flex-wrap gap-3 my-3">
                <card-component v-for="(project, index) in applySortingByName(projects)" v-show="!project.meta.isDeleted"
                                :key="project.id" :project="project" :index="index"
                                @preview="openProject" @delete="deleteProject" @clone="cloneProject"
                ></card-component>

                <label for="project_new_modal" @click="openNewProjectModal"
                       class="border-2 border-base-content/20 cursor-pointer flex gap-1 items-center justify-center min-h-36 rounded text-base-content/20 w-full md:w-80 hover:border-base-content hover:text-base-content">
                    <i class="fa-solid fa-plus"></i> New
                </label>
            </div>
        </div>

        <template v-for="category in categories">
            <input type="radio" name="project_tabs" role="tab" class="tab" :data-icon="ProjectHelper.categoryToIcon(category)" :aria-label="ProjectHelper.categoryToLabel(category)"/>
            <div role="tabpanel" class="tab-content">
                <div class="flex flex-col md:flex-row md:flex-wrap gap-3 my-3" v-if="hasProjectsByCategory(category.value)">
                    <card-component v-for="(project, index) in projectsByCategory(category.value)"
                                    :key="project.id" :project="project" :index="index"
                                    @preview="openProject" @delete="deleteProject" @clone="cloneProject"
                    ></card-component>
                </div>
                <div class="my-3 opacity-50" v-else>
                    <i>No projects created for {{ ProjectHelper.categoryToLabel(category) }}</i>
                </div>
            </div>
        </template>

        <div class="tab"><!-- placeholder line --></div>
    </div>

    <dialog id="modal_new_project" class="modal">
        <div class="modal-box">
            <HeaderModalComponent @close-modal="closeNewProjectModal" modal-heading="New project"/>
            <form id="new_project_form" @submit.prevent="submitNewProjectForm">
                <TextInputComponent id="title" label="Title" required="1" disabled="0" :object="project"/>
                <SelectComponent id="category" label="Category" required="1" disabled="0" :object="project" :options="projectCategoryOptions"/>
                <TextareaComponent id="description" label="Description" required="0" disabled="0" :object="project"/>
            </form>
            <FooterModalComponent @close-modal="closeNewProjectModal" @submit-modal="submitNewProjectForm" submit-modal-button="Save"/>
        </div>
    </dialog>

    <div class="drawer drawer-end">
        <input id="drawer-project" type="checkbox" class="drawer-toggle"/>
        <div class="drawer-side">
            <label for="drawer-project" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="w-full md:w-192 py-4 px-5 min-h-full bg-base-200 text-base-content">
                <h3 class="text-2xl flex items-center gap-2">
                    <i class="fa-solid fa-folder-closed"></i>
                    <TextInputComponent id="title" required="1" disabled="0" :object="project" @onChange="updateProject"/>
                </h3>
                <label for="drawer-project" class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</label>

                <div class="drawer-content my-3">
                    <table class="table table-sm">
                        <colgroup>
                            <col class="w-1/6">
                            <col>
                        </colgroup>
                        <tbody>
                        <tr>
                            <td class="ps-0"><i class="fa-solid fa-layer-group"></i> Category</td>
                            <td>
                                <SelectComponent id="category" required="1" disabled="0" :object="project" :options="projectCategoryOptions" @onChange="updateProject"/>
                            </td>
                        </tr>
                        <tr>
                            <td class="ps-0"><i class="fa-solid fa-gauge"></i> Status</td>
                            <td>
                                <SelectComponent id="status" required="1" disabled="0" :object="project" :options="projectStatusOptions" @onChange="updateProject"/>
                            </td>
                        </tr>
                        <tr>
                            <td class="ps-0"><i class="fa-solid fa-calendar-days"></i> Due Date</td>
                            <td>
                                <DateInputComponent id="dueAt" required="1" disabled="0" :object="project" @onChange="updateProject"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div class="divider divider-start font-semibold mb-2">Description</div>

                    <TextareaComponent id="description" required="0" disabled="0" :object="project" @onChange="updateProject"/>

                    <div class="divider divider-start font-semibold mb-2">Tasks</div>

                    <ul id="task-list" class="list-none">
                        <li v-for="(task, index) in project.tasks" :key="index" class="flex items-center gap-1 mb-2">
                            <!-- Checkbox -->
                            <input
                                type="checkbox"
                                :checked="task.completedAt !== null"
                                @click="completeTask(task)"
                                class="checkbox checkbox-sm"
                            />

                            <!-- Task Description Input -->
                            <TextInputComponent
                                id="description"
                                additional-class="input-sm"
                                required="1"
                                disabled="0"
                                :object="task"
                                @onChange="updateTask(task)"
                            />

                            <!-- Delete Button -->
                            <button
                                class="btn btn-sm btn-square btn-outline"
                                @click="deleteTask(task, index)"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </li>

                        <!-- Add New Task Button -->
                        <li class="text-opacity-50 hover:text-opacity-100 cursor-pointer pt-3" @click="createTask">
                            <i class="fa-solid fa-plus"></i> New
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectAPI from "@/services/ProjectAPI";
import TaskAPI from "@/services/project/TaskAPI";
import CardComponent from "@/components/project/CardComponent";
import DateInputComponent from "@/components/form/DateInputComponent";
import SelectComponent from "@/components/form/SelectComponent";
import TextInputComponent from "@/components/form/TextInputComponent";
import TextareaComponent from "@/components/form/TextareaComponent";
import HeaderModalComponent from "@/components/modal/HeaderModalComponent";
import FooterModalComponent from "@/components/modal/FooterModalComponent";
import {now} from "@/helpers/DateTimeHelper";
import FormHelper from "@/helpers/FormHelper";
import ProjectHelper from "@/helpers/ProjectHelper";

export default {
    name: 'ProjectsView',
    components: {CardComponent, FooterModalComponent, HeaderModalComponent, DateInputComponent, SelectComponent, TextInputComponent, TextareaComponent},
    data: function () {
        return {
            categories: ProjectHelper.categories(),
            statuses: ProjectHelper.statuses(),
            projects: [],
            project: {
                id: null,
                title: null,
                category: null,
                status: null,
                dueAt: null,
                description: null,
                tasks: [],
            },
        };
    },
    methods: {
        async getProjects() {
            try {
                const response = await ProjectAPI.getProjects();
                this.projects = response.data;
            } catch (error) {
                console.error('There was an error fetching the projects:', error);
            }
        },
        async getTasks(project) {
            try {
                const response = await TaskAPI.getTasks(project);
                this.project.tasks = response.data.filter((task) => !task.meta.isDeleted);
            } catch (error) {
                console.error('There was an error fetching the projects:', error);
            }
        },
        async submitNewProjectForm() {
            const vm = this;

            ProjectAPI.createProject(vm.project)
                .then(function (response) {
                    vm.projects.push(response.data);
                    vm.closeNewProjectModal();
                })
                .catch(function (error) {
                    const responseData = error.response.data;

                    FormHelper.handleErrors('new_project_form', responseData.errors);
                });
        },
        async updateProject() {
            const vm = this;

            ProjectAPI.updateProject(vm.project.id, vm.project)
                .then(function (response) {
                    const currentProjectIndex = vm.projects.findIndex((project) => project.id === vm.project.id);

                    vm.projects[currentProjectIndex] = response.data;
                })
                .catch(function (error) {
                    const responseData = error.response.data;

                    console.error(responseData.errors);
                });
        },
        async updateTask(task) {
            TaskAPI.updateTask(task.id, task)
                .catch(function (error) {
                    const responseData = error.response.data;

                    console.error(responseData.errors);
                });
        },
        async completeTask(task) {
            if (task.completedAt === null) {
                task.completedAt = now();
            } else {
                task.completedAt = null;
            }

            TaskAPI.updateTask(task.id, task)
                .catch(function (error) {
                    const responseData = error.response.data;

                    console.error(responseData.errors);
                });
        },
        async deleteProject(project, index) {
            const vm = this;

            ProjectAPI.deleteProject(project.id)
                .then(function (response) {
                    project.meta.isDeleted = true;
                    vm.projects[index].meta.isDeleted = true;

                    document.activeElement.blur();
                });
        },
        async deleteTask(task, taskIndex) {
            const vm = this;

            TaskAPI.deleteTask(task.id)
                .then(function (response) {
                    vm.project.tasks.splice(taskIndex, 1);

                    document.activeElement.blur();
                });
        },
        async cloneProject(project) {
            const vm = this;

            ProjectAPI.createProject(project)
                .then(function (response) {
                    vm.projects.push(response.data);
                    vm.mapUserProperties(vm.project);

                    document.activeElement.blur();
                });
        },
        async createTask() {
            const vm = this;

            TaskAPI.createTask(vm.project)
                .then(function (response) {
                    vm.project.tasks.push(response.data);

                    vm.$nextTick(() => {
                        // Get the last <li> element in the <ul> by selecting all and picking the last one
                        const ulElement = document.getElementById('task-list');
                        const liElements = ulElement.getElementsByTagName('li');
                        const lastLiElement = liElements[liElements.length - 2];

                        // Find the first input of type text within the last <li> element
                        const inputElement = lastLiElement.querySelector('input[type="text"]');
                        if (inputElement) {
                            inputElement.focus();
                        }
                    });
                });
        },
        mapUserProperties(objectDTO, object) {
            Object.keys(objectDTO).forEach(key => {
                if (object === undefined) {
                    objectDTO[key] = null;

                    return;
                }

                if (object.hasOwnProperty(key)) {
                    objectDTO[key] = object[key];
                }
            });
        },
        async openProject(project) {
            this.mapUserProperties(this.project, project);
            this.getTasks(project);
        },
        openNewProjectModal() {
            this.mapUserProperties(this.project);
            this.project.status = 'not_started';
            modal_new_project.showModal();
        },
        closeNewProjectModal() {
            modal_new_project.close();
            this.mapUserProperties(this.project);
            FormHelper.resetForm('new_project_form');
        },
        projectsByCategory(category) {
            const projects = this.projects
                .filter((project) => project.category === category);

            return this.applySortingByName(projects);
        },
        hasProjectsByCategory(category) {
            const projects = this.projects
                .filter((project) => project.category === category);

            return projects.length > 0;
        },
        applySortingByName(projects) {
            return projects.sort((a, b) => { // Use two parameters, `a` and `b`, for comparison
                const projectA = a.title.toUpperCase(); // Convert project A title to uppercase
                const projectB = b.title.toUpperCase(); // Convert project B title to uppercase

                if (projectA < projectB) {
                    return -1;
                }

                if (projectA > projectB) {
                    return 1;
                }

                return 0;
            });
        }
    },
    computed: {
        ProjectHelper() {
            return ProjectHelper
        },
        projectCategoryOptions() {
            let options = [];
            options = this.categories.map((category) => ({
                value: category,
                icon: ProjectHelper.categoryToIcon(category),
                label: ProjectHelper.categoryToLabel(category),
            }));

            return options;
        },
        projectStatusOptions() {
            let options = [];
            options = this.statuses.map((status) => ({
                value: status,
                label: ProjectHelper.statusToLabel(status),
            }));

            return options;
        }
    },
    mounted() {
        this.getProjects();
    }
}
</script>
