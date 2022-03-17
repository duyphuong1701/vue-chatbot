<template>
  <section class="chat-box">
    <div class="chat-box-list-container" ref="chatbox">
      <ul class="chat-box-list">
        <li
          class="message"
          v-for="(message, idx) in messages"
          :key="idx"
          :class="message.author"
        >
          <p>
            {{ message.text }}
          </p>
        </li>
      </ul>
    </div>
    <div class="chat-inputs">
      <input
        type="text"
        spellcheck="false"
        v-model="message"
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "ChatBox",
  data: () => ({
    message: "",
    messages: [],
  }),
  methods: {
    sendMessage() {
      const message = this.message;
      this.messages.push({
        text: message,
        author: "client",
      });
      this.message = "";
      this.$axios
        .get(`http://192.168.1.2:8081/query?question=${message}`)
        .then((res) => {
          console.log(res);
          this.messages.push({
            text: res.data.answer,
            author: "server",
          });
          this.$nextTick(() => {
            this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight;
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.chat-box,
.chat-box-list {
  height: 70vh;
  display: flex;
  flex-direction: column;
  list-style-type: none;
}
.chat-box-list-container {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
  margin-bottom: 1px;
}

.chat-box-list-container::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
.chat-box-list {
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  li {
    margin-top: 10px;
  }
  p {
    padding: 10px;
  }
  .server {
    p {
      margin-left: 10vh;
      background: #99cc00;
      float: right;
    }
  }
  .client {
    p {
      margin-right: 10vh;
      background: #0070c8;
      float: left;
    }
  }
}
.chat-box {
  margin: 10px;
  border: none;
  width: 70vw;
  height: 70vh;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  align-items: space-between;
  justify-content: space-between;
}
.chat-inputs {
  display: flex;

  input {
    line-height: 3;
    width: 100%;
    border: 1px solid rgb(233, 231, 231);
    border-left: none;
    border-bottom: none;
    border-right: none;
    border-bottom-left-radius: 4px;
    padding-left: 15px;
  }
  button {
    width: 145px;
    color: white;
    background: #0070c8;
    border-color: #999;
    border-bottom: none;
    border-right: none;
    border-bottom-right-radius: 3px;
  }
}
</style>