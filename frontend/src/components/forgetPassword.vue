<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-center">Forget Password</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Email" v-model="emailData" name="emailData" @blur="v$.emailData.$touch" outlined></v-text-field>
              <span v-if="v$.emailData.$error">Email is required and must be valid</span>
              <v-text-field label="Password" v-model="password" name="password" @blur="v$.password.$touch"
                outlined></v-text-field>
              <span v-if="v$.password.$error">Password is required and must have atleast 2 character</span><br>
              <v-btn color="primary" @click="getdata">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength,email } from '@vuelidate/validators'
import { useStore } from "vuex";

const store = useStore()

const emailData = ref("");
const password = ref("");


const rules = {
  emailData: { required,email },
  password: { required, minLength: minLength(2) },
}

const v$ = useVuelidate(rules, { emailData,password });

const getdata = async () => {

  const validateData=await v$.value.$validate()
  if(validateData){
    console.log("email:",emailData.value,"password:",password.value)
  await store.dispatch('forgetPassword', { email: emailData.value, password: password.value });
  }
}
</script>
<style scoped>
span {
  color:red
}
</style>