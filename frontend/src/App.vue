<template>
  <v-app v-if="LogIn">
  <Header />
  </v-app>
  <v-app v-if="!LogIn">
    <v-app-bar app>
      <v-toolbar-title>ProCon</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/register">
        Registration
      </v-btn>
    
      <v-btn text to="/">
        Login
      </v-btn>
      <v-btn text to="/forgetPassword">
        Forget Password
      </v-btn>
     
    </v-app-bar>
  <router-view />
  </v-app>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Header from './components/Header.vue'
const store=useStore();
const LogIn=computed(()=>{
  return store.state.userAuth.LogIn
})
console.log("lffdskfhkhl",LogIn.value);
onMounted(()=>{
  if(localStorage.getItem("token")){
    store.commit("SET_AUTH",{
      token:localStorage.getItem("token"),
      role:localStorage.getItem("role"),
    })
    console.log("SET_AUTH");
  }
})
</script>



<!-- 
 <template>
  <v-app>
    <Header v-if="isLoggedIn" />
    
    <v-btn text to="/login" v-if="!isLoggedIn">
      Login
    </v-btn>
    <v-btn text to="/forgetPassword" v-if="!isLoggedIn">
      FORGET Password
    </v-btn>
    
    <router-view v-if="isLoggedIn"></router-view>
  </v-app>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Header from './components/Header.vue';

const store = useStore();

const isLoggedIn = computed(() => {
  return store.state.userAuth.LogIn;
});

// Check localStorage for token on mount
if (localStorage.getItem("token")) {
  store.commit("SET_AUTH", {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  });
}
</script> -->
