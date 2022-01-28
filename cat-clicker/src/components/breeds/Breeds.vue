<template>
  <ul class="breeds">
    <li v-for="breed in breeds" :key="breed.id">
      <button
        type="button"
        class="breeds__button"
        @click.stop="() => onBreedClick(breed)"
      >
        {{ breed.name }}
      </button>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface Breed {
  id: string;
  name: string;
}

export default defineComponent({
  emits: ["click"],
  props: {
    breeds: {
      type: Array as PropType<Array<Breed>>,
      required: true,
    },
  },
  setup(_, { emit }) {
    const onBreedClick = (breed: Breed) => {
      emit("click", breed);
    };
    return { onBreedClick };
  },
});
</script>
<style lang="scss" scoped>
.breeds {
  list-style: none;
  margin: 0;
  padding: rem(8);
  display: flex;
  flex-direction: column;
  gap: rem(8);

  border-right: 1px solid #ebebeb;

  &__button {
    border: 0;
    background-color: transparent;
    color: inherit;
    font-size: rem(26);
    padding: rem(4) rem(8);
    cursor: pointer;
    width: 100%;
    border-radius: rem(4);
    text-align: left;

    &:hover {
      background-color: #f6f6f6;
    }

    &:focus {
      color: #6200ee;
      background-color: #6200ee19;
    }
  }
}
</style>
