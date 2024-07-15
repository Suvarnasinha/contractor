<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="property-card">
          <v-card-title class="text-center">Add Property</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Name" name="name" v-model="name" outlined></v-text-field>
              <v-text-field label="Address" name="address" v-model="address" outlined></v-text-field>
              <v-text-field label="Description" name="description" v-model="description" outlined></v-text-field>
              <v-card-actions>
              <v-btn color="primary" @click="addProperty">Add Property</v-btn>
            </v-card-actions>
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

const store = useStore();
const router = useRouter();

const name = ref("");
const address = ref("");
const description = ref("");

const addProperty = async () => {
  try {
    await store.dispatch('addProperty', { name: name.value, address: address.value, description: description.value });
    router.push({ name: 'showProperty' });
  } catch (error) {
    console.error('Error adding property:', error);
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
}

.v-card-title {
  color: #333;
}

.v-btn {
  margin-top: 16px;
}
</style>
