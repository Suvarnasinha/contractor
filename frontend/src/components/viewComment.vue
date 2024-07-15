<template>
  <div>
    <h2>Comments for Property ID: {{ propertyId }}</h2>
    <div v-for="(images, description) in groupedProofs" :key="description" class="proof-group">
      <p>{{ description }}</p>
      <div class="image-row">
        <img v-for="(image, index) in images" :key="index" :src="'http://localhost:3000/uploads/'+image" alt="Proof Image" class="proof-image"/>
      </div>
    </div>
    <h3>Comments</h3>
    <v-list>
      <v-list-item v-for="comment in comments" :key="comment.commentid">
        <v-list-item-content>
          <v-list-item-title>{{ comment.comment }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store=useStore();
const route = useRoute();
const propertyId = route.params.propertyId;
const comments = ref([]);
const proofs = computed(() =>{ 
  return store.state.property.description});
console.log("object",proofs.value);
const fetchComments = async () => {
  try {
   console.log(propertyId,"qwertyuiop")
    const response = await fetch(`http://localhost:3000/comments/${propertyId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    comments.value = data;
  } catch (error) {
    console.error('Error fetching comments:', error);

  }
};

const groupedProofs = computed(() => {
  const groups = {};
  proofs.value.forEach(proof => {
    if (!groups[proof.description]) {
      groups[proof.description] = [];
    }
    groups[proof.description].push(proof.image);
  });
  return groups;
});
// console.log("group",groupedProofs);
const getPropertyData =()=>{
  // alert(propertyId.value)
  const propertyid=propertyId;
  // alert(propertyid)
   store.dispatch('getCommentDescription', { propertyId:propertyid });
}

onMounted(fetchComments,getPropertyData()
);
</script>
<style scoped>
h1, h2, h3 {
  color: #185982; /* Light green for headings */
  font-family: 'Roboto', sans-serif;
  margin-bottom: 20px;
}

v-card {
  background-color: #FAFAFA; /* Very light grey for card background */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-radius: 10px;
}

v-card-title {
  font-size: 1.5rem;
  color: #113013; 
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
}

v-card-subtitle, v-card-text {
  font-size: 1rem;
  color: #555; 
  font-family: 'Roboto', sans-serif;
}

v-btn {
  background-color: #364a96; 
  color: white;
  margin: 10px 0;
}

v-btn:hover {
  background-color: #0b0b0b; 
}

.proof-group {
  margin-bottom: 20px;
}

.image-row {
  display: flex;
  flex-wrap: wrap;
}

.proof-image {
  margin: 5px;
  max-height: 150px;
}

v-container {
  padding: 20px;
}

.v-list-item-title {
  font-size: 1rem;
  color: #50659d; 
  font-family: 'Roboto', sans-serif;
}

v-textarea {
  margin-top: 20px;
}

.v-form {
  margin-top: 20px;
}

</style>
