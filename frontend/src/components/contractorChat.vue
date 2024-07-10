 <template>
  <div class="chat-container">
    <h1 class="chat-header">Chat with {{ owner.name }}</h1>
    <div class="chat-messages">
      <div v-for="message in messages" :key="message.message_id">
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
  

   const router = useRouter();
  
   const propertyid = router.currentRoute.value.params.propertyid;
   const ownerid = router.currentRoute.value.params.ownerid;
   
   console.log("ownerid",ownerid);
   const owner = ref({});
   const messages = ref([]);
   const newMessage = ref('');
  
   onMounted(() => {
     fetchOwnerData();
     fetchMessages();
   });
  
   const fetchOwnerData = async () => {
     try {
      const response = await fetch(`http://localhost:3000/contractChat/${propertyid}`, {
              method: 'POST',
            });
       owner.value = await response.json();
       console.log("owner name",owner.value);
     } catch (error) {
       console.error('Error fetching property owner:', error);
     }
   };
  
   const fetchMessages = async () => {
     try {
      console.log(propertyid,"=======");
       const response = await fetch(`http://localhost:3000/chat/show/${propertyid}`);
       messages.value = await response.json();
       console.log("teamdatasaseawqertyuiplokijuhygtfrdeswaq",messages.value)
     } catch (error) {
       console.error('Error fetching messages:', error);
     }
   };
  
   const sendMessage = async () => {
     try {
       await fetch('http://localhost:3000/chat/message', {
         method: 'POST',
         credentials:'include',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({receiver_id: ownerid, message: newMessage.value,propertyid:propertyid })
       });
       newMessage.value = '';
       fetchMessages();
     } catch (error) {
       console.error('Error sending message:', error);
     }
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
    border: 1px solid #584444;
    background-color: #eef1f1;
    border-radius: 8px;
  }
  
  .message-sender {
    text-align: right;
    background-color: #e1ffc7;
    margin: 8px 0;
    padding: 8px;
    border-radius: 8px;
    max-width: 70%;
    align-self: flex-end;
  }
  
  .message-receiver {
    text-align: left;
    background-color: #f0f0f0;
    margin: 8px 0;
    padding: 8px;
    border-radius: 8px;
    max-width: 70%;
    align-self: flex-start;
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