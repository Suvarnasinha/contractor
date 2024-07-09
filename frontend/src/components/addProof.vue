<!-- AddProof.vue -->
<template>
  <div>
    <h2>Add Proof for Property: {{ propertyId }}</h2>
    <v-form>
      <div v-for="(proof, index) in proofs" :key="index">
        <v-textarea
          v-model="proof.description"
          label="Description"
          required
        ></v-textarea>
        <v-file-input
          v-model="proof.images"
          label="Upload Images"
          multiple
          required
          accept="image/*"
        ></v-file-input>
      </div>
      <v-btn color="primary" @click="addProof">Add More Proof</v-btn>
      <v-btn color="success" @click="submitProof">Submit Proof</v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const propertyId = route.params.propertyId;
const proofs = ref([
  { description: '', images: [] },
]);

const addProof = () => {
  proofs.value.push({ description: '', images: [] });
};

const submitProof = async () => {
  const formData = new FormData();
  formData.append('propertyid', propertyId);

  proofs.value.forEach((proof, index) => {
    formData.append(`descriptions[${index}]`, proof.description);
    proof.images.forEach((image) => {
      formData.append(`images`, image);
    });

    console.log("FormData contents:", Array.from(formData.entries()));

  });


  
  try {
    console.log("object");
    const response = await fetch('http://localhost:3000/addProof', {
      method: 'POST',
      credentials: "include",
      body: formData,
    });
    console.log("obccccject");

    if (!response.ok) {
      throw new Error('Failed to submit proof data');
    }

    // Handle successful submission (e.g., redirect or show success message)
  } catch (error) {
    console.error('Error submitting proof data:', error);
  }
};
</script>
  