<!-- <template>
  <div class="chat-container">
    <h1 class="chat-header">Chat with {{ owner.name }}</h1>
    <div class="chat-messages">
      <div v-for="message in messages" :key="message.message_id" :class="messageClass(message)">
        <div class="message-text">{{ message.message }}</div>
      </div>
    </div>
    <div class="chat-input">
      <textarea v-model="newMessage" placeholder="Type your message..." class="input-textarea"></textarea>
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const propertyid = router.currentRoute.value.params.propertyid;
const ownerid = router.currentRoute.value.params.ownerid;

const owner = ref({});
const messages = ref([]);
const newMessage = ref('');
const currentUserId = ref(null); // Assuming you set this after login or fetch user data

onMounted(() => {
  fetchOwnerData();
  fetchMessages();
  // Example: Fetch currentUserId after login or fetch user data
  currentUserId.value = store.state.user.id; // Example: Adjust according to your Vuex state structure
});

const fetchOwnerData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/contractChat/${propertyid}`, {
      method: 'POST',
    });
    owner.value = await response.json();
    console.log("Owner:", owner.value);
  } catch (error) {
    console.error('Error fetching property owner:', error);
  }
};

const fetchMessages = async () => {
  try {
    const response = await fetch(`http://localhost:3000/chat/show/${propertyid}`);
    messages.value = await response.json();
    console.log("Messages:", messages.value);
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

const sendMessage = async () => {
  try {
    await fetch('http://localhost:3000/chat/message', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        receiver_id: ownerid,
        message: newMessage.value,
        propertyid: propertyid
      })
    });
    newMessage.value = '';
    fetchMessages();
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const messageClass = (message) => ({
  'message-sender': isSender(message),
  'message-receiver': !isSender(message)
});

const isSender = (message) => {
  return message.sender_id === currentUserId.value;
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 16px;
}

.chat-header {
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 16px;
  color: #333;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.message-sender {
  align-self: flex-start;
  background-color: #0d3054;
  color: white;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  max-width: 70%;
}

.message-receiver {
  align-self: flex-end;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  max-width: 70%;
}

.message-text {
  font-size: 1em;
}
  
.chat-input {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 8px;
}

.input-textarea {
  flex: 1;
  resize: none;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
}

.send-button {
  background-color: #0d3054;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #3f6ea1;
}
</style> -->























<template>
  <div class="chat-container">
    <h1 class="chat-header">Chat with {{ contractor.name }}</h1>
    <div class="chat-messages">
      <div v-for="message in messages" :key="message.message_id" :class="messageClass(message)">
        <div class="message-text">{{ message.message }}</div>
      </div>
    </div>
    <div class="chat-input">
      <textarea v-model="newMessage" placeholder="Type your message..." class="input-textarea"></textarea>
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const propertyid = router.currentRoute.value.params.propertyid;
const contractorid = router.currentRoute.value.params.contractorid;

const contractor = ref({});
const messages = ref([]);
const newMessage = ref('');
const currentUserId = ref(null); // Assuming you set this after login or fetch user data

onMounted(() => {
  fetchContractorData();
  fetchMessages();
  // Example: Fetch currentUserId after login or fetch user data
  currentUserId.value = store.state.user.id; // Example: Adjust according to your Vuex state structure
});

const fetchContractorData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/contractor/${contractorid}`);
    contractor.value = await response.json();
    console.log("Contractor:", contractor.value);
  } catch (error) {
    console.error('Error fetching contractor:', error);
  }
};

const fetchMessages = async () => {
  try {
    const response = await fetch(`http://localhost:3000/chat/show/${propertyid}/${contractorid}`);
    messages.value = await response.json();
    console.log("Messages:", messages.value);
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

const sendMessage = async () => {
  try {
    await fetch('http://localhost:3000/chat/message', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        receiver_id: contractorid,
        message: newMessage.value,
        propertyid: propertyid
      })
    });
    newMessage.value = '';
    fetchMessages();
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const messageClass = (message) => ({
  'message-sender': isSender(message),
  'message-receiver': !isSender(message)
});

const isSender = (message) => {
  return message.sender_id === currentUserId.value;
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 16px;
}

.chat-header {
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 16px;
  color: #333;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.message-sender {
  align-self: flex-start;
  background-color: #0d3054;
  color: white;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  max-width: 70%;
}

.message-receiver {
  align-self: flex-end;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  max-width: 70%;
}

.message-text {
  font-size: 1em;
}
  
.chat-input {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 8px;
}

.input-textarea {
  flex: 1;
  resize: none;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
}

.send-button {
  background-color: #0d3054;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #3f6ea1;
}
</style>
