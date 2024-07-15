<template>
  <v-app>
    <v-app-bar app color="light-green" dark>
      <v-toolbar-title>ProCon</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="role == 0" text to="/propertyDashboard">
        Property Dashboard
      </v-btn>

      <v-btn v-if="role == 1" text to="/propertylist"> Property List </v-btn>
      <v-btn v-if="role == 0" text to="/addproperty"> Add Property </v-btn>
      <v-btn v-if="role == 0" text to="/showproperty"> Add Work </v-btn>
      <v-btn v-if="role == 0" text to="/propertyShowEstimate">
        Property Show Estimate
      </v-btn>
      <v-btn v-if="role == 1" text to="/proofWork"> Proof Form Generate </v-btn>
      <v-btn v-if="role == 0" text to="/viewProof"> View Proof </v-btn>
      <v-btn v-if="role == 1" text to="/propertiesShowComment">
        Comments
      </v-btn>
      <v-btn v-if="role == 0" text to="/archiveProperty">
        Archive Property
      </v-btn>
      <v-btn v-if="role == 1" text to="/paymentDetails"> Payment Details </v-btn>
      <v-btn v-if="role == 1" text to="/archivedContractor">
        Archived Contractor
      </v-btn>
      <v-btn @click="logout"> Logout </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const role = computed(() => {
  return store.state.userAuth.role;
});

const logout = () => {
  localStorage.clear();
  location.reload();
};
</script>

<style scoped>
/* General Styling */
.v-toolbar-title {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #333; /* Dark text color */
}

.v-btn {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-transform: capitalize; /* Ensure button text is capitalized */
  color: #333; /* Text color */
  margin-left: 10px;
}

.v-btn:hover {
  background-color: #f0f0f0; /* Hover background color */
  color: #555; /* Hover text color */
}

/* App Bar Background and Shadow */
.v-app-bar {
  background-color: #fff; /* White background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow */
}

</style>
