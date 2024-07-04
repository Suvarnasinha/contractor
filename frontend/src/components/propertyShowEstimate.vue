<template>
  <div>
    <h1>Properties</h1>
    <div v-if="properties.length === 0">No properties available</div>
    <div v-else>
      <div v-for="property in properties" :key="property.propertyid">
        <v-card>
          <v-card-title>{{ property.name }}</v-card-title>
          <v-card-subtitle>{{ property.address }}</v-card-subtitle>
          <v-card-text>{{ property.description }}</v-card-text>
          <v-btn @click="showEstimates(property.propertyid)">Show Estimates</v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const properties = ref([]);

const fetchProperties = async () => {
  await store.dispatch('fetchProperties');
};

onMounted(fetchProperties);

const properties = computed(() => store.state.properties);

const showEstimates = (propertyId) => {
  router.push({
    name: 'Estimates',
    params: { propertyId }
  });
};

</script>
