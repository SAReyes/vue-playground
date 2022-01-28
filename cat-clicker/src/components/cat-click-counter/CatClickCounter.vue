<template>
  <div class="cat-click-counter">
    <cat :cat="cat" @click="onCatClick" />
    <counter :counter="catClickCounter" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Cat, { CatProps } from "@/components/cat/Cat.vue";
import Counter from "@/components/counter/Counter.vue";
import axios from "axios";

export default defineComponent({
  components: { Counter, Cat },
  emits: ["load"],
  setup(_, { emit }) {
    const cat = reactive<CatProps>({
      src: "",
      name: "",
    });

    axios
      .get("https://api.thecatapi.com/v1/images/search", {
        params: {
          has_breeds: 1,
          size: "small",
        },
        headers: {
          "x-api-key": process.env.VUE_APP_CAT_API_KEY,
        },
      })
      .then(({ data }) => {
        if (!data.length) {
          return [];
        }

        const { url, breeds } = data[0];

        cat.src = url;
        cat.name = breeds.length ? breeds[0].name : "Unknown";

        emit("load");
      });

    const catClickCounter = ref(0);

    const onCatClick = () => {
      catClickCounter.value = catClickCounter.value + 1;
    };

    return {
      cat,
      onCatClick,
      catClickCounter,
    };
  },
});
</script>
<style lang="scss" scoped>
.cat-click-counter {
  display: flex;
  gap: rem(16);
}
</style>
