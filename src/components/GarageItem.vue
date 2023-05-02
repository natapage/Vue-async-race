<script setup>
import { ref, defineProps } from "vue";
import car from "./Car.vue";

const emit = defineEmits(["remove"]);
const props = defineProps({
  car: {
    type: Object,
  },
});

const carElement = ref(null);

let animationObj;

function start() {
  animationObj = carElement.value.animate(
    [
      {
        left: "0",
      },
      {
        left: "100%",
      },
    ],
    {
      duration: 3000,
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );
}

function stop() {
  animationObj.pause();
}
</script>

<template>
  <div class="car-item">
    <div class="control-btns">
      <button class="btn">SELECT</button>
      <button class="btn" @click="$emit('remove', car)">REMOVE</button>
      <text class="car-brand">{{ props.car.name }}</text>
    </div>
    <div class="race-btns">
      <button class="btn" @click="start">A</button>
      <button class="btn" @click="stop">B</button>
    </div>
    <div class="track-container">
      <div class="track track-one">
        <div class="car" ref="carElement">
          <car :color="props.car.color"></car>
        </div>
      </div>
      <div class="track track-two">
        <img class="flag" src="../svg/finish-flag-svgrepo-com.svg" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.car {
  width: 100px;
  height: 50px;
  position: absolute;
}
.track {
  border-bottom: 1px dashed;
  border-top: 1px dashed;
  height: 70px;
  position: relative;
  display: flex;
  align-items: center;
}
.track-one {
  width: 500px;
}
.track-two {
  width: 80px;
}
.track-container {
  display: flex;
}
.flag {
  width: 30px;
  fill: white;
}
</style>
