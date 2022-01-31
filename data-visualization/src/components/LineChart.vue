<template>
  <div ref="d3el"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import * as d3 from "d3";

interface LineChart {
  color: string;
  items: LineChartItem[];
  legend: string;
}

interface LineChartItem {
  y: number;
  x: Date;
}

export default defineComponent({
  props: {
    plots: {
      type: Array as PropType<Array<LineChart>>,
      required: true,
    },
    height: {
      type: Number,
      default: 300,
    },
    width: {
      type: Number,
      default: 800,
    },
  },
  setup(props) {
    const d3el = ref<HTMLDivElement>();
    onMounted(() => {
      if (!d3el.value) {
        return;
      }

      const margin = { top: 10, right: 30, bottom: 30, left: 60 };
      const width = props.width - margin.left - margin.right;
      const height = props.height - margin.top - margin.bottom;

      const svg = d3
        .select(d3el.value)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const x = d3
        .scaleTime()
        // @ts-ignore
        .domain(d3.extent(props.plots[0].items, (d) => d.x))
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      const y = d3
        .scaleLinear()
        //@ts-ignore
        .domain([0, d3.max(props.plots[0].items, (d) => +d.y)])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      props.plots.forEach((plot) => {
        svg
          .append("path")
          .datum(plot.items)
          .attr("fill", "none")
          .attr("stroke", plot.color)
          .attr("stroke-width", 1.5)
          .attr(
            "d",
            // @ts-ignore
            d3
              .line()
              // @ts-ignore
              .x((d) => x(d.x))
              // @ts-ignore
              .y((d) => y(d.y))
          );
      });

      const legends = svg.selectAll(".city").data(props.plots).enter();

      legends
        .append("rect")
        .attr("x", 15)
        .attr("y", (_, i) => i * 20 + 10)
        .attr("height", 10)
        .attr("width", 10)
        .style("fill", (d) => d.color);

      legends
        .append("text")
        .attr("x", 30)
        .attr("y", (_, i) => i * 20 + 20)
        .attr("fill", "#2c3e50")
        .text((d) => d.legend);
    });

    return { d3el };
  },
});
</script>
