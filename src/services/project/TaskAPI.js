// src/services/project/TaskAPI.js
import AxiosService from './../AxiosService';

class TaskAPI extends AxiosService {
    getTasks(project) {
        console.log(project)
        return this.get(`/project/task/${project.id}`);
    }

    getTaskById(id) {
        return this.get(`/project/task/${id}`);
    }

    createTask(project) {
        return this.post(`/project/task/${project.id}`);
    }

    updateTask(id, taskDTO) {
        if (id !== taskDTO.id) {
            throw new Error('Invalid Task ID Provided.')
        }

        return this.put(`/project/task/${id}`, taskDTO);
    }

    deleteTask(id) {
        return this.delete(`/project/task/${id}`);
    }

    // Additional project methods as needed
}

export default new TaskAPI();
