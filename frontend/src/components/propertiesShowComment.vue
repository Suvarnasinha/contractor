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
            <div>Address: {{ property.propertyid }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="showComments(property.propertyid)">Show Comments</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();


const properties = computed(() => {
 return store.state.contractor.propertyData
});

const fetchProperties = async () => {
  await store.dispatch('fetchPropertiesComment');
};
console.log("detchproperties",properties.value)
const router = useRouter();

const showComments = (propertyId) => {
  alert(propertyId)
  router.push(`/comments/${propertyId}`);
};

onMounted(fetchProperties);
</script>
