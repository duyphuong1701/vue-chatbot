<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-5"
    style="width: 75vw"
  >
    <template v-slot:top>
      <v-toolbar flat>
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
                    v-model="editedItem.categoryId"
                    label="Mã thể loại"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    :counter="500"
                    v-model="editedItem.categoryName"
                    label="Tên thể loại"
                    required
                  ></v-text-field>
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
  name: "CategoryPage",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Mã thể loại",
        align: "start",
        sortable: false,
        value: "categoryId",
        width: "45%",
      },
      { text: "Tên thể loại", value: "categoryName", width: "45%" },
      { text: "Thao tác", value: "actions", sortable: false, width: "10%" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      categoryId: "",
      categoryName: "",
    },
    defaultItem: {
      categoryId: "",
      categoryName: "",
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
    this.getCategory();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          categoryId: "ID_I.2.3",
          categoryName: "Điều cần lưu ý của SVDHCT",
        },
      ];
    },
    getCategory() {
      try {
        this.$axios
          .get(`http://localhost:8089/wave-sample/api/category/`)
          .then((res) => {
            this.desserts = res.data;
          });
      } catch (e) {
        console.log(e);
      }
    },
    deleteCategory(item) {
      try {
        this.$axios.delete(
          `http://localhost:8089/wave-sample/api/category/${item.categoryId}`
        );
      } catch (e) {
        console.log(e);
      }
    },
    putCategory(item) {
      try {
        console.log(`update item ${item.categoryId}`);
        console.log(item);
        this.$axios.put(
          `http://localhost:8089/wave-sample/api/category/${item.categoryId}`,
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
    postCategory(item) {
      try {
        console.log(`post item ${item.categoryId}`);
        console.log(item);
        this.$axios.post(
          `http://localhost:8089/wave-sample/api/category/`,
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
      this.dialogDelete = true;
      this.deleteCategory(item);
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
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
        this.putCategory(this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
        this.postCategory(this.editedItem);
      }
      this.close();
    },
  },
};
</script>