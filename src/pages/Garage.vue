<script setup>
import garageList from "../components/GarageList.vue";
import { ref } from "vue";

const emit = defineEmits(["remove"]);

const garage = ref([
  {
    name: "Tesla",
    color: "#e6e6fa",
    id: 1,
  },
]);

let carName = ref("");
let carColor = ref("#ffffff");

function createCar() {
  garage.value.push({
    name: carName.value,
    color: carColor.value,
    id: Date.now(),
  });
}

function removeGarageItem(car) {
  console.log(car);
  garage.value = garage.value.filter((c) => c.id !== car.id);
}
</script>

<template>
  <div class="garage">
    <div class="garage-settings">
      <div class="creating-form">
        <input v-model="carName" type="text" />
        <input type="color" v-model="carColor" />
        <button class="btn" @click="createCar">Create</button>
      </div>
      <div class="updating-form">
        <input />
        <input type="color" />
        <button class="btn">Update</button>
      </div>
      <div class="manage-btns">
        <button class="btn">RACE</button>
        <button class="btn">RESET</button>
        <button class="btn">GENERATE CARS</button>
      </div>
      <div class="garage">
        <h1>Garage ({{ garage.length }})</h1>
        <h2>Page # {{}}</h2>
        <garageList :garage="garage" @remove="removeGarageItem"></garageList>
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
