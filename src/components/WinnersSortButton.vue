<script setup>
import { ref, defineProps, computed, defineEmits } from "vue";
const state = ref(0);
const keys = [null, "ASC", "DESC"];
const icons = {
  ASC: "↑",
  DESC: "↓",
};
const emitParams = defineEmits(["paramsOnChange"]);

const props = defineProps({
  content: {
    type: String,
  },
});

async function change() {
  state.value++;
  if (state.value > 2) state.value = 0;
}

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

<style scoped></style>
