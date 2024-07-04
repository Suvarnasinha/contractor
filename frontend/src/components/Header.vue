<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Shopping Web</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">
        Login
      </v-btn>
      <v-btn text to="/forgetPassword">
        FORGET Password
      </v-btn>
      <v-btn text to="/propertyWork">
        Category
      </v-btn>
      <v-btn text to="/addproperty">
        addproperty
      </v-btn>
      <v-btn text to="">
        User
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script setup>
  </script>