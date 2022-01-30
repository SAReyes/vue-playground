<template>
  <main class="main">
    <div class="main__gradient" />
    <h1 class="main__title">Nice pictures</h1>
    <div class="main__cats">
      <cat v-for="cat in cats" :key="cat.image" :cat="cat" />
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Cat, { CatProps } from "@/components/cat/Cat.vue";
import axios from "axios";
import { loremIpsum } from "lorem-ipsum";

export default defineComponent({
  components: { Cat },
  setup() {
    const cats = ref<CatProps[]>();
    axios
      .get("/images/search", {
        params: {
          limit: 20,
          size: "full",
          mime_types: "gif",
        },
      })
      .then(({ data }) => {
        cats.value = data.map((cat: { url: string }) => ({
          image: cat.url,
          description: loremIpsum({
            sentenceLowerBound: 8,
            sentenceUpperBound: 32,
            paragraphLowerBound: 2,
            paragraphUpperBound: 8,
          }),
        }));
      });
    return { cats };
  },
});
</script>
<style lang="scss" scoped>
.main {
  $title-height: rem(160);

  position: relative;
  padding: $spacing-m $spacing-m;

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
    height: $title-height;
    color: $c-text-dark;
  }

  &__cats {
    display: flex;
    gap: $spacing-m;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
