<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
     
          <v-card-title class="text-center">Properties</v-card-title>
          </v-col></v-row>
    <div v-if="properties.length === 0">No properties available</div>
    <div v-else>
      <v-row>
        <v-col v-for="property in properties" :key="property.propertyid" cols="12" md="4" class="d-flex">
          <v-card class="mx-auto">
            <v-card-title>{{ property.property_name }}</v-card-title>
            <v-card-subtitle>{{ property.property_address }}</v-card-subtitle>
            <v-card-text>{{ property.property_description }}</v-card-text>
            <v-card-text>{{ property.propertyid }}</v-card-text>
            <v-card-actions>
            <v-btn color="primary" @click="showEstimate(property.propertyid)">Show Estimates</v-btn>
            </v-card-actions>
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
console.log("object");
onMounted(fetchContProperties);

const properties = computed(() => {
 return store.state.property.properties
});

const showEstimate = (propertyid) => {
  router.push({
    name: 'estimateShow',
    params: { propertyid }
  });
};
</script>
