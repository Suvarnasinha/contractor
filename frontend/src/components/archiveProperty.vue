<template>
  <div class="archive-container">
    <h2>Archived Properties hello</h2>
    <v-list>
      <v-list-item v-for="property in archivedProperties" :key="property.propertyid" class="archive-list-item">
        <v-list-item-content>
          <v-list-item-title>{{ property.property_name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="viewProof(property.propertyid)" color="primary">View Proof</v-btn>
          <v-btn color="primary" @click="showWork(property.propertyid)">Show All Work</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import { useStore } from 'vuex';

// const store = useStore();
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
  router.push(`/proof/details/${propertyId}`);
};

const showWork = (propertyid) => {
  router.push({
    name: 'showWork',
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
