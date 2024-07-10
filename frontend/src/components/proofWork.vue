<template>
  <div class="property-container">
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
.property-container {
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
}

.property-container h2 {
  margin-bottom: 20px;
}

.property-container ul {
  list-style-type: none;
  padding: 0;
}

.property-container li {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 15px;
}

.property-container h3 {
  font-weight: bold;
  margin-bottom: 10px;
}

.property-container p {
  margin: 5px 0;
}

.property-container v-btn {
  margin-top: 10px;
}
</style>
