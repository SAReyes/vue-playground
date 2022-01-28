<template>
  <cat :cat="aCat" />
  <counter counter="10" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cat from "@/components/cat/Cat.vue";
import Counter from "@/components/counter/Counter.vue";

export default defineComponent({
  name: "App",
  components: { Counter, Cat },
  setup() {
    return {
      aCat: {
        src: "https://cdn2.thecatapi.com/images/76j.jpg",
        name: "John Doe",
      },
    };
  },
});
</script>

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
  font-size: $font-size;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: rem(16);
}
</style>
