<template>
  <div class="proof-container">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
     
          <v-card-title class="text-center">Proof Data</v-card-title>
          </v-col></v-row>
    <v-list>
      <v-list-item v-for="proof in proofs" :key="proof.proofworkid" class="proof-list-item">
        <v-list-item-content>
          <v-list-item-title>Property-Name:  {{ proof.property_name }}</v-list-item-title>
          <v-list-item-title>Contractor-Name:  {{ proof.contractor_name }}</v-list-item-title>
          <v-list-item-title>Contractor-Email:  {{ proof.contractor_email }}</v-list-item-title>
        </v-list-item-content>
        <v-card-actions>
          <v-btn @click="viewProofDetails(proof.propertyid)" color="primary">View Details</v-btn>
        </v-card-actions>
      </v-list-item>
    </v-list>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const proofs = ref([]);
const router = useRouter();

const fetchProofs = async () => {
  try {
    const response = await fetch('http://localhost:3000/getProofDataForOwner',{
      credentials: "include",
    });
    proofs.value = await response.json();
    console.log("proofdata:",proofs.value)
  } catch (error) {
    console.error('Error fetching proofs:', error);
  }
};

const viewProofDetails = (propertyId) => {
  router.push(`/proof/details/${propertyId}`);
};

onMounted(fetchProofs);
</script>

<style scoped>
.proof-container {
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
}

.proof-list-item {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  margin-bottom: 10px;
  transition: box-shadow 0.3s ease-in-out;
}

.proof-list-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-list-item-title {
  color: #555;
  font-weight: bold;
}

.v-btn {
  color: #ffffff;
}
</style>
