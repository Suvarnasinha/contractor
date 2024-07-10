<template>
  <v-container>
    <h2>Your Properties</h2>
    <v-row>
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
.v-card-subtitle {
  color: #555;
  font-weight: bold;
}

.v-btn {
  margin-top: 10px;
}
</style>
