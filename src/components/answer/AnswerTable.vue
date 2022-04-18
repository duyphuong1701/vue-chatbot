<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Tìm kiếm"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="desserts"
      item-key="answerId"
      :header-props="{ sortIcon: null }"
    >
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
              label="ID chủ đề"
              v-model="editedItem.answerId"
              disabled
            ></v-text-field>
            <v-text-field
              label="ID chủ đề"
              v-model="editedItem.categoryId"
            ></v-text-field>
            <v-text-field
              label="Câu hỏi"
              v-model="editedItem.answerContent"
            ></v-text-field>
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
    dialog: false,
    BASE_URL: "http://localhost:8089/wave-sample/api/answer",
    headers: [
      {
        text: "ID trả lời",
        value: "answerId",
        width: "10%",
      },
      { text: "ID loại", value: "categoryId", width: "10%" },
      {
        text: "Trả lời",
        value: "answerContent",
        width: "70%",
      },
      { text: "Thao tác", value: "actions", width: "10%" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      answerId: 0,
      categoryId: "",
      answerContent: "",
    },
    defaultItem: {
      answerId: 0,
      categoryId: "",
      answerContent: "",
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
    this.getQuestion();
  },

  methods: {
    initialize() {
      this.desserts = [];
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
        this.$axios.delete(`${this.BASE_URL}/${item.answerId}`);
      } catch (e) {
        console.log(e);
      }
    },
    putQuestion(item) {
      try {
        console.log(item);
        this.$axios.put(
          `${this.BASE_URL}/${item.answerId}`,
          {
            questionId: item.answerId,
            categoryId: item.categoryId,
            questionContent: item.answerContent,
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
            questionId: item.answerId,
            categoryId: item.categoryId,
            questionContent: item.answerContent,
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
        this.putQuestion(this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
        this.postQuestion(this.editedItem);
      }
      this.close();
    },
  },
};
</script>