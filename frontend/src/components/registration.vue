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
            <v-form @submit.prevent="register">
              <v-text-field label="Name" v-model="formData.name" name="name" outlined></v-text-field>
              <span v-for="error of v$.name.$errors" :key="error.$uid">{{ error.$message }}</span>

              <v-text-field label="Email" v-model="formData.email" name="email" outlined></v-text-field>
              <span v-for="error of v$.email.$errors" :key="error.$uid">{{ error.$message }}</span>

              <v-text-field v-model="formData.phonenumber" label="Phone Number" outlined @blur="v$.phonenumber.$touch"></v-text-field>
              <span v-for="error of v$.phonenumber.$errors" :key="error.$uid">{{ error.$message }}</span>

              <v-text-field label="Address" v-model="formData.address" name="address" outlined></v-text-field>
              <span v-for="error of v$.address.$errors" :key="error.$uid">{{ error.$message }}</span>

              <v-select v-model="formData.usertype" :items="userTypes" label="User Type" outlined></v-select>
              <span v-for="error of v$.usertype.$errors" :key="error.$uid">{{ error.$message }}</span>

              <v-text-field label="Password" v-model="formData.password" name="password" outlined></v-text-field>
              <span v-for="error of v$.password.$errors" :key="error.$uid">{{ error.$message }}</span>

              <v-btn color="primary" type="submit">Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from '@vuelidate/core';
import { required, email, maxLength, helpers } from '@vuelidate/validators';
import { router } from "@/router";
import { hasNumber } from '../validation';

const store = useStore();

const formData = reactive({
  name: '',
  email: '',
  phonenumber: '',
  address: '',
  usertype: '', // Will hold '0' for Property and '1' for Contractor
  password: '',
});

const userTypes = ['Property', 'Contractor']; // Display options for UserType

const rules = {
  name: { required: helpers.withMessage('Name cannot be empty', required) },
  email: { required: helpers.withMessage('Email cannot be empty', required), email: helpers.withMessage('Invalid email format', email) },
  phonenumber: { required: helpers.withMessage('Phone Number cannot be empty', required), hasNumber: helpers.withMessage('Phone Number must contain only digits', hasNumber), maxLength: maxLength(10) },
  address: { required: helpers.withMessage('Address cannot be empty', required) },
  usertype: { required: helpers.withMessage('User Type cannot be empty', required) },
  password: { required: helpers.withMessage('Password cannot be empty', required) },
};

const v$ = useVuelidate(rules, formData);

const register = async () => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    try {
      const userTypeValue = formData.usertype === 'Property' ? 0 : 1;

      await store.dispatch('register', {
        name: formData.name,
        email: formData.email,
        phonenumber: formData.phonenumber,
        address: formData.address,
        usertype: userTypeValue,
        password: formData.password,
      });
      router.push({ name: 'Login' });
    } catch (error) {
      console.error('Registration error:', error);
    }
  }
};
</script>

<style scoped>
span {
  color: red;
}
</style>
