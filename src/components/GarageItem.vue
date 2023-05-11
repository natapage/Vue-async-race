<script setup>
import { ref, defineProps, watchEffect, defineEmits } from "vue";
import GarageCar from "./GarageCar.vue";
import { startEngine, driveMode } from "../api";

let isCarStarted = ref(false);
const emit = defineEmits(["remove", "select", "finish"]);
const props = defineProps({
  car: {
    type: Object,
  },
  isRaceStarted: {
    type: Boolean,
    default: false,
  },
});

let animationObj;

watchEffect(() => {
  if (props.isRaceStarted) {
    start();
  }
  if (!props.isRaceStarted && animationObj) {
    stop();
  }
});

const carElement = ref(null);

async function start() {
  isCarStarted.value = true;
  const response = await startEngine(props.car.id);
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

  driveMode(props.car.id)
    .then(() => {
      emit("finish", props.car, time);
    })
    .catch((error) => {
      animationObj.pause();
      if (error.status === 400) {
        console.log(
          "Wrong parameters: id should be any positive number, status should be started, stopped or drive"
        );
      }
      if (error.status === 404) {
        console.log(
          "Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to started before?"
        );
      }
      if (error.status === 429) {
        console.log(
          "Drive already in progress. You can't run drive for the same car twice while it's not stopped"
        );
      }
      if (error.status === 500) {
        console.log(
          "Car has been stopped suddenly. Its engine was broken down"
        );
      }
    });
}

function stop() {
  isCarStarted.value = false;
  animationObj.reverse();
  animationObj.finish();
}
</script>

<template>
  <div class="garage-item">
    <div class="garage-item-btns">
      <button class="btn" @click="$emit('select', car)">SELECT</button>
      <button class="btn" @click="$emit('remove', car.id)">REMOVE</button>
      <text class="car-brand">{{ props.car.name }}</text>
    </div>
    <div class="race-btns">
      <button
        class="btn"
        ref="startBtn"
        :disabled="isCarStarted"
        @click="start"
      >
        A
      </button>

      <button
        class="btn"
        ref="stopBtn"
        :disabled="!isCarStarted || isRaceStarted"
        @click="stop"
      >
        B
      </button>
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
.car-brand {
  margin-left: 20px;
}
</style>
