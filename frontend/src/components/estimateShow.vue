<template>
  <div>
    <div v-if="estimates.length === 0">No estimates available</div>
    <div v-else>
      <div v-for="estimate in estimates" :key="estimate.contractorworkid">
        <v-card>
          <v-card-title>Contractor: {{ estimate.contractor_name }}</v-card-title>
          <v-card-subtitle>Estimate: {{ estimate.estimate }}</v-card-subtitle>
          <v-card-text>
            <div>Time: {{ estimate.time }}</div>
            <div>Description: {{ estimate.work_description }}</div>
            <!-- <input type="hidden" name="hello" value="estimate"> -->
          </v-card-text>
          <v-btn @click="acceptEstimate(estimate.contractor_id,estimate.contractorworkid)">Accept</v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { computed,onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const fetchProEstimate = () => {
  const propertyId = router.currentRoute.value.params.propertyid;
  console.log("prprprp",propertyId)
   store.dispatch('fetchEstimate', { propertyId:propertyId });
};

onMounted(fetchProEstimate);
const estimates = computed(() => store.state.property.estimate);
console.log("ererererere",estimates.value)


const acceptEstimate = async (contractor_id,contractorworkid)=> {
  const propertyId = router.currentRoute.value.params.propertyid;
// console.log()
   alert(contractor_id);
   await store.dispatch('updateEstimateStatus', { contractor_id,contractorworkid,status: 'accepted',propertyId });
   fetchProEstimate();
  };

</script>