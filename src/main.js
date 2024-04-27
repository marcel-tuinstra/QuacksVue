import {createAuth0} from '@auth0/auth0-vue';
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/main.scss'

createApp(App)
    .use(createAuth0({
        domain: process.env.VUE_APP_AUTH_DOMAIN,
        clientId: process.env.VUE_APP_AUTH_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin + '/callback'
        }
    }))
    .use(store)
    .use(router)
    .mount('#app')
