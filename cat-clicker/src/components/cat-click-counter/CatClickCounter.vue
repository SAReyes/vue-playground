<template>
  <span v-if="!breedId"> Click a cat! </span>
  <progress v-else-if="loading" />
  <div v-else class="cat-click-counter">
    <h1>{{ cat.name }}</h1>
    <counter :counter="catClickCounter" />
    <cat :cat="cat" @click="onCatClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, watch } from "vue";
import Cat, { CatProps } from "@/components/cat/Cat.vue";
import Counter from "@/components/counter/Counter.vue";
import axios from "axios";

export default defineComponent({
  props: {
    breedId: {
      type: String,
      required: true,
    },
  },
  components: { Counter, Cat },
  setup(props) {
    const loading = ref(true);

    const cat = reactive<CatProps>({
      src: "",
      name: "",
    });

    const loadCat = (breedId: string) => {
      loading.value = true;
      axios
        .get("https://api.thecatapi.com/v1/images/search", {
          params: {
            breed_ids: breedId,
            limit: 1,
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

          loading.value = false;
        });
    };

    const catClickCounter = ref(0);

    watch(
      () => props.breedId,
      (newBreedId) => {
        loadCat(newBreedId);
      }
    );

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
<style lang="scss" scoped>
.cat-click-counter {
  display: flex;
  flex-direction: column;

  font-size: rem(36);
}
</style>
