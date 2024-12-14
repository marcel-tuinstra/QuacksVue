class ProjectHelper {
    static categories() {
        return [
            'software_development', 'devops', 'freelance', 'home_projects', 'education', 'other'
        ];
    }

    static statuses() {
        return [
            'not_started', 'in_progress', 'completed', 'halted'
        ]
    }

    static statusToLabel(status) {
        switch (status) {
            case 'not_started':
                return 'Not Started';
            case 'in_progress':
                return 'In Progress';
            case 'completed':
                return 'Completed';
            case 'halted':
                return 'Halted';
            default:
                return 'Unknown';
        }
    }

    static categoryToLabel(category) {
        switch (category) {
            case 'software_development':
                return 'Software Development';
            case 'devops':
                return 'DevOps';
            case 'freelance':
                return 'Freelance';
            case 'home_projects':
                return 'Home Projects';
            case 'education':
                return 'Education';
            case 'other':
                return 'Other';
            default:
                return 'Unknown';
        }
    }

    static categoryToIcon(category) {
        switch (category) {
            case 'software_development':
                return 'code';
            case 'devops':
                return 'server';
            case 'freelance':
                return 'user-tie';
            case 'home_projects':
                return 'house';
            case 'education':
                return 'graduation-cap';
            case 'other':
                return 'cubes';
            default:
                return 'bug';
        }
    }
}

export default ProjectHelper;