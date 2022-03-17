<template>
  <div id="app">
      <!-- <header-app/> -->
      <HelloWorld msg="Welcome to Your Vue.js App" />
      <!-- <footer-app /> -->
      <!-- <h1>aaaa</h1> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
// import FooterApp from "./components/Footer.vue";
// import HeaderApp from "./components/HeaderApp.vue"

export default {
  name: "App",
  components: {
    // HeaderApp,
    HelloWorld,
    // FooterApp,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: white;
}
</style>
