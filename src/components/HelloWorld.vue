<template>
  <v-app id="inspire" height="100vh">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-chip class="ma-2" color="primary" label>
          <v-icon left> mdi-forum </v-icon>CỐ VẤN HỌC TẬP ẢO</v-chip
        >

        <v-btn depressed class="mx-1"> Dữ liệu </v-btn>
        <v-btn depressed> Thông tin </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="10vw">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet  width="70vw" height="70vh" rounded="lg">
              <div>
                <!-- example chat -->
                <ChatBot msg="Welcome to Your Vue.js App" />
              </div>
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ChatBot from "./ChatBot.vue";

export default {
  name: "HelloWorld",
  components: {
    ChatBot,
  },
  data: () => ({
    password: "Password",
    show: false,
    message: "Hey!",
    marker: true,
    iconIndex: 0,
    icons: [
      "mdi-emoticon",
      "mdi-emoticon-cool",
      "mdi-emoticon-dead",
      "mdi-emoticon-excited",
      "mdi-emoticon-happy",
      "mdi-emoticon-neutral",
      "mdi-emoticon-sad",
      "mdi-emoticon-tongue",
    ],
  }),

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },

  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
  },
};
</script>
