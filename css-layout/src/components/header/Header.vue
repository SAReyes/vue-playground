<template>
  <header class="header">
    <img class="header__logo" alt="acme corporation" src="@/assets/logo.png" />
    <span class="header__user">
      <span class="header__initials">JD</span>
      <span>John Doe</span>
    </span>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style lang="scss" scoped>
.header {
  $content-height: rem(48);

  background-color: $c-background-light;
  color: $c-text-light;

  padding: $spacing-s $spacing-m;

  display: flex;
  justify-content: space-between;

  &__logo {
    height: $content-height;
  }

  &__user {
    display: flex;
    gap: $spacing-s;
    align-items: center;
  }

  &__initials {
    background-color: $c-primary-accent;
    color: $c-text-dark;

    font-weight: 600;
    font-size: rem(24);

    height: $content-height;
    width: $content-height;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
