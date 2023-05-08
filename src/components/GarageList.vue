<script setup>
import GarageItem from "./GarageItem.vue";
import { defineProps } from "vue";

const emit = defineEmits(["remove", "select", "finish"]);

const props = defineProps({
  garage: {
    type: Array,
  },
  isStarted: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <garage-item
    v-for="car in garage"
    :car="car"
    :key="car.id"
    :isStarted="isStarted"
    @finish="$emit('finish', car.id)"
    @remove="$emit('remove', car.id)"
    @select="$emit('select', car)"
  ></garage-item>
</template>

<style scoped></style>
