<template>
  <div class="contractors-container">
    <h1>Contractors for Property: {{ propertyid }}</h1>
    <div v-if="contractors.length === 0">No contractors have sent messages yet.</div>
    <div v-else class="contractors-list">
      <div v-for="contractor in contractors" :key="contractor.contractorid" class="contractor-item">
        <span>{{ contractor.name }}(contractor)</span>
        <!-- <span>{{contractor.contractorid}}</span> -->
        <v-btn @click="initiateChat(contractor.contractorid,contractor.name)">Chat</v-btn>
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
console.log("propertytytytytytytytyty",propertyid)
const contractors = ref([]);

onMounted(() => {
  fetchContractors();
});

const fetchContractors = async () => {
  try {
    const response = await fetch(`http://localhost:3000/chat/property/${propertyid}`);
    contractors.value = await response.json();
    console.log("object",contractors.value);
  } catch (error) {
    console.error('Error fetching contractors:', error);
  }
}; 



const initiateChat = async(contractorid,name) => {
  try{
const response = await fetch(`http://localhost:3000/contractChat/${propertyid}`, {
              method: 'POST',
            });
  const owner= await response.json();
  const owneridData= owner.userid
  const owneridName= owner.name
  console.log("ownerid12",owneridName);
    router.push({ 
      name: 'propertyChat',
     params: { propertyid,owneridData,name,contractorid }
    });
} catch (error) {
    console.error('Error fetching property owner:', error);
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
