<template>
  <progress v-if="loading" />
  <template v-else>
    <cat :cat="cat" @click="onCatClick" />
    <counter :counter="catClickCounter" />
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Cat, { CatProps } from "@/components/cat/Cat.vue";
import Counter from "@/components/counter/Counter.vue";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: { Counter, Cat },
  setup() {
    const loading = ref(true);

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
        cat.name = breeds.length ? breeds.name : "Unknown";

        loading.value = false;
      });

    const catClickCounter = ref(0);

    const onCatClick = () => {
      catClickCounter.value = catClickCounter.value + 1;
    };

    return {
      loading,
      cat,
      onCatClick,
      catClickCounter,
    };
  },
});
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: $font-size;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: rem(16);
}
</style>
