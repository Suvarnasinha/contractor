<!-- <template>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const proofworkId = route.params.proofworkId;

const proofs = ref([]);
const comments = ref([]);

const fetchProofDetails = async () => {
  try {
    const response = await fetch(`/api/proof/details/${proofworkId}`);
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

onMounted(() => {
  fetchProofDetails();
  fetchComments();
});
</script> -->



<!-- Comments.vue -->
<template>
  <div>
    <h2>Comments for Property ID: {{ propertyId }}</h2>
    <v-card v-for="comment in comments" :key="comment.commentid">
      <v-card-text>{{ comment.comment }}</v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
// const router = useRouter();
const propertyId = ref(route.params.propertyId);
console.log(propertyId.value);
const comments = ref([]);

const fetchComments = async () => {
  try {
    const response = await fetch(`http://localhost:3000/comments/${propertyId.value}`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    comments.value = data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    // Handle error in fetching comments
  }
};

onMounted(fetchComments);
</script>
