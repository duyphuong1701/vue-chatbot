<template>
  <v-container
    fluid
    style="margin: 0px; padding: 0px; width: 100%"
    class="d-flex flex-start"
    fill-height
  >
    <section id="page">
      <div class="current_model">
        <div style="height: 30%; width: 100%">
          <v-card class="mx-auto" max-width="344">
            <div style="background-color: #03a9f4; padding: 30px">
              <h3 style="color: white; text-align: center; font-size: 2em">
                80.12%
              </h3>
            </div>
            <v-card-title>Mô hình hiện tại</v-card-title>
            <v-card-subtitle>Tham số sai lệch: C=9 </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="orange lighten-2" text>Xem tham số mô hình </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-card-text class="text-left">
                  Tổng số đặc trưng: 284
                  <br />
                  Số dữ liệu huấn luyện: 684
                  <br />
                  Thời gian: 2022-05-02 10:24:52.436263
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
      </div>
      <div class="list_model">Danh sach train</div>
      <div class="visualizer_model">Visualizer train</div>
    </section>
  </v-container>
</template>
<script>
export default {
  name: "ModelPage",
  data: () => ({
    show: false,
  }),
};
</script>
<style scoped>
#page {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas:
    "current_model list_model"
    "visualizer_model  list_model";

  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
}
#page > .current_model {
  grid-area: current_model;
  background-color: #07a787;
}
#page > .visualizer_model {
  grid-area: visualizer_model;
  background-color: #ffa400;
}
#page > .list_model {
  grid-area: list_model;
  background-color: #00aefd;
}
</style>