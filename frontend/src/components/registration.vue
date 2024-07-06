<template>
  <!-- name,email,phonenumber,address,usertype,password -->
  <h2>Registration </h2>
  {{ formData }}
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-center">Registration</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Name" v-model="formData.name" name="name" outlined></v-text-field>
              <v-text-field label="Email" v-model="formData.email"  name="emailData" outlined></v-text-field>
              <v-text-field label="phoneNumber" v-model="formData.phonenumber" name="phoneNumber" outlined></v-text-field>
              <v-text-field label="address" v-model="formData.address"  name="address" outlined></v-text-field>
              <v-select  :items="['Property', 'Contractor']" variant="solo-inverted" v-model="formData.usertype" required>
                <option value="contractor">Contractor</option>
                <option value="user">User</option>
              </v-select>
              <!-- <span v-if="v$.emailData.$error">Email is required and must be valid</span> -->
              <v-text-field label="Password" v-model="formData.password" name="password" outlined></v-text-field>
              <!-- <span v-if="v$.password.$error">Password is required and must have atleast 2 character</span><br> -->
              <v-btn color="primary" @click="register">Login</v-btn>

            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from '@vuelidate/core'
import { required, email,  maxLength, helpers } from '@vuelidate/validators'
import { router } from "@/router";


const store = useStore()
const formData = reactive({
  name: '',
  email: '',
  phonenumber: '',
  address: '',
  usertype: '',
  password: '',
});

const rules = computed(() => {
  return {
    name: { required: helpers.withMessage('This field cannot be empty', required),},
    email: { required: helpers.withMessage('This field cannot be empty', required), email:helpers.withMessage('It is not in the proper Format',email) },
    phonenumber: { required: helpers.withMessage('This field cannot be empty', required), maxLength: maxLength(10) },
    // hasNumber:helpers.withMessage("number is mandatory",hasNumber),
    address: { required: helpers.withMessage('This field cannot be empty', required), },
    usertype: { required: helpers.withMessage('This field cannot be empty', required), },
    password: { required: helpers.withMessage('This field cannot be empty', required), },
  }
})

const v$ = useVuelidate(rules, formData)

const register=async()=>{
  const validateData=await v$.value.$validate()
  if(validateData){
  console.log("formdata",formData.name)
  await store.dispatch('register', { name:formData.name,email:formData.email,phonenumber:formData.phonenumber,address:formData.address,usertype:formData.usertype,password:formData.password });
  router.push({name:'Login'});
  }
}
</script>