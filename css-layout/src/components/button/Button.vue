<template>
  <button type="button" class="button"><slot /></button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style lang="scss" scoped>
.button {
  text-transform: uppercase;
  border: none;
  border-radius: rem(4);
  padding: $spacing-s $spacing-m;
  background: $c-primary-accent;
  font-weight: 600;
  color: $c-text-dark;
  cursor: pointer;
}
</style>
