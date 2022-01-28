<template>
  <span>Clicks: {{ counter }}</span>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    counter: {
      type: Number,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
span {
  color: #2c3e50;
  font-size: rem(36);
}
</style>
