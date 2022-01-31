<template>
  <template v-if="lineChartWidth">
    <h1>Percent off coupons</h1>
    <div class="graphs">
      <LineChart
        :plots="percentOff"
        :width="lineChartWidth"
        :height="lineChartHeight"
      />
      <Donut
        :data="percentOffTotalByRetailer"
        :height="doughnutHeight"
        :width="doughnutWidth"
      />
    </div>
    <h1>Dollar off coupons</h1>
    <div class="graphs">
      <LineChart
        :plots="dollarOff"
        :width="lineChartWidth"
        :height="lineChartHeight"
      />
      <Donut
        :data="dollarOffTotalByRetailer"
        :width="doughnutWidth"
        :height="doughnutHeight"
      />
    </div>
  </template>
  <template v-else>
    <div class="size-template">
      <div class="size-template__line-chart" ref="lineChartTemplate" />
      <div class="size-template__doughnut" />
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import coupons from "@/assets/coupons.json";
import Donut from "@/components/Donut.vue";
import LineChart from "@/components/LineChart.vue";
import { getGraphsData } from "./models/coupons";

export default defineComponent({
  name: "App",
  components: { Donut, LineChart },
  setup() {
    const doughnutHeight = 300;
    const doughnutWidth = 400;
    const lineChartHeight = doughnutHeight;
    const lineChartWidth = ref(0);

    const lineChartTemplate = ref<HTMLDivElement>();

    onMounted(() => {
      if (!lineChartTemplate.value) {
        return;
      }

      const boundingClient = lineChartTemplate.value.getBoundingClientRect();
      lineChartWidth.value = boundingClient.width;
    });

    const percentOffGraphs = getGraphsData("percent-off", coupons);
    const dollarOffGraphs = getGraphsData("dollar-off", coupons);

    return {
      percentOff: percentOffGraphs.lineChart,
      dollarOff: dollarOffGraphs.lineChart,
      percentOffTotalByRetailer: percentOffGraphs.totalByRetailer,
      dollarOffTotalByRetailer: dollarOffGraphs.totalByRetailer,
      doughnutHeight,
      doughnutWidth,
      lineChartHeight,
      lineChartWidth,
      lineChartTemplate,
    };
  },
});
</script>

<style lang="scss" scoped>
.size-template {
  display: grid;
  grid-template-rows: 300px 300px;
  grid-template-columns: 1fr 400px;
}

.graphs {
  display: flex;
}
</style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
