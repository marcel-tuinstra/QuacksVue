<template>
    <h2 class="mb-2">Manage your projects.</h2>

    <div role="tablist" class="tabs tabs-bordered overflow-x-auto">
        <input type="radio" name="project_tabs" role="tab" class="tab" data-icon="folder" aria-label="All" checked/>
        <div role="tabpanel" class="tab-content">
            <div class="flex flex-col md:flex-row md:flex-wrap gap-3 my-3">
                <a class="border-2 border-base-content cursor-pointer rounded p-2 w-full md:w-80">
                    <!--                   href="{{ path('app_project', {'id': project.id}) }}">-->
                    <h2>
                        <i class="fa-solid fa-folder-closed"></i>
                        Some Title
                    </h2>
                    <div class="flex gap-2 mt-2">
                        <div class="badge badge-ghost badge-sm">Template</div>
                        <div class="badge badge-ghost badge-sm">Some Tag A</div>
                        <div class="badge badge-ghost badge-sm">Some Tag B</div>
                    </div>
                    <div class="badge badge-secondary badge-sm items-center gap-1 mt-4">
                        <i class="fa-solid fa-circle fa-2xs opacity-20"></i>
                        In Progress
                    </div>
                    <div class="flex gap-2 items-center mt-1">
                        <span class="text-sm">54%</span>
                        <div class="w-24">
                            <progress class="progress progress-accent w-24" value="54" max="100"></progress>
                        </div>
                    </div>
                    <div class="mt-2 text-sm">
                        <i class="fa-regular fa-clock"></i> September 17, 2024
                    </div>
                </a>

                <label for="project_new_modal"
                       class="border-2 border-base-content/20 cursor-pointer flex gap-1 items-center justify-center min-h-36 rounded text-base-content/20 w-full md:w-80 hover:border-base-content hover:text-base-content">
                    <i class="fa-solid fa-plus"></i> New
                </label>
            </div>
        </div>

        <input type="radio" name="project_tabs" role="tab" class="tab" data-icon="urgent" aria-label="Urgent"/>
        <div role="tabpanel" class="tab-content">
            <div class="flex gap-3 my-3 flex-wrap">
                <!--                {% for project in projects.isCritical() %}-->
                <!--                <twig:ProjectCard :project="project"></twig:ProjectCard>-->
                <!--                {% endfor %}-->
            </div>
        </div>

        <button class="tab" type="button">
            <i class="fa-solid fa-plus"></i>
        </button>

        <!--        {% for category in categories %}-->
        <!--        <input type="radio" name="project_tabs" role="tab" class="tab" data-icon="client"-->
        <!--               aria-label="{{ category.title }}"/>-->
        <!--        <div role="tabpanel" class="tab-content">-->
        <!--            {% for project in projects.byCategory(category) %}-->
        <!--            <twig:ProjectCard :project="project"></twig:ProjectCard>-->
        <!--            {% endfor %}-->
        <!--        </div>-->
        <!--        {% endfor %}-->
    </div>
</template>

<script>
import UserAPI from "@/services/UserAPI";

export default {
    name: 'ProjectsView',
    data: function () {
        return {
            users: null
        };
    },
    methods: {
        async getUsers() {
            try {
                const response = await UserAPI.getUsers();
                this.users = response.data;
            } catch (error) {
                console.error('There was an error fetching the users:', error);
            }
        }
    }
}
</script>
