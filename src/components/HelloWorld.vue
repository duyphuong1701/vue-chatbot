<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-chip class="ma-2" color="primary" label>
          <v-icon left> mdi-forum </v-icon>CỐ VẤN HỌC TẬP ẢO</v-chip
        >

        <v-btn depressed class="mx-1"> Dữ liệu </v-btn>
        <v-btn depressed> Thông tin </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="300">
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
            <v-sheet min-height="70vh" rounded="lg">
              <!-- example chat -->
              <div class="py-3">
                <v-alert class="mx-3" type="success" width="1000">
                  I'm a success alert.
                </v-alert>

                <v-alert class="mx-3" type="info" width="1000">
                  I'm an info alert.
                </v-alert>
              </div>

              <!--  -->
              <!-- input chat -->
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="message"
                        outlined
                        clearable
                        label="Message"
                        type="text"
                      >
                        <template v-slot:append>
                          <v-fade-transition leave-absolute>
                            <v-progress-circular
                              v-if="loading"
                              size="24"
                              color="info"
                              indeterminate
                            ></v-progress-circular>
                            <img
                              v-else
                              width="24"
                              height="24"
                              src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
                              alt=""
                            />
                          </v-fade-transition>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
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
<script>
export default {
  name: "HelloWorld",

  data: () => ({ value: 1 }),
};
</script>
