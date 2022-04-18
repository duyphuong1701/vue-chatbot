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
    categoryIds: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ID", value: "questionAnswerId", width: "5%" },
      {
        text: "Tên SV",
        align: "start",
        value: "asker",
        width: "15%",
      },
      {
        text: "Email sinh viên",
        value: "asker_email",
        width: "10%",
      },
      { text: "Câu hỏi", value: "question", width: "25%" },
      { text: "Trả lời", value: "answer", width: "25%" },
      { text: "Loại", value: "categoryId", width: "10%" },
      { text: "Thao tác", value: "actions", width: "10%" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      questionAnswerId: 0,
      asker: "",
      asker_email: "",
      question: "",
      answer: "",
      categoryId: "",
    },
    defaultItem: {
      questionAnswerId: 0,
      asker: "",
      asker_email: "",
      question: "",
      answer: "",
      categoryId: "",
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
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
    this.getQuestionAnswer();
    this.getCategory();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          questionAnswerId: 1,
          asker: "Nguyễn Duy Phương",
          asker_email: "phuongb1812294@student.ctu.edu.vn",
          question: "test",
          answer: "test",
          categoryId: "Điểm tốt nghiệp-ID_10",
        },
      ];
    },
    getCategory() {
      try {
        this.$axios
          .get(`http://localhost:8089/wave-sample/api/category/`)
          .then((res) => {
            var arr = [];
            res.data.forEach((element) => {
              arr.push(`${element.categoryId}-${element.categoryName}`);
            });
            this.categoryIds = arr;
          });
      } catch (e) {
        console.log(e);
      }
    },
    getQuestionAnswer() {
      try {
        this.$axios
          .get(`http://localhost:8089/wave-sample/api/question-answer`)
          .then((res) => {
            this.desserts = res.data;
          });
      } catch (e) {
        console.log(e);
      }
    },
    deleteQuestionAnswer(item) {
      try {
        this.$axios.delete(
          `http://localhost:8089/wave-sample/api/question-answer/${item.questionAnswerId}`
        );
      } catch (e) {
        console.log(e);
      }
    },
    putQuestionAnswer(item) {
      try {
        console.log(item);
        this.$axios.put(
          `http://localhost:8089/wave-sample/api/question-answer/${item.questionAnswerId}`,
          {
            questionAnswerId: item.questionAnswerId,
            asker: item.asker,
            asker_email: item.asker_email,
            question: item.question,
            answer: item.answer,
            categoryId: item.categoryId,
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
    postQuestionAnswer(item) {
      try {
        console.log(`post item ${item.questionAnswerId}`);
        console.log(item);
        this.$axios.post(
          `http://localhost:8089/wave-sample/api/question-answer/`,
          {
            asker: item.asker,
            asker_email: item.asker_email,
            question: item.question,
            answer: item.answer,
            categoryId: item.categoryId,
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
      this.this.dialogDelete = true;
      console.log(item);
      this.deleteQuestionAnswer(item);
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
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