<template>
  <div class="status-container">
    <h2>Property Status</h2>
    <!-- <div v-if="propertyState" > -->
      <div v-for="state in propertyState" :key="state" class="status-box">

      <p><strong>Status:</strong> {{ state.state }}</p>
    </div>
    <v-btn color="primary" @click="goBack">Back</v-btn>
  </div>
</template>

<script setup>

import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const route = useRoute();

const propertyState = computed(() => store.state.property.status);

const fetchPropertyState = async () => {
  const propertyId = route.params.propertyid;
  console.log("propertyyyy",propertyId)
  await store.dispatch('propertyStatus',propertyId)
  
};

const goBack = () => {
  router.push({ name: 'propertyDashboard' }); 
};

onMounted(fetchPropertyState);
</script>

<style scoped>
.status-container {
  padding: 20px;
}

.status-box {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-box p {
  margin: 0;
}

.v-btn {
  margin-top: 10px;
}
</style>
