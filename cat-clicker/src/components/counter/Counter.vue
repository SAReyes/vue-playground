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
