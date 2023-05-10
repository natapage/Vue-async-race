<script setup>
import GarageItem from "../components/GarageItem.vue";
import { ref, onMounted, computed, defineEmits } from "vue";
import { getCars, createCar, deleteCar, updateCar } from "../api";
import { carBrands, carModels } from "../constants";

const emit = defineEmits(["remove", "select", "finish"]);

const garage = ref([]);

const carName = ref("");
const carColor = ref("#ffffff");
const updCarName = ref("");
const updCarColor = ref("#ffffff");
const updCarId = ref("");
const currentPage = ref(1);
const carNumber = ref(0);
const isRaceStarted = ref(false);
const winnerName = ref("");
const winnerTime = ref(0);
const isGotWinner = ref(false);

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
  fetchPage(currentPage.value);
  carName.value = "";
  carColor.value = "#ffffff";
}

async function handleUpdateCar() {
  const carToUpdate = {
    name: updCarName.value,
    color: updCarColor.value,
  };
  await updateCar(carToUpdate, updCarId.value);
  fetchPage(currentPage.value);
  updCarName.value = "";
  updCarColor.value = "#ffffff";
}

async function handleRemoveCar(id) {
  await deleteCar(id);
  fetchPage(currentPage.value);
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
  fetchPage(currentPage.value);
}

async function fetchPage(page) {
  const response = await getCars(page);
  garage.value = response.items;
  carNumber.value = response.count;
}

async function previousPage() {
  currentPage.value--;
  await fetchPage(currentPage.value);
  console.log(garage.value);
}

async function nextPage() {
  currentPage.value++;
  await fetchPage(currentPage.value);
}

function getWinner(id, time) {
  if (isRaceStarted) {
    const winnerId = id;
    if (winnerName.value === "") {
      winnerTime.value = Math.round(time / 100) / 10;
      winnerName.value = garage.value.filter(
        (item) => item.id === winnerId
      )[0].name;
      isGotWinner.value = true;
      setTimeout(() => (isGotWinner.value = false), 3000);
    }
  }
  // isRaceStarted.value = false;
}

function startRace() {
  winnerName.value = "";
  isRaceStarted.value = true;
}

function resetRace() {
  isRaceStarted.value = false;
}

const totalPages = computed(() => Math.floor(carNumber.value / 7) + 1);

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
        <button
          class="btn"
          @click="handleCreateCar"
          :disabled="!carName && isRaceStarted"
        >
          Create
        </button>
      </div>
      <div class="updating-form">
        <input type="text" v-model="updCarName" />
        <input type="color" v-model="updCarColor" />
        <button
          class="btn"
          :disabled="!updCarName && isRaceStarted"
          @click="handleUpdateCar"
        >
          Update
        </button>
      </div>
      <div class="manage-btns">
        <button class="btn" @click="startRace" :disabled="isRaceStarted">
          RACE
        </button>
        <button class="btn" @click="resetRace">RESET</button>
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
          @finish="getWinner"
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
