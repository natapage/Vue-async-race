<script setup>
import garageList from "../components/GarageList.vue";
import { ref, onMounted } from "vue";
import { getCars } from "../api";

const emit = defineEmits(["remove", "select"]);

const garage = ref([
  {
    name: "Tesla",
    color: "#e6e6fa",
    id: 1,
  },
]);

let carName = ref("");
let carColor = ref("#ffffff");
let updCarName = ref("");
let updCarColor = ref("#ffffff");
let updCarId = ref("");

function createCar() {
  garage.value.push({
    name: carName.value,
    color: carColor.value,
    id: Date.now(),
  });
  carName.value = "";
  carColor.value = "#ffffff";
}

function handleSelect(car) {
  updCarId.value = car.id;
  updCarName.value = car.name;
  updCarColor.value = car.color;
}

function updateCar() {
  const carToUpdate = garage.value.find((car) => car.id === updCarId.value);
  carToUpdate.name = updCarName.value;
  carToUpdate.color = updCarColor.value;

  updCarName.value = "";
  updCarColor.value = "#ffffff";
  updCarId.value = "";
}

function removeGarageItem(car) {
  garage.value = garage.value.filter((c) => c.id !== car.id);
}

onMounted(() => {
  console.log(getCars());
});
</script>

<template>
  <div class="garage">
    <div class="garage-settings">
      <div class="creating-form">
        <input v-model="carName" type="text" />
        <input type="color" v-model="carColor" />
        <button class="btn" @click="createCar" :disabled="!carName">
          Create
        </button>
      </div>
      <div class="updating-form">
        <input type="text" v-model="updCarName" />
        <input type="color" v-model="updCarColor" />
        <button class="btn" :disabled="!updCarName" @click="updateCar">
          Update
        </button>
      </div>
      <div class="manage-btns">
        <button class="btn">RACE</button>
        <button class="btn">RESET</button>
        <button class="btn">GENERATE CARS</button>
      </div>
      <div class="garage">
        <h1>Garage ({{ garage.length }})</h1>
        <h2>Page # {{}}</h2>
        <garageList
          :garage="garage"
          @remove="removeGarageItem"
          @select="handleSelect"
        ></garageList>
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
