<template>
  <div class="success-container">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8">
          <v-card class="mx-auto my-3 success-card">
            <v-card-title class="text-center">
              <v-icon large color="success">mdi-check-circle-outline</v-icon>
              <h1>Payment Successful!</h1>
            </v-card-title>
            <v-card-subtitle class="text-center">
              Thank you for your payment. Your transaction was successful.
            </v-card-subtitle>
            <v-card-text class="text-center">
              <p>Your payment has been processed successfully. If you have any questions or need further assistance, please contact our support team.</p>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="primary" @click="goBack">Go to Dashboard</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router=useRouter();
const goBack=()=>{
  router.push({name:'propertyDashboard'})
}

</script>
<style scoped>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  background-color: #f9f9f9;
}

.v-card-title h1 {
  color: #4caf50;
  font-weight: bold;

}

.v-card-subtitle {
  color: #555;
  font-size: 19px;
}

.v-card-text p {
  color: #777;
  font-size: 16px;
}

.v-btn {
  margin-top: 20px;
}
</style>