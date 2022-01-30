<template>
  <footer class="footer">
    <span class="footer__users-number"> {{ users }} </span>&nbsp;active users
  </footer>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      users: Math.floor(Math.random() * 11),
    };
  },
});
</script>
<style lang="scss" scoped>
.footer {
  border-top: rem(5) solid $c-primary-accent;
  padding: $spacing-s $spacing-m;

  &__users-number {
    color: $c-primary-accent;
  }
}
</style>
