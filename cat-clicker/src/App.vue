<template>
  <progress v-if="loading" />
  <template v-else>
    <breeds :breeds="breeds" @click="onSelectBreed" />
    <span>{{ selectedBreed.name }}</span>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import axios from "axios";
import Breeds, { Breed } from "@/components/breeds/Breeds.vue";

export default defineComponent({
  name: "App",
  components: { Breeds },
  setup() {
    const loading = ref(true);
    const selectedBreed = ref<Breed>({
      id: "",
      name: "",
    });
    const breeds = ref<Breed[]>([]);

    axios
      .get("https://api.thecatapi.com/v1/breeds", {
        params: {
          limit: 10,
        },
      })
      .then(({ data }) => {
        breeds.value = data.map((b: Breed) => ({ name: b.name, id: b.id }));
        loading.value = false;
      });

    const onSelectBreed = (breed: Breed) => (selectedBreed.value = breed);

    return {
      loading,
      breeds,
      selectedBreed,
      onSelectBreed,
    };
  },
});
</script>
<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: rem(32);
}
</style>

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
  color: #2c3e50;

  display: flex;
  height: 100%;
}
</style>
