<template>
  <div class="property-container">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="6">
     
          <v-card-title class="text-center">Properties with Accepted Estimates</v-card-title>
          </v-col></v-row>
    <ul class="proofwork-card">
      <li v-for="property in properties" :key="property.propertyid">
        <h3>{{ property.property_name }}</h3>
        <p><strong>Address:</strong> {{ property.property_address }}</p>
        <p><strong>Description:</strong> {{ property.property_description }}</p>
      <v-card-actions>
        <v-btn color=primary @click="navigateToAddProof(property.propertyid)">Add Proof</v-btn>
     </v-card-actions>
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
    console.log("properties value for the roof dara",properties.value);
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

.proofwork-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

}
</style>
