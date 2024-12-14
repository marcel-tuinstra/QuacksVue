<template>
    <greetings-and-quick-actions :user="currentUser" :projects="projects"/>

    <div class="mt-10">
        <h2 class="text-lg font-bold mb-4">Due Projects</h2>
        <div class="space-y-4">
            <card-component v-for="(project, index) in applySortingByDueDate(projects).slice(0, 3)"
                            :key="project.id" :project="project" :index="index">
            </card-component>
        </div>
    </div>
</template>

<script>
import store from "@/store";
import CardComponent from "@/components/project/CardComponent.vue";
import ProjectAPI from "@/services/ProjectAPI";
import GreetingsAndQuickActions from "@/components/dashboard/GreetingsAndQuickActions.vue";

export default {
    name: 'HomeView',
    components: {GreetingsAndQuickActions, CardComponent},
    data: function () {
        return {
            projects: []
        };
    },
    computed: {
        currentUser() {
            return store.getters.currentUser;
        }
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
        applySortingByDueDate(projects) {
            return projects.sort((a, b) => {
                const projectA = new Date(a.dueAt).getTime();
                const projectB = new Date(b.dueAt).getTime();
                return projectA - projectB;
            });
        }
    },
    mounted() {
        this.getProjects();
    }
}
</script>
