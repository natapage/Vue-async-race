<script setup>
import { ref, defineProps, computed, defineEmits } from "vue";
const state = ref(0);

const props = defineProps({
  // state: {
  //   type: Number,
  //   default: 0,
  // },
  content: {
    type: String,
  },
});

async function change() {
  state.value++;
  if (state.value > 2) state.value = 0;
  // await getWinnersList(currentPage.value, 10, sort, keys[state.value]);
}

const icons = {
  ASC: "↑",
  DESC: "↓",
};

const keys = [null, "ASC", "DESC"];

const emitParams = defineEmits(["paramsOnChange"]);

const icon = computed(() => {
  emitParams("paramsOnChange", props.content, keys[state.value]);
  return icons[keys[state.value]];
});
</script>

<template>
  <button class="btn" style="all: unset" @click="change">
    <slot> {{ content }} {{ icon }}</slot>
  </button>
</template>

<style lang="scss" scoped></style>
