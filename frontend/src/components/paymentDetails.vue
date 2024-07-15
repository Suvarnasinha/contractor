<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="6">
        <v-card-title class="text-center">Payment Details</v-card-title>
      </v-col>
    </v-row>
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
          <v-card-text>Amount: ₹{{ payment.amount }}</v-card-text>
          <v-card-title :class="payment.status ? 'status-success' : 'status-pending'">
            {{ payment.status ? 'Successful' : 'Pending' }}
          </v-card-title>
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

const fetchPaymentDetails = () => {
  store.dispatch('fetchPaymentDetails');
};

onMounted(fetchPaymentDetails);
</script>

<style scoped>
/* Container and Row Styling */
.v-container {
  padding: 20px;
}

.v-row {
  margin-bottom: 20px;
}

/* Payment Card Styling */
.payment-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 15px;
}

.payment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

/* Title and Text Styling */
.v-card-title, .v-card-subtitle {
  color: #333;
  font-weight: bold;
  margin-bottom: 8px;
}

.v-card-text {
  color: #555;
}

/* Status Styling */
.status-success {
  color: #28a745;
}

.status-pending {
  color: #dc3545;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .payment-card {
    padding: 10px;
  }
}
</style>

