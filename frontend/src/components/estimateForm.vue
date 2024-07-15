<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
     
          <v-card-title class="text-center">Submit Estimate</v-card-title>
          </v-col></v-row>
    <v-form @submit.prevent="submitEstimate">
      <v-text-field v-model="estimate" label="Estimate" required></v-text-field>
      <v-text-field v-model="time" label="Time" required></v-text-field>
      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const estimate = ref('');
const time = ref('');

const submitEstimate = async () => {
  const propertyid = router.currentRoute.value.params.propertyid;
  console.log("propertyidhelloworld",propertyid)
  console.log(estimate.value,);
  console.log(time.value);
await store.dispatch('submitEstimateData', { propertyid:propertyid, estimate: estimate.value,time:time.value});
  router.push({ name: 'propertyContList' }); 
}

</script>


