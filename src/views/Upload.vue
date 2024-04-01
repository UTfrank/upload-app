<template>
  <main class="w-full h-screen bg-blue-950 flex justify-center items-center font-poppins">
    <form class="md:w-6/12 w-10/12" @submit.prevent="submitForm">
      <div class="col-span-full">
        <div class="mt-2 flex justify-center items-center gap-5 flex-col rounded-lg border border-dashed border-gray-500 px-6 py-10">
          <label for="file-upload" class="w-10/12 h-fit relative cursor-pointer rounded-md bg-white/[.08] font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 p-6 border border-gray-500">
            <div class="text-center">
              <div class="flex justify-center py-2">
                <img v-if="selectedFile" :src="selectedFileURL" alt="selected image" class="max-w-full max-h-48" />
                <img v-else src="@/assets/cloud-upload.png" alt="upload icon" class="max-w-full max-h-48" />
              </div>
              <div class="mt-2 flex text-base leading-6 text-white flex-col gap-5">
                <span class="block text-center">Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileUpload" />
              </div>
              <p class="text-xs leading-5 text-gray-300 mt-4">PNG, JPG</p>
            </div>
          </label>
          <div class="font-poppins flex justify-center items-center gap-x-1 w-10/12">
            <button type="submit" class="font-semibold text-base leading-[28px] text-center w-fit bg-blue-600 text-white py-3 px-10 rounded-[50px]" :disabled="!selectedFile">Upload</button>
          </div>
        </div>
      </div>
    </form>
    <div v-if="isLoading" class="absolute top-0 left-0 w-full h-full bg-black opacity-70 flex justify-center items-center">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
     <!-- Modal -->
     <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Response Details</h2>
        <div v-if="response">
          <div>
            <h3>Demographic Data</h3>
            <p>Date of Birth: {{ response.demographic_data.date_of_birth }}</p>
            <p>Ordering Physician Address: {{ response.demographic_data.ordering_physician_address }}</p>
            <!-- Add more fields as needed -->
          </div>
          <div>
            <h3>Quality Score</h3>
            <p>Quality Score: {{ response.quality_score.qualityScore }}</p>
            <!-- Add more fields as needed -->
          </div>
          <div>
            <h3>Required Tests</h3>
            <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="test in response.required_tests" :key="test.name">
                <td>{{ test.name }}</td>
                <td>{{ test.name_confidence }}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        <button class="font-semibold text-base leading-[28px] text-center w-fit bg-blue-600 text-white py-3 px-10 rounded-[50px] mt-4" @click="exportToCSV">Export to CSV</button>
      </div>
    </div>
    <!-- End Modal -->
  </main>
</template>

<script>
import { ref } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import axios from 'axios';
import Papa from 'papaparse';

export default {
  name: "App",
  setup() {
    const isLoading = ref(false);
    const { executeRecaptcha } = useReCaptcha();
    const selectedFile = ref(null);
    const selectedFileURL = ref(null);
    const response = ref(null);
    const showModal = ref(false);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      selectedFile.value = file;
      selectedFileURL.value = URL.createObjectURL(file);
    };

    const submitForm = async () => {
      const recaptchaToken = await recaptcha();
      if (!recaptchaToken) {
        console.error('Recaptcha verification failed');
        return;
      }

      console.log(selectedFile)

      isLoading.value = true;
      const formData = new FormData();
      formData.append('file', selectedFile.value);
      formData.append('token', recaptchaToken);

      try {
        const res = await axios.post('https://reqai-yocc3slzcq-uc.a.run.app/predict-checked-checkbox', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });

        if(res.status === 200) {
          showModal.value = true;
          response.value = res.data;
          isLoading.value = false;
          console.log(response.value);
        }
        // Handle response as needed
        
      } catch (error) {
        console.error('Error uploading file:', error);
        isLoading.value = false;
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const exportToCSV = () => {
      if (!response.value || !response.value.required_tests) return;

      const csv = Papa.unparse(response.value.required_tests);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'required_tests.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    };

    const recaptcha = async () => {
      console.log("recaptcha clicked");
      const token = await executeRecaptcha("login");
      console.log("recaptcha token", token);
      return token;
    };

    return {
      isLoading,
      selectedFile,
      selectedFileURL,
      submitForm,
      handleFileUpload,
      recaptcha,
      response,
      showModal,
      closeModal,
      exportToCSV,
    };
  }
};
</script>

<style scoped>

.lds-ring {
  /* change color here */
  color: #ffffff
}

.lds-ring,
.lds-ring div {
  box-sizing: border-box;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid currentColor;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: currentColor transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}



.loader {
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Styles for the modal */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal content */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* Close button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
