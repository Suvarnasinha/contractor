<template>
  <div>
    <!-- <h2>Proof Details here</h2> -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
     
          <v-card-title class="text-center">Proof Details</v-card-title>
          </v-col></v-row>
   
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
    <v-form>

      <v-textarea v-model="newComment" label="Add a comment" required></v-textarea>
      <v-btn color="success" @click="submitComment">Submit Comment</v-btn>
            <v-btn v-if="!isTypingComment" @click="Payment" color="primary">Pay Now</v-btn>

    </v-form>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { loadStripe } from '@stripe/stripe-js';

const route = useRoute();

const store = useStore();
const propertyId = route.params.propertyId;

const comments = ref([]);
const newComment = ref('');

const fetchProofDetails = () => {
  const propertyId = route.params.propertyId;

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

const Payment = async () => {
     try {
const propertyId = route.params.propertyId;

alert("Please wait a few seconds for the payment to begin.")
       const response = await fetch(`http://localhost:3000/checkout`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ propertyId })
       });
  
       const session = await response.json();
       console.log("see the item in payment",session);
       const stripe = await loadStripe('pk_test_51Pbbz2Rudpshb9kyIeSk1OxBhxICkOv8xUzg30jGFpXaqUF29G0TF3c4970MGNxbxAhpafF0onm0HHNSxg2020cu00LZBNC5g6');
       await stripe.redirectToCheckout({ sessionId: session.id });
     } catch (error) {
       console.error('Error initiating payment:', error);
     }
   };
const isTypingComment = computed(() => newComment.value.trim() !== '');
onMounted(() => {
  fetchProofDetails();
  fetchComments();
});
</script>

<style scoped>
h1, h2, h3 {
  color: #185982; 
  font-family: 'Roboto', sans-serif;
  margin-bottom: 20px;
}

v-card {
  background-color: #FAFAFA; 
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
  