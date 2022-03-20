<template v-slot:header>
  <v-container class="py-0 fill-height">
    <v-btn depressed class="mx-1">
      <router-link to="/home" class="routerLink">ChatBot</router-link>
    </v-btn>
    <v-btn depressed class="mx-1">
      <router-link to="/data" class="routerLink">Data</router-link></v-btn
    >
    <v-btn depressed> Thông tin </v-btn>
    <v-spacer></v-spacer>
    <v-responsive max-width="10vw">
      <v-text-field
        dense
        flat
        hide-details
        rounded
        solo-inverted
      ></v-text-field>
    </v-responsive>
  </v-container>
</template>
<script>
export default {
  name: "HeaderApp",
};
</script>
<style scoped>
.routerLink {
  text-decoration: none;
}
</style>