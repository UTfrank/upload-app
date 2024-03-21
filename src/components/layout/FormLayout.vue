<script setup>
import { ref } from 'vue'
import Login from '../auth/Login.vue';
</script>

<template>
  <div class="w-full h-screen bg-blue-950 flex">
    <div class="lg:w-1/2 hidden lg:flex justify-center items-center">
      <img src="../../assets/form-img.png" alt="lady smiling" class="w-7/12">
    </div>
    <div class="lg:w-1/2 md:w-full flex justify-center items-center">
      <div class="lg:w-8/12 md:w-6/12 w-10/12">
        <h2 class="font-poppins font-semibold text-white md:text-4xl text-[28px] lg:mb-[60px] mb-5">Welcome back 👋</h2>
        <Login />
      </div>
    </div>
  </div>
</template>

<style scoped>
  
</style>