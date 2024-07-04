<template>
<v-container>
  <v-row>
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="text-center">Add Property</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Name" name="name" v-model="name" outlined></v-text-field>
            <v-text-field label="Address" name="address" v-model="address"  outlined></v-text-field>
            <v-text-field label="Description" name="description" v-model="description" outlined></v-text-field>
        
            <v-btn color="primary" @click="addProperty">Add Property</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

const router= useRouter();
const store = useStore()
const name = ref("");
const address= ref('')
const description = ref("");
const addProperty=async()=>{
  console.log("add properryty",name.value,address.value,description.value)
   await store.dispatch('addProperty', { name: name.value, address: address.value,description:description.value });
  router.push({name: 'showProperty'})
}

</script>






