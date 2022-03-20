<template>
  <v-app id="inspire">
    <Header></Header>
    <SidebarApp></SidebarApp>
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>
<script>
import Header from "./header/Header";
import SidebarApp from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",
  components: {
    Header,
    SidebarApp,
    Footer,
  },
};
</script>