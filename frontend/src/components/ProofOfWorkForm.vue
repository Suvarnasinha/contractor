<template>
  <div>
    <h2>Submit Proof of Work</h2>
    <form @submit.prevent="submitProofOfWork">
      <label>Description:</label>
      <textarea v-model="proofOfWork.description" required></textarea>

      <label>Upload Images:</label>
      <input type="file" multiple @change="handleFileChange" accept="image/*" required />

      <button type="submit">Submit Proof of Work</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const proofOfWork = ref({
  description: '',
  images: [],
});

const handleFileChange = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    proofOfWork.value.images.push(files[i]);
  }
};

const submitProofOfWork = async () => {
  await store.dispatch('submitProofOfWork');
};
</script>

<style>
/* Add your component's styles here */
</style>
