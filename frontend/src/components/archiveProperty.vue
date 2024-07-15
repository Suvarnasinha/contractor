<template>
  <div class="archive-container">
  
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
     
          <v-card-title class="text-center">Archived Properties</v-card-title>
          </v-col></v-row>
    


    <v-list>
      <v-list-item v-for="property in archivedProperties" :key="property.propertyid" class="archive-list-item">
        <v-list-item-content>
          <v-list-item-title>Property Name:  {{ property.property_name }}</v-list-item-title>
          <v-list-item-title>Property Name:  {{ property.propertyid }}</v-list-item-title>
          <v-list-item-title>Contractor Name:  {{ property.contractor_name }}</v-list-item-title>
          <v-list-item-title>Contractor-Email:  {{ property.contractor_email }}</v-list-item-title>
          <v-list-item-title>Estimate:{{ property.estimate }}</v-list-item-title>
        </v-list-item-content>
      <v-card-actions>
          <v-btn @click="viewProof(property.propertyid)" color="primary">View Proof</v-btn>
          <v-btn color="secondary" @click="status(property.propertyid)">Show Status</v-btn>
          <v-btn color="info" @click="showWork(property.propertyid)">Show All Work</v-btn>
        </v-card-actions>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const archivedProperties = ref([]);

const fetchArchivedProperties = async () => {
  try {
    const response = await fetch('http://localhost:3000/getArchivedProperties',{
      credentials:'include'
    });
    archivedProperties.value = await response.json();
    console.log("object",archivedProperties.value);
  } catch (error) {
    console.error('Error fetching archived properties:', error);
  }
};

const viewProof = (propertyId) => {
  router.push(`/proof/comment/${propertyId}`);
};

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

onMounted(fetchArchivedProperties);
</script>

<style scoped>
.archive-container {
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
}

.archive-list-item {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  margin-bottom: 10px;
  transition: box-shadow 0.3s ease-in-out;
}

.archive-list-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-list-item-title {
  color: #555;
  font-weight: bold;
}

.v-btn {
  color: #ffffff;
}
</style>
