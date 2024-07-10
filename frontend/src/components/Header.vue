<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>ProCon</v-toolbar-title>
      <v-spacer></v-spacer>

     
      <v-btn v-if="role == 0" text to="/propertyDashboard">
        propertyDashboard
      </v-btn>
    
      <v-btn v-if="role == 1" text to="/propertylist">
        propertylist
      </v-btn>
      <v-btn v-if="role == 0" text to="/addproperty">
        addproperty
      </v-btn>
      <v-btn v-if="role == 0" text to="/propertyShowEstimate">
        propertyShowEstimate
      </v-btn>
      <v-btn v-if="role == 1" text to="/proofWork">
        proof form generate
      </v-btn>
      <v-btn v-if="role == 0" text to="/viewProof">
        viewProof
      </v-btn>
      <v-btn v-if="role == 1" text to="/propertiesShowComment">
        propertiesShowComment
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store= useStore();
const role = computed(() => {
  return store.state.userAuth.role;
});
onMounted(()=>{
  console.log("suvarna srayshi sinha",role.value);

})
</script>