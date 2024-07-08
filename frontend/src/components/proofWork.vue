<!-- PropertiesWithAcceptedEstimates.vue -->
<template>
  <div>
    <h2>Properties with Accepted Estimates</h2>
    <ul>
      <li v-for="property in properties" :key="property.propertyid">
        <h3>{{ property.property_name }}</h3>
        <p><strong>Address:</strong> {{ property.property_address }}</p>
        <p><strong>Description:</strong> {{ property.property_description }}</p>
        <v-btn @click="navigateToAddProof(property.propertyid)">Add Proof</v-btn>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const properties = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/proofData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    properties.value = data;
  } catch (error) {
    console.error('Error fetching proof data:', error);
  }
});

const navigateToAddProof = (propertyId) => {
  router.push({ name: 'addProof', params: { propertyId } });
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
