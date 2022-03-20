<template>
    <v-footer app  color="white" class="footerpart" height="50px">
      <v-col cols="12">
        <span>© {{ new Date().getFullYear() }} — Copyright Phuong Nguyen Duy</span>
      </v-col>
    </v-footer>
</template>
<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Footer",
}
</script>
<style lang="scss">
  .v-application .footerpart{
    border-top:1px solid rgba(0,0,0,0.1)!important;
  }
</style>