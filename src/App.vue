<script>
import { ref } from "vue";
import garageView from "./pages/GarageView.vue";
import winnersView from "./pages/WinnersView.vue";

export default {
  components: {
    garageView,
    winnersView,
  },
  setup() {
    const tabs = ref(["to garage", "to winners"]);
    const activeTab = ref(0);

    return { tabs, activeTab };
  },
};
</script>

<template>
  <div class="tabs">
    <div class="tab">
      <div v-for="(tab, index) in tabs" :key="index">
        <button @click="activeTab = index">
          {{ tab }}
        </button>
      </div>
    </div>
    <div>
      <div class="content">
        <div v-if="activeTab === 0">
          <garageView />
        </div>
        <div v-if="activeTab === 1">
          <winnersView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab {
  display: flex;
}
.tabs {
  margin: 0 auto;
}
</style>
