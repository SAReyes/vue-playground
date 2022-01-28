<template>
  <ul class="breeds">
    <li v-for="breed in breeds" :key="breed">
      <button
        type="button"
        class="breeds__button"
        @click.stop="() => onBreedClick(breed)"
      >
        {{ breed }}
      </button>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    breeds: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
  },
  setup(_, { emit }) {
    const onBreedClick = (breed: string) => {
      emit("click", breed);
    };
    return { onBreedClick };
  },
});
</script>
