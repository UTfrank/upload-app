<script setup>
</script>
<template lang="">
  <main class="w-full h-screen bg-blue-950 flex justify-center items-center font-poppins">
    <form class="md:w-6/12 w-10/12">
      <div class="col-span-full">
        <div class="mt-2 flex justify-center items-center gap-5 flex-col rounded-lg border border-dashed border-gray-500 px-6 py-10">
          <label for="file-upload" class="w-10/12 h-fit relative cursor-pointer rounded-md bg-white/[.08] font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 p-6 border border-gray-500">
            <div class="text-center">
              <div class="flex justify-center py-2">
                <img src="@/assets/cloud-upload.png" alt="upload icon" />
              </div>
              <div class="mt-2 flex text-base leading-6 text-white flex-col gap-5">
                <span class="block text-center">Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only" required />
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-300 mt-4">PNG, JPG, GIF up to 10MB</p>
            </div>

          </label>
          <div class="font-poppins flex justify-center items-center gap-x-1 w-10/12">
            <button type="submit" class="font-semibold text-base leading-[28px] text-center w-fit bg-blue-600 text-white py-3 px-10 rounded-[50px]">Upload</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>
<style scoped>
  
</style>