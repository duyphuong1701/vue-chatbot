<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
    style="width: 80vw"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Danh sách dữ liệu</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Tạo mới
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Chỉnh sửa</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field
                    v-model="editedItem.asker"
                    label="Tên sinh viên"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.asker_email"
                    label="Email sinh viên"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.question"
                    label="Câu hỏi"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.answer"
                    label="Trả lời"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-select
                    :items="type_question"
                    v-model="editedItem.opt_type"
                    label="Chủ đề"
                  ></v-select>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Dừng </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Thêm </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Bạn có muốn xóa?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Dừng</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Xóa</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    type_question: [
      "Điểm tốt nghiệp-ID_10",
      "Trang phục - ID_I.2.2",
      "Điều cần lưu ý của SVDHCT- ID_I.2.3",
      "Học phí - ID_11",
      "Khác",
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Tên sinh viên",
        align: "start",
        sortable: false,
        value: "asker",
        width: "10%",
      },
      {
        text: "Email sinh viên",
        value: "asker_email",
        width: "10%",
      },
      { text: "Câu hỏi", value: "question", width: "30%" },
      { text: "Trả lời", value: "answer", width: "30%" },
      { text: "Loại", value: "opt_type", width: "10%" },
       { text: "Thao tác", value: "actions", sortable: false, width: "10%" }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      asker: "",
      asker_email: "",
      question: "",
      answer: "",
      opt_type: "",
    },
    defaultItem: {
      asker: "",
      asker_email: "",
      question: "",
      answer: "",
      opt_type: "",
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
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          asker: "Nguyễn Duy Phương",
          asker_email: "phuongb1812294@student.ctu.edu.vn",
          question: "test",
          answer: "test",
          opt_type: "Điểm tốt nghiệp-ID_10",
        },
      ];
    },
  getCategory() {
      try {
        this.$axios
          .get(`http://localhost:8089/wave-sample/api/category/`)
          .then((res) => {
            this.type_question = res.data.categoryId;
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
            console.log(res.data);
          });
      } catch (e) {
        console.log(e);
      }
    },
    deleteQuestionAnswer(item) {
      try {
        this.$axios.delete(
          `http://localhost:8089/wave-sample/api/question-answer${item.categoryId}`
        );
      } catch (e) {
        console.log(e);
      }
    },
    putQuestionAnswer(item) {
      try {
        console.log(`update item ${item.categoryId}`);
        console.log(item);
        this.$axios.put(
          `http://localhost:8089/wave-sample/api/question-answer${item.categoryId}`,
          { categoryName: item.categoryName },
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
        console.log(`post item ${item.categoryId}`);
        console.log(item);
        this.$axios.post(
          `http://localhost:8089/wave-sample/api/question-answer`,
          {
            categoryId: item.categoryId,
            categoryName: item.categoryName,
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
      this.
      this.dialogDelete = true;
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
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>