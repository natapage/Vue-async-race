<script setup>
import garageItem from "./GarageItem.vue";
import { defineProps } from "vue";

const emit = defineEmits(["remove", "select"]);

const props = defineProps({
  garage: {
    type: Array,
  },
});
</script>

<template>
  <garageItem
    v-for="car in garage"
    :car="car"
    :key="car.id"
    @remove="$emit('remove', car.id)"
    @select="$emit('select', car)"
  ></garageItem>
</template>

<style scoped></style>
