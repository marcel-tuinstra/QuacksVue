<template>
    <h2 class="mb-2">Manage your projects.</h2>

    <div role="tablist" class="tabs tabs-bordered overflow-x-auto">
        <input type="radio" name="project_tabs" role="tab" class="tab" data-icon="folder" aria-label="All" checked/>
        <div role="tabpanel" class="tab-content">
            <div class="flex flex-col md:flex-row md:flex-wrap gap-3 my-3">
                <card-component v-for="(project, index) in activeProjects" v-show="!project.meta.isDeleted"
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
            <input type="radio" name="project_tabs" role="tab" class="tab" :data-icon="category.icon" :aria-label="category.label"/>
            <div role="tabpanel" class="tab-content">
                <div class="flex flex-col md:flex-row md:flex-wrap gap-3 my-3">
                    <card-component v-for="(project, index) in activeProjectsByCategory(category.value)" v-show="!project.meta.isDeleted"
                                    :key="project.id" :project="project" :index="index"
                                    @preview="openProject" @delete="deleteProject" @clone="cloneProject"
                    ></card-component>
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
                <SelectComponent id="category" label="Category" required="1" disabled="0" :object="project" :options="categories"/>
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

                <div class="drawer-content mt-3">
                    <table class="table table-sm">
                        <colgroup>
                            <col class="w-1/6">
                            <col>
                        </colgroup>
                        <tbody>
                        <tr>
                            <td class="ps-0"><i class="fa-solid fa-layer-group"></i> Category</td>
                            <td>
                                <SelectComponent id="category" required="1" disabled="0" :object="project" :options="categories" @onChange="updateProject"/>
                            </td>
                        </tr>
                        <tr>
                            <td class="ps-0"><i class="fa-solid fa-gauge"></i> Status</td>
                            <td>
                                <SelectComponent id="status" required="1" disabled="0" :object="project" :options="statuses" @onChange="updateProject"/>
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

                    <hr class="border-base-300 mx-4">

                    <TextareaComponent id="description" required="0" disabled="0" :object="project" @onChange="updateProject"/>

                    <hr class="border-base-300 mx-4">


                    <table class="table table-sm table-tasks">
                        <colgroup>
                            <col class="w-6">
                            <col>
                            <col class="w-4">
                        </colgroup>
                        <thead>
                        <tr>
                            <th class="ps-0 text-xl font-semibold text-base-content" colspan="3">Tasks</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(task, index) in project.tasks">
                            <td class="px-0">
                                <input type="checkbox" :checked="task.completedAt !== null" @click="completeTask(task)" class="checkbox checkbox-sm mt-2"/>
                            </td>
                            <td>
                                <TextInputComponent id="description" required="1" disabled="0" :object="task" @onChange="updateTask(task)"/>
                            </td>
                            <td class="px-0">
                                <button class="btn btn-sm btn-square btn-outline" @click="deleteTask(task, index)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="text-opacity-50 hover:text-opacity-100" @click="createTask">
                                <i class="fa-solid fa-plus"></i> New
                            </td>
                        </tr>
                        </tbody>
                    </table>
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
            categories: [
                {'value': 'software_development', 'icon': 'code', 'label': ProjectHelper.categoryToLabel('software_development')},
                {'value': 'devops', 'icon': 'server', 'label': ProjectHelper.categoryToLabel('devops')},
                {'value': 'freelance', 'icon': 'client', 'label': ProjectHelper.categoryToLabel('freelance')},
                {'value': 'home_projects', 'icon': 'house', 'label': ProjectHelper.categoryToLabel('home_projects')},
                {'value': 'education', 'icon': 'education', 'label': ProjectHelper.categoryToLabel('education')},
                {'value': 'other', 'icon': 'other', 'label': ProjectHelper.categoryToLabel('other')},
            ],
            statuses: [
                {'value': 'not_started', 'label': ProjectHelper.statusToLabel('not_started')},
                {'value': 'in_progress', 'label': ProjectHelper.statusToLabel('in_progress')},
                {'value': 'in_testing', 'label': ProjectHelper.statusToLabel('in_testing')},
                {'value': 'completed', 'label': ProjectHelper.statusToLabel('completed')},
                {'value': 'halted', 'label': ProjectHelper.statusToLabel('halted')}
            ],
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
    computed: {
        activeProjects() {
            const projects = this.projects
                .filter((project) => !project.meta.isDeleted)

            return this.applySortingByName(projects);
        },
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
            modal_new_project.showModal();
        },
        closeNewProjectModal() {
            modal_new_project.close();
            this.mapUserProperties(this.project);
            FormHelper.resetForm('new_project_form');
        },
        activeProjectsByCategory(category) {
            const projects = this.projects
                .filter((project) => !project.meta.isDeleted)
                .filter((project) => project.category === category);

            return this.applySortingByName(projects);
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
    mounted() {
        this.getProjects();
    }
}
</script>
