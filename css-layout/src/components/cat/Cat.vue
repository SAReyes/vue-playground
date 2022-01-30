<template>
  <div>
    <img :src="cat.image" :alt="cat.description" />
    <span>{{ cat.description }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface CatProps {
  image: string;
  description: string;
}

export default defineComponent({
  props: {
    cat: {
      type: Object as PropType<CatProps>,
      required: true,
    },
  },
});
</script>
