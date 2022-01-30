<template>
  <main class="main">
    <div class="main__gradient" />
    <h1 class="main__title">Nice pictures</h1>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
});
</script>
<style lang="scss" scoped>
.main {
  $title-height: rem(160);

  position: relative;
  padding: $spacing-s $spacing-m;

  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -10;

    height: $title-height;
    background-color: $c-primary-accent;
    background-repeat: no-repeat;
    background-position: bottom;
    background-image: url("~@/assets/gradient.png");
  }

  &__title {
    height: calc(#{$title-height} - #{$spacing-s});
    color: $c-text-dark;
  }
}
</style>
