import { ref, computed } from "vue";

export const garage = ref([]);
export const carName = ref("");
export const carColor = ref("#ffffff");
export const updCarName = ref("");
export const updCarColor = ref("#ffffff");
export const updCarId = ref("");
export const currentPage = ref(1);
export const carNumber = ref(0);
export const isRaceStarted = ref(false);
export const winnerName = ref("");
export const winnerTime = ref(0);
export const isGotWinner = ref(false);

export const totalPages = computed(() => Math.floor(carNumber.value / 7) + 1);
