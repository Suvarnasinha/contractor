<template>
  <div>
    <h2>Proof Details</h2>
    <div v-for="(images, description) in groupedProofs" :key="description" class="proof-group">
      <p>{{ description }}</p>
      <div class="image-row">
        <img v-for="(image, index) in images" :key="index" :src="image" alt="Proof Image" class="proof-image"/>
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
    <v-form>
      <v-textarea v-model="newComment" label="Add a comment" required></v-textarea>
      <v-btn color="success" @click="submitComment">Submit Comment</v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();
const propertyId = route.params.propertyId;

console.log("add comment propertyID1111111111", propertyId);

const comments = ref([]);
const newComment = ref('');

const fetchProofDetails = () => {
  const propertyId = route.params.propertyId;
  console.log("add comment propertyID222222222222", propertyId);

  store.dispatch('getCommentDescription', { propertyId: propertyId });
};

const proofs = computed(() => store.state.property.description);
console.log("proofdata", proofs.value);

const fetchComments = async () => {
  try {
    const response = await fetch(`http://localhost:3000/comments/${propertyId}`);
    comments.value = await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const submitComment = async () => {
  const commentData = newComment.value;
  alert(propertyId);
  store.dispatch('submitCommentData', { propertyId: propertyId, comment: commentData });
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

onMounted(() => {
  fetchProofDetails();
  fetchComments();
});
</script>

<style scoped>
h1, h2, h3 {
  color: #4CAF50; /* Light green for headings */
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
  color: #2E7D32; /* Darker green for card titles */
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
}

v-card-subtitle, v-card-text {
  font-size: 1rem;
  color: #555; /* Medium grey for subtitles and text */
  font-family: 'Roboto', sans-serif;
}

v-btn {
  background-color: #81C784; /* Light green for buttons */
  color: white;
  margin: 10px 0;
}

v-btn:hover {
  background-color: #66BB6A; /* Slightly darker green on hover */
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
  color: #509d53; /* Light green for list item titles */
  font-family: 'Roboto', sans-serif;
}

v-textarea {
  margin-top: 20px;
}

.v-form {
  margin-top: 20px;
}

</style>
