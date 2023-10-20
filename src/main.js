import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.css"
import Swal from 'sweetalert2'



createApp(App).use(store).use(router).mount('#app')

import 'bootstrap/dist/js/bootstrap'
