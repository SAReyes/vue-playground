<template>
  <img :src="cat.src" :alt="cat.name" />
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
