// src/services/UserAPI.js
import AxiosService from './AxiosService';

class UserAPI extends AxiosService {
    getUsers() {
        return this.get('/user');
    }

    getUserById(id) {
        return this.get(`/user/${id}`);
    }

    createUser(userData) {
        return this.post('/user', userData);
    }

    updateUser(id, userDTO) {
        if (id !== userDTO.id) {
            throw new Error('Invalid User ID Provided.')
        }

        return this.put(`/user/${id}`, userDTO);
    }

    // Additional user methods as needed
}

export default new UserAPI();
