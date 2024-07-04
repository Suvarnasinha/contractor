<template>
  <form @submit.prevent="registerUser">
    <label>Name:</label>
    <input type="text" v-model="formData.name" required />

    <label>Email:</label>
    <input type="email" v-model="formData.email" required />

    <label>Phone Number:</label>
    <input type="text" v-model="formData.phonenumber" required />

    <label>Address:</label>
    <input type="text" v-model="formData.address" />

    <label>User Type:</label>
    <select v-model="formData.usertype" required>
      <option value="contractor">Contractor</option>
      <option value="user">User</option>
    </select>

    <label>Password:</label>
    <input type="password" v-model="formData.password" required />

    <button type="submit">Register</button>
    <p v-if="registrationError" class="error">{{ registrationError }}</p>
    <p v-if="registrationMessage" class="success">{{ registrationMessage }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formData = ref({
  name: '',
  email: '',
  phonenumber: '',
  address: '',
  usertype: 'contractor',
  password: '',
});

const registrationMessage = ref('');
const registrationError = ref('');
const router = useRouter();

const registerUser = async () => {
  try {
    const response = await fetch('http://localhost:3000/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

    const data = await response.json();
    if (response.ok) {
      registrationMessage.value = data.message;
      registrationError.value = '';
      // Redirect to login or another page after successful registration
      router.push('/login'); // Example redirection
    } else {
      registrationError.value = data.error || 'Registration failed';
      registrationMessage.value = '';
    }
  } catch (error) {
    console.error('Error registering user:', error);
    registrationError.value = 'Something went wrong. Please try again later.';
    registrationMessage.value = '';
  }
};
</script>

<style>
/* Add your component's styles here */
</style>
