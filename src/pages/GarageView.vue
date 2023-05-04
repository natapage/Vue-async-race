<script setup>
import garageList from "../components/GarageList.vue";
import { ref, onMounted } from "vue";
import { getCars, createCar, deleteCar, updateCar } from "../api";

const emit = defineEmits(["remove", "select"]);

const garage = ref([]);

let carName = ref("");
let carColor = ref("#ffffff");
let updCarName = ref("");
let updCarColor = ref("#ffffff");
let updCarId = ref("");

// function createCar() {
//   garage.value.push({
//     name: carName.value,
//     color: carColor.value,
//     id: Date.now(),
//   });
//   carName.value = "";
//   carColor.value = "#ffffff";
// }

function handleSelect(car) {
  updCarId.value = car.id;
  updCarName.value = car.name;
  updCarColor.value = car.color;
}

async function handleCreate() {
  const newCar = {
    name: carName.value,
    color: carColor.value,
  };
  await createCar(newCar);
  let responce = await getCars();
  garage.value = responce.items;
  carName.value = "";
  carColor.value = "#ffffff";
}

// function updateCar() {
//   const carToUpdate = garage.value.find((car) => car.id === updCarId.value);
//   carToUpdate.name = updCarName.value;
//   carToUpdate.color = updCarColor.value;
//   updCarName.value = "";
//   updCarColor.value = "#ffffff";
//   updCarId.value = "";
// }

async function handleUpdate() {
  const carToUpdate = {
    name: updCarName.value,
    color: updCarColor.value,
  };
  await updateCar(carToUpdate, updCarId.value);
  let responce = await getCars();
  garage.value = responce.items;
  updCarName.value = "";
  updCarColor.value = "#ffffff";
}

async function handleRemove(id) {
  await deleteCar(id);
  let responce = await getCars();
  garage.value = responce.items;
}

// function removeGarageItem(car) {
//   garage.value = garage.value.filter((c) => c.id !== car.id);
// }

onMounted(() => getCars().then((res) => (garage.value = res.items)));
</script>

<template>
  <div class="garage">
    <div class="garage-settings">
      <div class="creating-form">
        <input v-model="carName" type="text" />
        <input type="color" v-model="carColor" />
        <button class="btn" @click="handleCreate" :disabled="!carName">
          Create
        </button>
      </div>
      <div class="updating-form">
        <input type="text" v-model="updCarName" />
        <input type="color" v-model="updCarColor" />
        <button class="btn" :disabled="!updCarName" @click="handleUpdate">
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
          @remove="handleRemove"
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
