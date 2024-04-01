import { createApp } from 'vue'
import './style.css'
import router from "@/router"
import App from './App.vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

createApp(App).use(router).use(VueReCaptcha, { siteKey: '6Ldz1aopAAAAALzWBVB_sVCDRbl7sCnxAtcVjTzt' }).mount('#app')
