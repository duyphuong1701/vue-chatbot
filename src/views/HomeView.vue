<template>
  <div>
    <h1>ChatBot Page</h1>
    <chat-bot msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import ChatBot from "@/components/ChatBot.vue";
export default {
  name: "HomeView",
  components: {
    ChatBot,
  },
};
</script>
