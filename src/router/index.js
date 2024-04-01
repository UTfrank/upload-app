import { createRouter, createWebHistory } from 'vue-router'
import Upload from "@/views/Upload.vue"

const routes = [
  { path: "/", redirect: "/upload" }, // Redirect from "/" to "/upload"
  { path: "/upload", name: "Upload", component: Upload }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router