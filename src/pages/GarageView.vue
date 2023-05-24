<script setup>
import GarageItem from "../components/GarageItem.vue";
import { ref, onMounted, computed } from "vue";
import {
  getCars,
  createCar,
  deleteCar,
  updateCar,
  createWinner,
  getWinner,
  updateWinner,
} from "../api";
import { carBrands, carModels } from "../garageConstants";
import {
  garage,
  carName,
  carColor,
  updCarName,
  updCarColor,
  updCarId,
  currentPage,
  carNumber,
  isRaceStarted,
  winnerName,
  winnerTime,
  isGotWinner,
  totalPages,
} from "../garageVariables";

const emit = defineEmits(["remove", "select", "finish"]);

function handleSelectCar(car) {
  updCarId.value = car.id;
  updCarName.value = car.name;
  updCarColor.value = car.color;
}

async function handleCreateCar() {
  const newCar = {
    name: carName.value,
    color: carColor.value,
  };
  await createCar(newCar);
  await fetchPage(currentPage.value);
  carName.value = "";
  carColor.value = "#ffffff";
}

async function handleUpdateCar() {
  const carToUpdate = {
    name: updCarName.value,
    color: updCarColor.value,
  };
  await updateCar(carToUpdate, updCarId.value);
  await fetchPage(currentPage.value);
  updCarName.value = "";
  updCarColor.value = "#ffffff";
}

async function handleRemoveCar(id) {
  await deleteCar(id);
  await fetchPage(currentPage.value);
}

async function generateCars() {
  for (let i = 0; i < 100; i++) {
    const newCar = {};
    newCar.name = `${carBrands[Math.floor(Math.random() * carBrands.length)]} ${
      carModels[Math.floor(Math.random() * carModels.length)]
    }`;
    newCar.color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    await createCar(newCar);
  }
  await fetchPage(currentPage.value);
}

async function fetchPage(page) {
  const response = await getCars(page);
  garage.value = response.items;
  carNumber.value = response.count;
}

async function previousPage() {
  resetRace();
  currentPage.value--;
  await fetchPage(currentPage.value);
  console.log(garage.value);
}

async function nextPage() {
  resetRace();
  currentPage.value++;
  await fetchPage(currentPage.value);
}

function getRaceWinner(car, winTime) {
  if (isRaceStarted.value) {
    const winnerId = car.id;
    if (winnerName.value === "") {
      winnerTime.value = Math.round(winTime / 100) / 10;
      winnerName.value = garage.value.filter(
        (item) => item.id === winnerId
      )[0].name;
      isGotWinner.value = true;
      setTimeout(() => (isGotWinner.value = false), 3000);
      updateWinners(car, winnerTime.value);
    }
  }
}

async function updateWinners(car, time) {
  const response = await getWinner(car.id);
  if (response.id) {
    const winnerToUpdate = {};
    winnerToUpdate.id = car.id;
    winnerToUpdate.wins = response.wins + 1;
    winnerToUpdate.time = time;
    await updateWinner(winnerToUpdate, car.id);
  }
  if (!response.id) {
    const winnerToCreate = {};
    winnerToCreate.id = car.id;
    winnerToCreate.wins = 1;
    winnerToCreate.time = time;
    await createWinner(winnerToCreate);
  }
}

function startRace() {
  winnerName.value = "";
  isRaceStarted.value = true;
}

function resetRace() {
  isRaceStarted.value = false;
}

onMounted(() => {
  fetchPage(currentPage.value);
});
</script>

<template>
  <div class="garage">
    <div class="garage-settings">
      <div class="creating-form">
        <input v-model="carName" type="text" />
        <input type="color" v-model="carColor" />
        <button class="btn" @click="handleCreateCar" :disabled="!carName">
          Create
        </button>
      </div>
      <div class="updating-form">
        <input type="text" v-model="updCarName" />
        <input type="color" v-model="updCarColor" />
        <button class="btn" :disabled="!updCarName" @click="handleUpdateCar">
          Update
        </button>
      </div>
      <div class="manage-btns">
        <button class="btn" @click="startRace" :disabled="isRaceStarted">
          RACE
        </button>
        <button class="btn" @click="resetRace">RESET RACE</button>
        <button class="btn" @click="generateCars" :disabled="isRaceStarted">
          GENERATE CARS
        </button>
      </div>
      <div class="garage">
        <h1>Garage ({{ carNumber }})</h1>
        <h2>Page # {{ currentPage }}</h2>
        <garage-item
          v-for="car in garage"
          :car="car"
          :key="car.id"
          :isRaceStarted="isRaceStarted"
          @finish="getRaceWinner"
          @remove="handleRemoveCar"
          @select="handleSelectCar"
        ></garage-item>

        <h1 class="winner-message" v-if="isGotWinner">
          {{ winnerName }} went first ({{ winnerTime }}s)!
        </h1>

        <div class="pagination">
          <button
            class="btn"
            @click="previousPage"
            :disabled="currentPage === 1"
          >
            PREV
          </button>
          <button
            class="btn"
            @click="nextPage"
            :disabled="totalPages === currentPage"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.creating-form {
  margin-top: 15px;
  margin-bottom: 10px;
}
.winner-message {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 20%;
  color: white;
  text-shadow: 0 0 50px gold;
  font-size: 3rem;
  font-weight: bold;
}
</style>
