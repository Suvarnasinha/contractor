<template>
  <div class="property-container">
    <div v-if="estimates.length === 0">No estimates available</div>
    <div v-else>
      <div v-for="estimate in estimates" :key="estimate.contractorworkid">
        <v-card class="mx-auto property-card">
          <v-card-title>Contractor: {{ estimate.contractor_name }}</v-card-title>
          <v-card-subtitle>Estimate: {{ estimate.estimate }}</v-card-subtitle>
          <v-card-text>
            <div>Time: {{ estimate.time }}</div>
            <input type="hidden" name="hello" value="estimate">
          </v-card-text>
          <v-btn color="primary" @click="acceptEstimate(estimate.contractor_id, estimate.contractorworkid)">Accept</v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const fetchProEstimate = () => {
  const propertyId = router.currentRoute.value.params.propertyid;
  store.dispatch('fetchEstimate', { propertyId });
};

onMounted(fetchProEstimate);

const estimates = computed(() => store.state.property.estimate);

const acceptEstimate = async (contractor_id, contractorworkid) => {
  const propertyId = router.currentRoute.value.params.propertyid;
  await store.dispatch('updateEstimateStatus', { contractor_id, contractorworkid, status: 'accepted', propertyId });
  fetchProEstimate();
};
</script>

<style scoped>
.property-container {
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
}

.property-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  margin-bottom: 20px;
}

.property-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.v-card-title,
.v-card-subtitle,
.v-card-text {
  color: #555;
}

.v-card-title {
  font-weight: bold;
}
.v-btn {
  margin-top: 10px;
}
</style>
