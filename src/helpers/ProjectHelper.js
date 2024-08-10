class ProjectHelper {
    static statusToLabel(status) {
        switch (status) {
            case 'not_started':
                return 'Not Started';
            case 'in_progress':
                return 'In Progress';
            case 'in_testing':
                return 'In Testing';
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
}

export default ProjectHelper;