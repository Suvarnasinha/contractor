<!-- <template>
  <div>
    <h2>Estimates for {{ propertyName }}</h2>
    <div v-if="estimates.length === 0">No estimates available</div>
    <div v-else>
      <div v-for="estimate in estimates" :key="estimate.contractorworkid">
        <v-card>
          <v-card-title>Contractor: {{ estimate.contractor_name }}</v-card-title>
          <v-card-subtitle>Estimate: {{ estimate.estimate }}</v-card-subtitle>
          <v-card-text>Time: {{ estimate.time }}</v-card-text>
          <v-btn @click="acceptEstimate(estimate.contractorworkid)">Accept</v-btn>
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
// const estimates = ref([]);

const fetchEstimates = async () => {
  const propertyId = router.currentRoute.value.params.propertyId;
  await store.dispatch('fetchEstimates', propertyId);
};

onMounted(fetchEstimates);

const estimates = computed(() => store.state.estimates);
const propertyName = computed(() => {
  const propertyId = router.currentRoute.value.params.propertyId;
  const property = store.state.properties.find(prop => prop.propertyid === propertyId);
  return property ? property.name : '';
});

const acceptEstimate = async (contractorworkid) => {
  await store.dispatch('updateEstimateStatus', { contractorworkid, status: 'accepted' });
  fetchEstimates();
};

</script> -->
<template>
  hello
</template>
<script setup>
</script>