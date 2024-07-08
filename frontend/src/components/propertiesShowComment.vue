<!-- PropertyList.vue -->
<template>
  <div>
    <h2>Properties with Comments</h2>
    <v-row>
      <v-col v-for="property in properties" :key="property.propertyid" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>{{ property.property_name }}</v-card-title>
          <v-card-text>
            <div>Description: {{ property.property_description }}</div>
            <div>Address: {{ property.property_address }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="showComments(property.propertiesid)">Show Comments</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const properties = ref([]);

const fetchProperties = async () => {
  try {
    const response = await fetch('http://localhost:3000/getCommentProperties',{
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    const data = await response.json();
    properties.value = data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    // Handle error in fetching properties
  }
};

const router = useRouter();

const showComments = (propertyId) => {
  router.push(`/comments/${propertyId}`);
};

fetchProperties();
</script>
