<!-- <template>
  <v-app v-if="LogIn">
  <Header />
  </v-app>
  <v-btn text to="/">
    Registration
  </v-btn>
  <v-btn text to="/login">
    Login
  </v-btn>
  <v-btn text to="/forgetPassword">
    FORGET Password
  </v-btn>
  <router-view></router-view>
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
 -->



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
</script>
