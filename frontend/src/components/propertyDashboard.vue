<template>
  <div class="property-container">
    <h1>Properties</h1>
    <div v-if="properties.length === 0" class="no-properties">No properties available</div>
    <div v-else>
      <v-row>
        <v-col v-for="property in properties" :key="property.propertyid" cols="12" md="4" class="d-flex">
          <v-card class="mx-auto property-card">
            <v-card-title>{{ property.name }}</v-card-title>
            <v-card-subtitle>{{ property.address }}</v-card-subtitle>
            <v-card-text>{{ property.description }}</v-card-text>
            <v-card-text>{{ property.propertyid }}</v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="showWork(property.propertyid)">Show All Work</v-btn>
              <v-btn color="secondary" @click="status(property.propertyid)">Show Status</v-btn>
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
  await store.dispatch('showProperty');
};

onMounted(fetchContProperties);

const properties = computed(() => store.state.property.showprop);

const showWork = (propertyid) => {
  router.push({
    name: 'showWork',
    params: { propertyid }
  });
};

const status = (propertyid) => {
  router.push({
    name: 'showStatus',
    params: { propertyid }
  });
};
</script>

<style scoped>
.property-container {
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
}

.no-properties {
  text-align: center;
  color: #999;
  font-size: 18px;
}

.property-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
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
  margin: 10px 0;
}
</style>
