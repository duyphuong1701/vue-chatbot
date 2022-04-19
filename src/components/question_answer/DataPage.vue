<template>
  <div>
    <v-row justify="center">
      <v-col md="10">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Tìm kiếm"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            Tạo mới
          </v-btn>
        </template>
        <v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Dừng </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Lưu </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-data-table :search="search" :headers="headers" :items="desserts">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="50vw">
        <v-card>
          <v-card-title class="text-h5"> Chỉnh sửa </v-card-title>
          <div class="mx-5">
            <v-text-field
              label="ID"
              v-model="editedItem.questionAnswerId"
            ></v-text-field>
            <v-text-field
              label="Người gửi"
              v-model="editedItem.asker"
            ></v-text-field>
            <v-text-field
              label="Mail người gửi"
              v-model="editedItem.asker_email"
            ></v-text-field>
            <v-text-field
              label="Câu hỏi"
              v-model="editedItem.question"
            ></v-text-field>
            <v-text-field
              label="Câu trả lời"
              v-model="editedItem.answer"
            ></v-text-field>
            <v-select
              :items="categoryIds"
              v-model="editedItem.categoryId"
              label="Chủ đề"
            ></v-select>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color=" darken-1" text @click="close"> Hủy </v-btn>
            <v-btn color=" darken-1" text @click="save"> Cập nhật </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    search: "",
    BASE_URL: "http://localhost:8089/wave-sample/api/question-answer",
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
      this.desserts = [];
    },
    getCategory() {
      try {
        this.$axios
          .get(`http://localhost:8089/wave-sample/api/category`)
          .then((res) => {
            var arr = [];
            res.data.forEach((element) => {
              arr.push(element.categoryId);
            });
            this.categoryIds = arr;
          });
      } catch (e) {
        console.log(e);
      }
    },
    getQuestionAnswer() {
      try {
        this.$axios.get(`${this.BASE_URL}`).then((res) => {
          this.desserts = res.data;
        });
      } catch (e) {
        console.log(e);
      }
    },
    deleteQuestionAnswer(item) {
      try {
        this.$axios.delete(`${this.BASE_URL}/${item.questionAnswerId}`);
      } catch (e) {
        console.log(e);
      }
    },
    putQuestionAnswer(item) {
      try {
        console.log(item);
        this.$axios.put(
          `${this.BASE_URL}/${item.questionAnswerId}`,
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
          `${this.BASE_URL}`,
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
      this.desserts.splice(this.editedIndex, 1);
      this.deleteQuestionAnswer(item);
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