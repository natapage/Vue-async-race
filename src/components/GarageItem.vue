<script setup>
import { ref, onMounted } from "vue";
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
      <button class="btn">REMOVE</button>
      <text clss="car-brand"></text>
    </div>
    <div class="race-btns">
      <button class="btn" @click="start">A</button>
      <button class="btn" @click="stop">B</button>
    </div>
    <div class="track-container">
      <div class="track track-one">
        <img
          class="car"
          ref="carElement"
          src="../svg/car-transport-svgrepo-com.svg"
        />
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
  /* background-color: rgb(255, 255, 255); */
  position: absolute;
  /* fill: pink; */
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
