<template>
  <main>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
  components: {
    HelloWorld,
  },
});
</script>
<style lang="scss" scoped>
main {
  background-color: $c-background-dark;
  color: $c-text-dark;
}
</style>
