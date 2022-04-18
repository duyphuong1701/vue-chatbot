<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :header-props="{ sortIcon: null }"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    BASE_URL: "http://localhost:8089/wave-sample/api/question",
    headers: [
      { text: "ID câu hỏi", value: "questionId", width: "10%" },
      { text: "ID Chủ đề", value: "categoryId", width: "10%" },
      {
        text: "Câu hỏi",
        value: "questionContent",
        width: "70%",
      },
      { text: "Thao tác", value: "actions", width: "10%" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      questionId: 0,
      categoryId: "",
      questionContent: "",
    },
    defaultItem: {
      questionId: 0,
      categoryId: "",
      questionContent: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.initialize();
    this.getQuestion();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          questionId: 0,
          categoryId: "1",
          questionContent: "test",
        },
      ];
    },
    getQuestion() {
      try {
        this.$axios.get(this.BASE_URL).then((res) => {
          this.desserts = res.data;
        });
      } catch (e) {
        console.log(e);
      }
    },
    deleteQuestion(item) {
      try {
        this.$axios.delete(`${this.BASE_URL}/${item.questionId}`);
      } catch (e) {
        console.log(e);
      }
    },
    putQuestion(item) {
      try {
        console.log(item);
        this.$axios.put(
          `${this.BASE_URL}/${item.questionId}`,
          {
            questionId: item.questionId,
            categoryId: item.categoryId,
            questionContent: item.questionContent,
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
    postQuestion(item) {
      try {
        this.$axios.post(
          `${this.BASE_URL}`,
          {
            questionId: item.questionId,
            categoryId: item.categoryId,
            questionContent: item.questionContent,
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

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.desserts.splice(this.editedIndex, 1);

      this.deleteQuestion(item);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.putQuestionAnswer(this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
        this.postQuestionAnswer(this.editedItem);
      }
      this.close();
    },
  },
};
</script>