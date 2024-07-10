<template>
  <div>
    <h1>Properties</h1>
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
          <v-card class="mx-auto">
            <v-card-title>{{ property.property_name }}</v-card-title>
            <v-card-subtitle>{{ property.property_address }}</v-card-subtitle>
            <v-card-text>{{ property.property_description }}</v-card-text>
            <!-- <v-card-text>{{ property.propertyid }}</v-card-text> -->
            <v-btn color="primary" @click="showWork(property.propertyid)"
              >Show All Work</v-btn
            >
            <v-btn @click="goToEstimateForm(property.propertyid)">Submit Estimate</v-btn>
            <v-btn color="#0b0b0b" @click="initiateChat(property.propertyid)">Chat</v-btn>
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
