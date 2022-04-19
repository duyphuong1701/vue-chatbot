  <template>
  <div>
    <h1>Nhập câu hỏi</h1>

    <v-container fluid max-width style="min-width: 500px; width: 80vw">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="100"
          :rules="nameRules"
          label="Tên người soạn"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Địa chỉ mail"
          required
        ></v-text-field>

        <v-textarea
          name="input-7-1"
          v-model="question_content"
          background-color="white"
          color="black"
          filled
          label="Câu hỏi"
          auto-grow
          placeholder="Nhập nội dung câu hỏi"
        ></v-textarea>

        <v-btn color="error" class="mr-4" @click="reset"> Xóa tất cả</v-btn>

        <v-btn color="primary" @click="sendQuestion"> Gửi </v-btn>
      </v-form>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "QuestionPage",
  components: {},
  data: () => ({
    name: "",
    valid: true,
    question_content: "",
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
  }),

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    postCategory() {
      try {
        this.$axios.post(
          `http://localhost:8089/wave-sample/api/question-answer`,
          {
            question: this.question_content,
            asker: this.name,
            asker_email: this.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
    sendQuestion() {
      this.postCategory();
      this.reset();
    },
  },
};
</script>
<style>
.theme--light.v-data-table tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.03);
}
.theme--dark.v-data-table tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>