<script setup>
import { ref, defineProps } from "vue";
import GarageCar from "./GarageCar.vue";
import { startEngine } from "../api";

const emit = defineEmits(["remove", "select"]);
const props = defineProps({
  car: {
    type: Object,
  },
});

const carElement = ref(null);

let animationObj;

async function start() {
  const response = await startEngine(props.car.id);
  console.log(response);
  const time = response.distance / response.velocity;

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
      duration: time,
      iterations: 1,
      easing: "ease-in-out",
      fill: "forwards",
    }
  );
}

function stop() {
  animationObj.reverse();
  animationObj.finish();
}
</script>

<template>
  <div class="garage-item">
    <div class="GarageItem_Buttons">
      <button class="GarageItem_ButtonsSelect" @click="$emit('select', car)">
        SELECT
      </button>
      <button class="GarageItem_ButtonsRemove" @click="$emit('remove', car.id)">
        REMOVE
      </button>
      <text class="car-brand">{{ props.car.name }}</text>
    </div>
    <div class="race-btns">
      <button class="btn" @click="start">A</button>
      <button class="btn" @click="stop">B</button>
    </div>
    <div class="track-container">
      <div class="track track-one">
        <div class="car" ref="carElement">
          <garage-car :color="props.car.color"></garage-car>
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
  /* border-top: 1px dashed; */
  height: 70px;
  position: relative;
  display: flex;
  align-items: center;
}
.track-one {
  width: 500px;
}
.track-two {
  width: 100px;
}
.track-container {
  display: flex;
}
.flag {
  width: 30px;
  fill: white;
}
.garage-item {
  margin-bottom: 15px;
}
</style>
