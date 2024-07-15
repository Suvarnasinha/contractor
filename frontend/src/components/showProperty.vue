<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card-title class="text-center">Your Properties</v-card-title>
      </v-col>
    </v-row>
    <v-row class="v-row">
      <v-col v-for="property in properties" :key="property.id" cols="12" md="4" class="d-flex">
        <v-card class="mx-auto property-card">
          <v-card-title>{{ property.name }}</v-card-title>
          <v-card-subtitle>{{ property.description }}</v-card-subtitle>
          <v-card-subtitle>{{ property.propertyid }}</v-card-subtitle>
          <v-card-actions>
            <v-btn :to="{ name: 'propertyWork', params: { propertyId: property.propertyid  } }">Add Work</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const properties = computed(() => {
  return store.state.property.property;
});

onMounted(() => {
  store.dispatch('fetchProperties');
});
</script>

<style scoped>
/* Card Styling */
.property-card {
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  margin-bottom: 15px;
}

.property-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Title and Subtitle Styling */
.v-card-title,
.v-card-subtitle {
  color: #333;
  font-weight: bold;
  margin-bottom: 8px;
}

/* Button Styling */
.v-btn {
  text-transform: uppercase;
  font-weight: bold;
  background-color: #3f51b5;
  color: #ffffff;
}

.v-btn:hover {
  background-color: #303f9f;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .property-card {
    width: calc(100% - 10px);
  }
}
</style>

