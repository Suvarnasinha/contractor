<template>
  <div>
    <h2>Proof Details</h2>
    <div v-for="proof in proofs" :key="proof.proofworkid">
      <p>{{ proof.proof_description }}</p>
      <div v-for="image in proof.images" :key="image.imageid">
        <img :src="image.image_url" alt="Proof Image" />
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const propertyId = route.params.propertyId;
const proofworkId = route.params.proofworkId;

const proofs = ref([]);
const comments = ref([]);
const newComment = ref('');

const fetchProofDetails = async () => {
  try {
    const response = await fetch(`/api/proof/details/${propertyId}/${proofworkId}`);
    proofs.value = await response.json();
  } catch (error) {
    console.error('Error fetching proof details:', error);
  }
};

const fetchComments = async () => {
  try {
    const response = await fetch(`/api/proof/comments/${proofworkId}`);
    comments.value = await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const submitComment = async () => {
  try {
    const response = await fetch('/api/proof/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ proofworkid: proofworkId, comment: newComment.value }),
    });

    if (response.ok) {
      newComment.value = '';
      fetchComments();
    } else {
      throw new Error('Failed to submit comment');
    }
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
};

onMounted(() => {
  fetchProofDetails();
  fetchComments();
});
</script>
