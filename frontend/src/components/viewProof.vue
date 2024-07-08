<template>
  <div>
    <h2>Proof Data for Your Properties</h2>
    <v-list>
      <v-list-item v-for="proof in proofs" :key="proof.proofworkid">
        <v-list-item-content>
          <v-list-item-title>{{ proof.property_name }}</v-list-item-title>
          <v-list-item-subtitle>{{ proof.proof_description }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="viewProofDetails(proof.propertyid, proof.proofworkid)">View Details</v-btn>
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
  } catch (error) {
    console.error('Error fetching proofs:', error);
  }
};

const viewProofDetails = (propertyId, proofworkId) => {
  router.push(`/proof/details/${propertyId}/${proofworkId}`);
};

onMounted(fetchProofs);
</script>
