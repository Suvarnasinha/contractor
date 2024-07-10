<template>
  <div class="contractors-container">
    <h1>Contractors for Property: {{ propertyid }}</h1>
    <div v-if="contractors.length === 0">No contractors have sent messages yet.</div>
    <div v-else class="contractors-list">
      <div v-for="contractor in contractors" :key="contractor.contractorid" class="contractor-item">
        <span>{{ contractor.username }}</span>
        <v-btn @click="initiateChat(contractor.contractorid)">Chat</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const propertyid = route.params.propertyid;
const contractors = ref([]);

onMounted(() => {
  fetchContractors();
});

const fetchContractors = async () => {
  try {
    const response = await fetch(`http://localhost:3000/chat/property/${propertyid}`);
    contractors.value = await response.json();
  } catch (error) {
    console.error('Error fetching contractors:', error);
  }
};

const initiateChat = (contractorid) => {
  router.push({
    name: 'PropertyOwnerChatDetail',
    params: { propertyid, contractorid }
  });
};
</script>

<style scoped>
.contractors-container {
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
}

.contractors-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contractor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.contractor-item:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
