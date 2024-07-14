<template>
  <h2>Add Work</h2>
  <v-btn @click="addWork">Add work</v-btn>
  <v-form>
    <v-row v-for="(work, index) in workData" :key="index">
      <v-col cols="12" md="4">
        <v-textarea v-model="work.description" label="Description" required></v-textarea>
      </v-col>
      <v-col cols="12" md="4">
        <!-- Upload 5 images Not less than that and not more than that -->
        <v-file-input
  v-model="work.images"
  label="Upload Image"
  multiple
  required
  accept="image/*"
  @change="handleFileUpload(index, $event)"
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
const router = useRoute();
const propertyId = router.params.propertyId;
const workData = ref([]);

const addWork = () => {
  workData.value.push({
    description: '',
    images: [],
  });
};



const handleFileUpload = (index, event) => {
  const selectedFiles = event.target.files;
  workData.value[index].images = Array.from(selectedFiles);
};


const submitWork = async () => {
  const formData = new FormData();

  workData.value.forEach((work, index) => {
    formData.append(`descriptions[${index}]`, work.description);
    work.images.forEach((image) => {
      formData.append(`images`, image);
    });
  });

  console.log("FormData contents:", Array.from(formData.entries()));

  // Dispatch action to Vuex store to handle API call
  await store.dispatch('propertywork', { formData, propertyId });
};
</script>
