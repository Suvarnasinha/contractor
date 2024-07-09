<template>
  <div class="status-container">
    <h2>Property Status</h2>
    <div v-if="propertyState" class="status-box">
      <p><strong>Status:</strong> {{ propertyState.state }}</p>
    </div>
    <v-btn color="primary" @click="goBack">Back</v-btn>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import { useStore } from 'vuex';

// const store = useStore();
const router = useRouter();
const route = useRoute();

const propertyState = ref(null);

const fetchPropertyState = async () => {
  const propertyId = route.params.propertyid;
  try {
    const response = await fetch(`http://localhost:3000/showStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ propertyid: propertyId })
    });
    const data = await response.json();
    propertyState.value = data[0]; // Assuming only one state record per property
  } catch (error) {
    console.error('Error fetching property status:', error);
  }
};

const goBack = () => {
  router.push({ name: 'properties' }); // Adjust route name based on your setup
};

onMounted(fetchPropertyState);
</script>

<style scoped>
.status-container {
  padding: 20px;
}

.status-box {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-box p {
  margin: 0;
}

.v-btn {
  margin-top: 10px;
}
</style>
