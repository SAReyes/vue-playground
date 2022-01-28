<template>
  <button type="button">
    <img :src="cat.src" :alt="cat.name" />
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

interface CatProps {
  name: string;
  src: string;
}

export default defineComponent({
  props: {
    cat: {
      type: Object as PropType<CatProps>,
    },
  },
});
</script>
<style lang="scss" scoped>
button {
  padding: 0;
  border: none;
  cursor: pointer;
}
</style>
