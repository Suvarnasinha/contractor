<template>
  <div>
    <h2>Comments for Property ID: {{ propertyId }}</h2>
    <div v-for="proof in proofs" :key="proof.proofworkid">
      <p>{{ proof.description }}</p>
      <!-- <div v-for="images in proof.image" :key="images"> -->
        <img :src="proof.image" alt="Proof Image" />
      <!-- </div>  -->
      <!-- <div v-for="image in proof.image" :key="image.imageid">
        <img :src=" h" alt="Proof Image" />
      </div> -->
    </div>
    <v-card v-for="comment in comments" :key="comment.commentid">
      <v-card-text>{{ comment.comment }}</v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store=useStore();
const route = useRoute();
const propertyId = ref(route.params.propertyId);
const comments = ref([]);
const proofs = computed(() =>{ 
  return store.state.property.description});
console.log("object",proofs.value);
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

  }
};
const getPropertyData =()=>{
  // alert(propertyId.value)
  const propertyid=propertyId.value;
  // alert(propertyid)
   store.dispatch('getCommentDescription', { propertyId:propertyid });
}

onMounted(fetchComments,getPropertyData()
);
</script>
