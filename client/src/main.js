import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vClickOutside from "click-outside-vue3"
import axios from 'axios'

import './assets/tailwind.css'
import "./assets/icon-sax.css"

createApp(App).use(router).use(vClickOutside).mount('#app')

axios.defaults.baseURL = "https://kickoff-api.onrender.com";
axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('jwt')).token} ${JSON.parse(localStorage.getItem('jwt')).clubId}`;

