<template>
  <h2>Add Work</h2>
  <v-btn @click="addWork">Add Work</v-btn>
  <v-form>
    <v-row v-for="(work, index) in workData" :key="index">
      <v-col cols="12" md="4">
        <v-textarea
          v-model="work.description"
          label="Description"
          required
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="4">
        <v-file-input
          v-model="work.image"
          label="Upload Image"
          required
          accept="image/*"
        ></v-file-input>
      </v-col>
    </v-row>
  </v-form>
  <v-btn color="success" @click="submitWork">Submit</v-btn>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const property = route.params.propertyId;

const workData = ref([
  {
    description: '',
    image: null,
  },
]);

const addWork = () => {
  workData.value.push({
    description: '',
    image: null,
  });
};

const submitWork = async () => {
  const formData = new FormData();
  workData.value.forEach((work) => {
    formData.append(`description`, work.description);
    formData.append(`image`, work.image);
  });
console.log(formData)
  await store.dispatch('propertywork', { formData, property });
};
</script>
