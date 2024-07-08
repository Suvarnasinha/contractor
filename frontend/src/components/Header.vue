<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>ProCon</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">
        Registration
      </v-btn>
      <v-btn text to="/login">
        Login
      </v-btn>
      <v-btn text to="/forgetPassword">
        FORGET Password
      </v-btn>
      <v-btn text to="/propertylist">
        propertylist
      </v-btn>
      <v-btn text to="/addproperty">
        addproperty
      </v-btn>
      <v-btn text to="/propertyShowEstimate">
        propertyShowEstimate
      </v-btn>
      <v-btn text to="/proofWork">
        proof form generate
      </v-btn>
      <v-btn text to="/viewProof">
        viewProof
      </v-btn>
      <v-btn text to="/propertiesShowComment">
        propertiesShowComment
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script setup>
  </script>