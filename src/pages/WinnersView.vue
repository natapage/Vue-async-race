<script setup>
import { ref, computed } from "vue";
import GarageCar from "../components/GarageCar.vue";
import WinnersSortButton from "../components/WinnersSortButton.vue";
import { getWinners, getCar } from "../api";
const winnersList = ref([]);
const currentPage = ref(1);
const winnersCount = ref(0);
const sort = ["id", "wins", "time"];

const totalPages = computed(() => Math.floor(winnersCount.value / 10) + 1);

async function getWinnersList(page, limit, sort, order) {
  const response = await getWinners(page, limit, sort, order);
  winnersList.value = response.items;
  winnersCount.value = response.count;
  winnersList.value.map(async (item) => {
    const response = await getCar(item.id);
    item.name = response.name;
    item.color = response.color;
  });
}

async function handleParamsOnChange(sort, order) {
  await getWinnersList(currentPage.value, 10, sort, order);
}

getWinnersList();

async function previousPage() {
  currentPage.value--;
  await getWinnersList(currentPage.value);
}

async function nextPage() {
  currentPage.value++;
  await getWinnersList(currentPage.value);
}
</script>

<template>
  <div class="container">
    <h1>Winners ({{ winnersCount }})</h1>
    <h2>Page # {{ currentPage }}</h2>
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th>
            <winners-sort-button
              :content="sort[1]"
              @paramsOnChange="handleParamsOnChange"
            ></winners-sort-button>
          </th>
          <th>
            <winners-sort-button
              :content="sort[2]"
              @paramsOnChange="handleParamsOnChange"
            ></winners-sort-button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(winner, index) in winnersList" :key="winner.id">
          <td>{{ index + currentPage * 10 - 9 }}</td>
          <td><garage-car :color="winner.color" /></td>
          <td>{{ winner.name }}</td>
          <td>{{ winner.wins }}</td>
          <td>{{ winner.time }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button class="btn" @click="previousPage" :disabled="currentPage === 1">
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
