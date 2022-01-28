<template>
  <cat :cat="aCat" @click="onCatClick" />
  <counter :counter="catClickCounter" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Cat from "@/components/cat/Cat.vue";
import Counter from "@/components/counter/Counter.vue";

export default defineComponent({
  name: "App",
  components: { Counter, Cat },
  setup() {
    const catClickCounter = ref(0);

    const onCatClick = () => {
      catClickCounter.value = catClickCounter.value + 1;
    };

    return {
      aCat: {
        src: "https://cdn2.thecatapi.com/images/76j.jpg",
        name: "John Doe",
      },
      onCatClick,
      catClickCounter,
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
