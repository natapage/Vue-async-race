<script setup>
import { ref } from "vue";
import GarageCar from "../components/GarageCar.vue";
import { getWinners, getCar } from "../api";
const winnersList = ref([]);
const winnerName = ref("");

async function getWinnersList() {
  const response = await getWinners();
  winnersList.value = response.items;
  winnersList.value.map(async (item) => {
    const response = await getCar(item.id);
    item.name = response.name;
    item.color = response.color;
  });
}

getWinnersList();
</script>

<template>
  <div class="container">
    <h1>Winners ({{ winnersList.length }})</h1>
    <h2>Page # {{}}</h2>
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Best Time (seconds)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(winner, index) in winnersList" :key="winner.id">
          <td>{{ index + 1 }}</td>
          <td><garage-car :color="winner.color"></garage-car></td>
          <td>{{ winner.name }}</td>
          <td>{{ winner.wins }}</td>
          <td>{{ winner.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

td,
th {
  padding: 10px;
}
</style>
