<template>
  <Header />
  <Main class="main" />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/header/Header.vue";
import Main from "@/components/main/Main.vue";
import Footer from "@/components/footer/Footer.vue";

export default defineComponent({
  name: "App",
  components: {
    Footer,
    Main,
    Header,
  },
});
</script>

<style lang="scss" scoped>
.main {
  overflow: auto;
}
</style>

<style lang="scss">
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: $font-size;

  display: grid;
  grid-template-rows: auto 1fr auto;

  overflow: hidden;
  height: 100%;
}
</style>
