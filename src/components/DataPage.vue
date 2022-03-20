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
                    :counter="500"
                    v-model="editedItem.txt_question"
                    label="Câu hỏi"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    :counter="500"
                    v-model="editedItem.txt_answer"
                    label="Câu trả lời"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-select
                    :items="type_question"
                    v-model="editedItem.opt_type"
                    label="Chủ đề"
                    required
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
        text: "Câu hỏi",
        align: "start",
        sortable: false,
        value: "txt_question",
        width: "40%",
      },
      { text: "Câu trả lời", value: "txt_answer", width: "40%" },
      { text: "Loại", value: "opt_type", width: "13%" },
      { text: "Thao tác", value: "actions", sortable: false, width: "7%" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      txt_question: "",
      txt_answer: "",
      opt_type: "",
    },
    defaultItem: {
      txt_question: "",
      txt_answer: "",
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
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          txt_question:
            "Những điều sinh viên cần lưu ý khi theo học tại trường",
          txt_answer:
            "Sinh viên phải giữ trật tự, vệ sinh, chấp hành luật giao thông, để xe đúng nơi quy định. Sinh viên Trường ĐHCT phải có nếp sống văn minh; không làm ồn, gây mất trật tự; không tụ tập uống rượu bia",
          opt_type: "Điều cần lưu ý của SVDHCT- ID_I.2.3",
        },
        {
          txt_question: "Trang phục sinh viên khi đến lớp",
          txt_answer:
            "Khi vào trường, sinh viên phải mang bảng tên, trang phục sạch sẽ, gọn gàng, kín đáo; phải mặc đồng phục khi tham dự những học phần có yêu cầu",
          opt_type: "Trang phục - ID_I.2.2",
        },
        {
          txt_question: "Mức học phí tính như thế nào",
          txt_answer:
            "Học phí đóng theo học kỳ và tính theo tổng số tín chỉ mà sinh viên đã đăng ký học ở học kỳ đó. Mức học phí do hiệu trưởng quyết định",
          opt_type: "Học phí - ID_11",
        },
        {
          txt_question: "Ngành khoa học máy tính học những gì",
          txt_answer: "",
        },
        {
          txt_question: "Ra trường ngành khoa học máy tính có thể làm gì",
          txt_answer: "",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
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