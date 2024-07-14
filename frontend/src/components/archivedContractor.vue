<!-- ArchivedProperties.vue -->
<template>
  <div>
    <h2>Archived Properties with Accepted Estimates</h2>
    <v-row>
      <v-col v-for="property in properties" :key="property.propertyid" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>{{ property.property_name }}</v-card-title>
          <v-card-text>
            <div>Description: {{ property.property_description }}</div>
            <div>Address: {{ property.property_address }}</div>
            <div>Estimate: {{ property.estimate }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="showComments(property.propertyid)">Show Comments</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const properties = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/getArchivedContractor', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    properties.value = data;
  } catch (error) {
    console.error('Error fetching archived properties:', error);
  }
});

const showComments = (propertyId) => {
  router.push(`/comments/${propertyId}`);
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
