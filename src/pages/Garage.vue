<script setup>
import garageList from "../components/GarageList.vue";
</script>

<template>
  <div class="garage">
    <div class="garage-settings">
      <div class="creating-form">
        <input />
        <button class="btn">Create</button>
      </div>
      <div class="updating-form">
        <input />
        <button class="btn">Update</button>
      </div>
      <div class="manage-btns">
        <button class="btn">RACE</button>
        <button class="btn">RESET</button>
        <button class="btn">GENERATE CARS</button>
      </div>
      <div class="garage">
        <h1>Garage ({{}})</h1>
        <h2>Page # {{}}</h2>
        <garageList></garageList>
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
