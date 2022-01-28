<template>
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  <div class="box">My box</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
});
</script>
<style lang="scss" scoped>
.box {
  background-color: red;
  height: rem(100);
}
</style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: $font-size;
}
</style>
