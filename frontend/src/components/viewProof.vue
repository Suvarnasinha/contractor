<template>
  <div class="proof-container">
    <h2>Proof Data for Your Properties</h2>
    <v-list>
      <v-list-item v-for="proof in proofs" :key="proof.proofworkid" class="proof-list-item">
        <v-list-item-content>
          <v-list-item-title>{{ proof.property_name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="viewProofDetails(proof.propertyid)" color="primary">View Details</v-btn>
        </v-list-item-action>
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
