<template>
  <progress v-if="loading" />
  <div v-show="!loading" class="app">
    <cat-click-counter @load="isFirstCatLoading = false" />
    <cat-click-counter @load="isSecondCatLoading = false" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CatClickCounter from "@/components/cat-click-counter/CatClickCounter.vue";

export default defineComponent({
  name: "App",
  components: { CatClickCounter },
  setup() {
    const isFirstCatLoading = ref(true);
    const isSecondCatLoading = ref(true);

    const loading = computed(
      () => isFirstCatLoading.value && isSecondCatLoading
    );

    return {
      loading,
      isFirstCatLoading,
      isSecondCatLoading,
    };
  },
});
</script>
<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: rem(32);
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
  font-size: $font-size;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
