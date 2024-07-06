<template>
  <div>
    <h1>Properties</h1>
    <div v-if="properties.length === 0">No properties available</div>
    <div v-else>
      <v-row>
        <v-col v-for="property in properties" :key="property.propertyid" cols="12" md="4" class="d-flex">
          <v-card class="mx-auto">
            <v-card-title>{{ property.name }}</v-card-title>
            <v-card-subtitle>{{ property.address }}</v-card-subtitle>
            <v-container>
              <v-row v-for="work in property.works" :key="work.workid">
                <v-col cols="12">
                  <v-card-text>{{ work.description }}</v-card-text>
                  <!-- Display image if available -->
                  <v-img v-if="work.image" :src="`../backend/uploads/${work.image}`" height="100px" alt="Work Image"></v-img>
                </v-col>
              </v-row>
              <v-btn @click="goToEstimateForm(property.propertyid)">Submit Estimate</v-btn>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const fetchContProperties = async () => {
  await store.dispatch('fetchContProperties');
};

onMounted(fetchContProperties);

const properties = computed(() => store.state.contractor.property);

const goToEstimateForm = (propertyId) => {
  router.push({
    name: 'estimateForm',
    params: { propertyId }
  });
};
</script>
