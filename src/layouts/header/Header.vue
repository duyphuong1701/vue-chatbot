<template>
  <v-app-bar app clipped-left clipped-right color="primary" dark>
    <v-toolbar-title class="align-center d-flex">
      <span class="logo-icon">
        <v-icon>mdi-comment-flash</v-icon>
      </span>
      <v-spacer/>
      <h4 class="mx-3">Hệ thống hỗ trợ sinh viên</h4>
    </v-toolbar-title>
    <v-app-bar-nav-icon class="d-block d-md-none" />
    <v-spacer />
    <!---right part -->

    <v-menu bottom left transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, i) in userprofile" :key="i" @click="href">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
// Utilities
// import { mapState, mapMutations } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    userprofile: [
      { title: "My Profile" },
      { title: "My Balance" },
      { title: "Inbox" },
      { title: "Account Setting" },
      { title: "Logout" },
    ],
    href() {
      return undefined;
    },
  }),

  // computed: {
  //   ...mapState(["Sidebar_drawer"]),
  // },

  // methods: {
  //   ...mapMutations({
  //     setSidebarDrawer: "SET_SIDEBAR_DRAWER",
  //   }),
  // },
};
</script>