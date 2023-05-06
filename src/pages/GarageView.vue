<script setup>
import GarageList from "../components/GarageList.vue";
import { ref, onMounted, computed } from "vue";
import { getCars, createCar, deleteCar, updateCar } from "../api";

const emit = defineEmits(["remove", "select"]);

const garage = ref([]);

const carName = ref("");
const carColor = ref("#ffffff");
const updCarName = ref("");
const updCarColor = ref("#ffffff");
const updCarId = ref("");
const currentPage = ref(1);
const carNumber = ref(0);

const carBrands = ref([
  "Toyota",
  "Ford",
  "Chevrolet",
  "Honda",
  "Nissan",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volkswagen",
  "Hyundai",
  "Kia",
  "Volvo",
  "Mazda",
  "Subaru",
  "Jeep",
  "Lexus",
]);

const carModels = ref([
  "Corolla",
  "Civic",
  "Mustang",
  "Camaro",
  "Altima",
  "M5",
  "S-Class",
  "A8",
  "Golf",
  "Elantra",
  "Optima",
  "XC90",
  "CX-5",
  "Impreza",
  "Wrangler",
  "RX",
]);

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

async function generateCars() {
  for (let i = 0; i < 100; i++) {
    const newCar = {};
    newCar.name = `${
      carBrands.value[Math.floor(Math.random() * carBrands.value.length)]
    } ${carModels.value[Math.floor(Math.random() * carModels.value.length)]}`;
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

async function previousPage() {
  currentPage.value--;
  let response = await getCars(currentPage.value);
  garage.value = response.items;
}

async function nextPage() {
  currentPage.value++;
  let response = await getCars(currentPage.value);
  garage.value = response.items;
}

function startRace() {}

const totalPages = computed(() => Math.floor(carNumber.value / 7) + 1);

onMounted(() => fetchPage(currentPage.value));
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
        <button class="btn" @click="startRace">RACE</button>
        <button class="btn">RESET</button>
        <button class="btn" @click="generateCars">GENERATE CARS</button>
      </div>
      <div class="garage">
        <h1>Garage ({{ carNumber }})</h1>
        <h2>Page # {{ currentPage }}</h2>
        <garage-list
          :garage="garage"
          @remove="handleRemoveCar"
          @select="handleSelectCar"
        ></garage-list>

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
</style>
