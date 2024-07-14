<template>
  <v-container>
    <h2>Payment Details</h2>
    <v-row v-if="paymentDetails.length === 0">
      <v-col>
        <v-alert type="info">No payment details available.</v-alert>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="(payment, index) in paymentDetails" :key="index" cols="12" md="6">
        <v-card class="mx-auto my-3 payment-card">
          <v-card-title>{{ payment.propertyName }}</v-card-title>
          <v-card-subtitle>Owner: {{ payment.ownerName }}</v-card-subtitle>
          <v-card-subtitle>Amount: ₹{{ payment.amount }}</v-card-subtitle>
          <v-card-subtitle>Status: {{ payment.status ? 'Successful' : 'Pending' }}</v-card-subtitle>
          <v-card-subtitle>Date: {{ new Date(payment.payment_date).toLocaleString() }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const paymentDetails = computed(() => store.state.contractor.paymentDetails);
console.log("payment details",paymentDetails)

const fetchPaymentDetails = () => {
  store.dispatch('fetchPaymentDetails');
};

onMounted(fetchPaymentDetails);
</script>

<style scoped>
.payment-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.payment-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.v-card-title, .v-card-subtitle {
  color: #555;
  font-weight: bold;
}
</style>
