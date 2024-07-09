<template>
  <div class="work-container">
    <h1>Work Details for Property</h1>
    <v-container v-if="workDetails.length === 0" class="no-work-details">
      <div>No work details available</div>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col v-for="(work, index) in workDetails" :key="index" cols="12" md="6">
          <v-card class="mx-auto my-3 work-card">
            <v-card-title>{{ work.description }}</v-card-title>
            <v-img
              :src="`/uploads/${work.image}`"
              height="200"
              contain
              class="white--text align-end"
            ></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn color="primary" @click="goBack">Back</v-btn>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const route = useRoute();

const workDetails = computed(() => store.state.property.workDetails);

const fetchWorkDetails = async () => {
  const propertyId = route.params.propertyid;
  await store.dispatch('fetchWorkDetails', propertyId);
};

onMounted(fetchWorkDetails);

const goBack = () => {
  router.push({ name: 'properties' });
};
</script>

<style scoped>
.work-container {
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
}

.no-work-details {
  text-align: center;
  color: #999;
  font-size: 18px;
}

.work-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.work-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.v-card-title {
  color: #555;
  font-weight: bold;
}

.v-btn {
  margin-top: 20px;
}
</style>
