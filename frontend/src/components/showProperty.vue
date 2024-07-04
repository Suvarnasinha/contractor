<template>
  <v-container>
    <h2>Your Properties</h2>
    <v-row>
      <v-col v-for="property in properties" :key="property.id" cols="12" md="4" class="d-flex">
        <v-card class="mx-auto">
          <v-card-title>{{ property.name }}</v-card-title>
               <v-card-subtitle>{{ property.description }}</v-card-subtitle>
               <v-card-subtitle>{{ property.propertyid }}</v-card-subtitle>
          <v-card-actions>
            <v-btn :to="{ name: 'propertyWork', params: { propertyId: property.propertyid  } }">Add Work</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const properties = computed(() =>{
  // console.log("object",store.state.property);
 return store.state.property.property
});
console.log(properties.value);
onMounted(() => {
  store.dispatch('fetchProperties');
});
</script>