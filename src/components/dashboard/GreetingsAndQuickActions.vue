<template>
    <div>
        <!-- User Greeting -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Hello, {{ user.name }}!</h1>
        </div>

        <!-- Quick Stats Section -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="stats bg-base-200 p-4 rounded-box col-span-2">
                <div class="stat">
                    <div class="stat-title">Projects by Status</div>
                    <div class="flex justify-between grid-cols-4 gap-4">
                        <div v-for="projectsInStatus in projectsByStatus" class="text-center">
                            <div class="stat-value" v-text="projectsInStatus.value"></div>
                            <div class="stat-desc" v-text="projectsInStatus.label"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="stats bg-base-200 p-4 rounded-box">
                <div class="stat">
                    <div class="stat-title">Open Tasks</div>
                    <div class="stat-value">{{ tasks }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectHelper from "@/helpers/ProjectHelper";

export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
        projects: {
            type: Array,
            required: true,
        }
    },
    computed: {
        projectsByStatus() {
            return ProjectHelper.statuses().map(status => {
                const count = this.projects.filter(project => project.status === status).length;

                return {
                    value: count,
                    label: ProjectHelper.statusToLabel(status)
                };
            });
        },
        tasks() {
            // Sum up the total open tasks across all projects
            return this.projects.reduce((total, project) => {
                return total + (project.counters?.tasksOpen || 0);
            }, 0);
        },
    }
};
</script>