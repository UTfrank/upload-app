<script setup>
</script>
<template lang="">
  <form>
    <div class="mb-5 font-poppins">
      <label for="email" class=" mb-[10px] text-sm text-gray-200 leading-5">Email Address</label>
      <input type="email" v-model="email" id="email" class="py-[15px] px-[22px] rounded-[35px] w-full border border-gray-200 text-gray-400 bg-transparent" placeholder="example@mail.com" required>
    </div>
    <div class="mb-5 font-poppins">
      <label for="password" class="mb-[10px] text-sm text-gray-200 leading-5">Password</label>
      <input type="password" v-model="password" id="password" class="py-[15px] px-[22px] rounded-[35px] w-full border border-gray-200 text-gray-400 bg-transparent" placeholder="*********" required>
    </div>
    <div class="mb-5 font-poppins flex items-center gap-x-1">
      <input type="checkbox" v-model="checked" id="checkbox" class="h-[19px] w-[19px] bg-transparent rounded-md" required>
      <label for="checkbox" class="text-sm text-gray-200 leading-5">Remember me</label>
    </div>
    <div class="mb-5 font-poppins flex items-center gap-x-1">
      <button type="submit" class="font-semibold text-base leading-[28px] text-center w-full bg-blue-600 text-white py-4 rounded-[50px]">Login</button>
    </div>
  </form>
</template>
<style scoped>
  
</style>