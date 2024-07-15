<template>
  <div class="contractors-container">
    <h1>Contractors for Property: {{ propertyid }}</h1>
    <div v-if="contractors.length === 0">
      No contractors are there yet.
    </div>
    <div v-else class="contractors-list">
      <div
        v-for="contractor in contractors"
        :key="contractor.contractorid"
        class="contractor-item"
      >
        <span>{{ contractor.name }} (contractor)</span>
        <v-btn @click="initiateChat(contractor.contractorid, contractor.name)">Chat</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const propertyid = route.params.propertyid;
console.log("propertyid:", propertyid);
const contractors = ref([]);

onMounted(() => {
  if (propertyid) {
    fetchContractors();
  } else {
    console.error("Property ID is undefined");
  }
});

const fetchContractors = async () => {
  try {
    const response = await fetch(`http://localhost:3000/chat/property/${propertyid}`, {
      credentials: "include",
    });
    contractors.value = await response.json();
    console.log("Contractors fetched:", contractors.value);
  } catch (error) {
    console.error("Error fetching contractors:", error);
  }
};

const initiateChat = async (contractorid, name) => {
  try {
    const response = await fetch(`http://localhost:3000/contractChat/${propertyid}`, {
      method: "POST",
      credentials: "include",
    });
    const owner = await response.json();
    const owneridData = owner.userid;
    const owneridName = owner.name;
    console.log("Owner ID:", owneridData, "Owner Name:", owneridName);
    router.push({
      name: "propertyChat",
      params: { propertyid, owneridData, name, contractorid },
    });
  } catch (error) {
    console.error("Error initiating chat:", error);
  }
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





import { createRouter, createWebHistory } from 'vue-router';
import ContractorsPage from '@/components/ContractorsPage.vue';
import ChatPage from '@/components/ChatPage.vue'; // Adjust the path as necessary

const routes = [
  {
    path: '/chat/:propertyid',
    name: 'Contractors',
    component: ContractorsPage,
    props: true,
  },
  {
    path: '/chat/:propertyid/:owneridData/:name/:contractorid',
    name: 'propertyChat',
    component: ChatPage,
    props: true,
  },
  // Other routes...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
