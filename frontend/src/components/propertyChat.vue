<template>
  <div class="chat-container">
    <button @click="back" class="back-button">Back</button>
    <div v-if="messages.length === 0">
      No messages sent yet.
    </div>
    <h1 v-else class="chat-header">Chat with {{ name }}</h1>
    <div class="chat-messages">
      <div
        v-for="message in messages"
        :key="message.message_id"
        :class="messageClass(message)"
      >
        <div class="message-text">{{ message.message }}</div>
      </div>
    </div>
    <div class="chat-input">
      <textarea
        v-model="newMessage"
        placeholder="Type your message..."
        class="input-textarea"
      ></textarea>
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { io } from "socket.io-client";
import { router } from "@/router";

const route = useRoute();
const propertyid = route.params.propertyid;
const ownerid = route.params.contractorid;
const name = route.params.name;
const owneridData = route.params.owneridData;

const owner = ref({});
const messages = ref([]);
const newMessage = ref("");
const socket = io("http://localhost:3000");

onMounted(() => {
  // Fetch initial data when component is mounted
  fetchOwnerData();
  fetchMessages();

  // Socket.io listener for receiving messages
  socket.on("receiveMessage", (message) => {
    messages.value.push(message);
  });
});

const fetchOwnerData = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/contractChat/${propertyid}`,
      {
        credentials: "include",
        method: "POST",
      }
    );
    owner.value = await response.json();
  } catch (error) {
    console.error("Error fetching property owner:", error);
  }
};

const fetchMessages = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/chat/show/${propertyid}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiver_id: ownerid }),
      }
    );
    messages.value = await response.json();
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

const sendMessage = async () => {
  const message = {
    receiver_id: ownerid,
    senderid: owneridData,
    message: newMessage.value,
    propertyid: propertyid,
  };
  socket.emit("sendMessage", message);

  try {
    await fetch("http://localhost:3000/chat/message", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    newMessage.value = ""; // Clear the input field after sending message
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const messageClass = (message) => {
  return message.senderid == owneridData
    ? "message-sender"
    : "message-receiver";
};

const back = () => {
  router.push({ name: "PropertyChatPeople" });
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
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 16px;
}

.message-sender {
  align-self: flex-end;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  max-width: 70%;
}

.message-receiver {
  align-self: flex-start;
  background-color: #0d3054;
  color: white;
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
  background-color: #3b81fb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.back-button {
  background-color: #3b81fb;
  color: white;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-right: 1450px;
}

.send-button:hover {
  background-color: #3f6ea1;
}
</style>
