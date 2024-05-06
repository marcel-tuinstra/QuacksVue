// src/store/index.js
import {createStore} from 'vuex';

export default createStore({
    state: {
        user: null,
        token: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
        clearAuthData(state) {
            state.user = null;
            state.token = null;

            localStorage.removeItem('token');
        }
    },
    actions: {
        authenticateUser({commit}, authData) {
            commit('setToken', authData.token);
            commit('setUser', authData.user);
        },
        updateUser({commit}, response) {
            commit('setUser', response.user);
        },
        logoutUser({commit}) {
            commit('clearAuthData');
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token;
        },
        currentUser(state) {
            return state.user;
        }
    }
});
