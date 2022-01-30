<template>
  <div class="cat">
    <img class="cat__image" :src="cat.image" :alt="cat.description" />
    <div class="cat__description-box">
      <span>{{ cat.description }}</span>
    </div>
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
<style lang="scss" scoped>
.cat {
  margin-top: rem(8);
  width: rem(300);
  border-radius: rem(4);
  box-shadow: 0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%);

  &__image {
    object-fit: cover;
    width: 100%;
    height: rem(200);
  }

  &__description-box {
    padding: $spacing-s;
    display: flex;
    flex-direction: column;
    gap: $spacing-s;
  }
}
</style>
