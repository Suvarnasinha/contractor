<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card-title class="text-center">Archived Properties with Accepted Estimates</v-card-title>
      </v-col>
    </v-row>
    <v-row class="v-row">
      <v-col v-for="property in properties" :key="property.propertyid" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>{{ property.property_name }}</v-card-title>
          <v-card-text>
            <div>Description: {{ property.property_description }}</div>
            <div>Address: {{ property.property_address }}</div>
            <div>Estimate: {{ property.estimate }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="primary" @click="showComments(property.propertyid)">Show Comments</v-btn>
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
/* Container and Row Styling */
.v-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

/* Card Styling */
.v-card {
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

/* Title and Text Styling */
.v-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.v-card-text {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

/* Button Styling */
.v-btn {
  color: #ffffff;
  border-radius: 24px;
  text-transform: uppercase;
  font-weight: bold;
}

.v-btn.primary {
  background-color: #3f51b5;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .v-card {
    width: calc(100% - 40px);
  }
}
</style>

