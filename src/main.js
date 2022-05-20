import { createApp } from 'vue';
import Notifications from '@kyvg/vue3-notification';
import App from './App.vue';
import router from './router';
import store from "./store";
import "./assets/css/bootstrap.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/global.css";


import "./assets/js/bootstrap.min.js";
import "./assets/js/global.js";

import firebaseMessaging from './firebase'
import VueTheMask from 'vue-the-mask'


const app = createApp(App)
app.use(Notifications)

app.use(VueTheMask)
app.use(router)
app.use(store)

app.config.globalProperties.$messaging = firebaseMessaging


app.mount('#app')
