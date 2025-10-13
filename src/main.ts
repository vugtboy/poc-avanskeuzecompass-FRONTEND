import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routing/home.router.ts'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)
app.use(router)
app.mount('#app')
