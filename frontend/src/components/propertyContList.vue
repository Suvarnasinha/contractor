<!-- <template>
  <div>
    Properties with Accepted Estimates
    <div v-if="properties.length === 0">No properties available</div>
    <div v-else>
      <v-row>
        <v-col
          v-for="property in properties"
          :key="property.propertyid"    
          cols="12"
          md="4"
          class="d-flex"
        >
          <v-card class="mx-auto property-card">
            <v-card-title>{{ property.property_name }}</v-card-title>
            <v-card-subtitle>{{ property.property_address }}</v-card-subtitle>
            <v-card-text>{{ property.property_description }}</v-card-text>
            <v-card-actions>
            <v-btn color=primary @click="showWork(property.propertyid)"
              >Show All Work</v-btn
            >
            <v-btn color=secondary  @click="goToEstimateForm(property.propertyid)">Submit Estimate</v-btn>
            <v-btn color=info @click="initiateChat(property.propertyid)">Chat</v-btn>
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
  await store.dispatch('fetchContProperties');
};

onMounted(fetchContProperties);

const currentUserId = computed(() => {
  console.log(store.state.userAuth.userid);
return store.state.userAuth.email; 
});
console.log("123");
console.log("currentUserId",currentUserId.value);
console.log("12ds3");



const properties = computed(() =>  {
  console.log("store.state.contractor.property:::",store.state.contractor.property);
  return store.state.contractor.property
});
console.log("object",properties.value);


const showWork = (propertyid) => {
  router.push({
    name: 'showWorkContractor',
    params: { propertyid }
  });
};


const goToEstimateForm = (propertyid) => {
  router.push({
    name: 'estimateForm',
    params: { propertyid }
  });
};


const initiateChat =async (propertyid)=>{
try{
const response = await fetch(`http://localhost:3000/contractChat/${propertyid}`, {
              method: 'POST',
            });
  const owner= await response.json();
  const ownerid= owner.userid
  console.log("ownerid12",ownerid);
    router.push({ 
      name: 'contractorChat',
     params: { propertyid,ownerid }
    });
} catch (error) {
    console.error('Error fetching property owner:', error);
  }
}
</script>
<style scoped>
.property-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.property-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: #ebedf5;
}
</style> -->






<template>
  <div>
    Properties with Accepted Estimates
    <div v-if="properties.length === 0">No properties available</div>
    <div v-else>
      <v-row>
        <v-col
          v-for="property in properties"
          :key="property.propertyid"
          cols="12"
          md="4"
          class="d-flex"
        >
          <v-card class="mx-auto property-card">
            <v-card-title>{{ property.property_name }}</v-card-title>
            <v-card-subtitle>{{ property.property_address }}</v-card-subtitle>
            <v-card-text>{{ property.property_description }}</v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="showWork(property.propertyid)">Show All Work</v-btn>
              <v-btn color="secondary" @click="goToEstimateForm(property.propertyid)">Submit Estimate</v-btn>
              <v-btn color="info" @click="initiateChat(property.propertyid)">Chat</v-btn>
              <v-btn color="success" v-if="property.contractor_status !== null">Status: {{ property.contractor_status }}</v-btn>
              <v-btn color="error" v-else disabled>No Status</v-btn>
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
  await store.dispatch('fetchContProperties'); // Ensure your Vuex action name matches
};

onMounted(fetchContProperties);

const properties = computed(() => store.state.contractor.property);

const showWork = (propertyid) => {
  router.push({
    name: 'showWorkContractor', // Replace with your route name for showing work
    params: { propertyid }
  });
};

const goToEstimateForm = (propertyid) => {
  router.push({
    name: 'estimateForm', // Replace with your route name for estimate form
    params: { propertyid }
  });
};

const initiateChat = async (propertyid) => {
  try {
    const response = await fetch(`http://localhost:3000/contractChat/${propertyid}`, {
      method: 'POST',
    });
    const owner = await response.json();
    const ownerid = owner.userid;
    router.push({ 
      name: 'contractorChat', // Replace with your route name for contractor chat
      params: { propertyid, ownerid }
    });
  } catch (error) {
    console.error('Error fetching property owner:', error);
  }
};
</script>

<style scoped>
.property-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.property-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: #ebedf5;
}
</style>
