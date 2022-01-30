<template>
  <div class="cat">
    <img class="cat__image" :src="cat.image" :alt="cat.description" />
    <div class="cat__description-box">
      <span>{{ cat.description }}</span>
      <div class="cat__button-container">
        <Button>go</Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import Button from "@/components/button/Button.vue";

export interface CatProps {
  image: string;
  description: string;
}

export default defineComponent({
  components: { Button },
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
  width: rem(300);
  border-radius: rem(4);
  box-shadow: 0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%);
  display: flex;
  flex-direction: column;

  &__image {
    object-fit: cover;
    width: 100%;
    height: rem(200);
  }

  &__description-box {
    padding: $spacing-s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    gap: $spacing-s;
    flex: 1;
  }

  &__button-container {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
