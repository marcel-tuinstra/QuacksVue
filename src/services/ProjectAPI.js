// src/services/ProjectAPI.js
import AxiosService from './AxiosService';

class ProjectAPI extends AxiosService {
    getProjects(excludeDeleted = true) {
        return this.get('/project', {
            excludeDeleted: excludeDeleted,
        });
    }

    getProjectById(id) {
        return this.get(`/project/${id}`);
    }

    createProject(projectData) {
        return this.post('/project', projectData);
    }

    updateProject(id, projectDTO) {
        if (id !== projectDTO.id) {
            throw new Error('Invalid Project ID Provided.')
        }

        return this.put(`/project/${id}`, projectDTO);
    }

    deleteProject(id) {
        return this.delete(`/project/${id}`);
    }

    // Additional project methods as needed
}

export default new ProjectAPI();
