import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/auth/Login.vue"
import Upload from "@/views/Upload.vue"

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/upload", name: "Upload", component: Upload }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router