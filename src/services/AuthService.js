// src/services/AuthService.js
import AxiosService from './AxiosService';
import store from '@/store';

class AuthService extends AxiosService {
    constructor() {
        super(); // Initialize the base AxiosService
    }

    validateToken() {
        const token = this.getCurrentToken();

        if (!token) {
            return Promise.reject(new Error('No token available'));
        }

        return this.post('/login');
    }

    login(user) {
        return this.post('/login', {
            email: user.email,
            sub: user.sub
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);

                store.dispatch('authenticateUser', {
                    token: response.data.token,
                    user: response.data.user
                });
            }
            return response.data;
        });
    }

    loginFromSession(response) {
        localStorage.setItem('token', response.data.token);

        store.dispatch('authenticateUser', {
            token: response.data.token,
            user: response.data.user
        });
    }

    logout() {
        store.dispatch('logoutUser');
    }

    getCurrentToken() {
        return localStorage.getItem('token');
    }
}

export default new AuthService();
