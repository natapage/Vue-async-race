<script>
import { ref } from "vue";
import garage from "./pages/Garage.vue";
import winners from "./pages/Winners.vue";

export default {
  components: {
    garage,
    winners,
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
          <garage />
        </div>
        <div v-if="activeTab === 1">
          <winners />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab {
  display: flex;
}
</style>
