<template>
  <div ref="d3el"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import * as d3 from "d3";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Record<string, number>>,
      required: true,
    },
    height: {
      type: Number,
      default: 300,
    },
    width: {
      type: Number,
      default: 400,
    },
    margin: {
      type: Number,
      default: 50,
    },
    colorScheme: {
      type: Array as PropType<Array<string>>,
      default: d3.schemeDark2,
    },
  },
  setup(props) {
    const d3el = ref<HTMLDivElement>();

    onMounted(() => {
      if (!d3el.value) {
        return;
      }

      const radius = Math.min(props.width, props.height) / 2 - props.margin;

      const svg = d3
        .select(d3el.value)
        .append("svg")
        .attr("width", props.width)
        .attr("height", props.height)
        .append("g")
        .attr(
          "transform",
          "translate(" + props.width / 2 + "," + props.height / 2 + ")"
        );

      const color = d3
        .scaleOrdinal()
        .domain(Object.keys(props.data))
        .range(props.colorScheme);

      const pie = d3.pie().value((d) => d.valueOf());

      const dataReady = pie(
        Object.entries(props.data).map(([key, value]) => ({
          name: key,
          value: value,
          valueOf() {
            return value;
          },
        }))
      );

      const arc = d3
        .arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius * 0.8);

      const outerArc = d3
        .arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      svg
        .selectAll("allSlices")
        .data(dataReady)
        .enter()
        .append("path")
        // @ts-ignore
        .attr("d", arc)
        // @ts-ignore
        .attr("fill", (d) => color(d.data.name))
        .style("opacity", 0.7);

      svg
        .selectAll("allPolylines")
        .data(dataReady)
        .enter()
        .append("polyline")
        .attr("stroke", "#2c3e50")
        .style("fill", "none")
        .attr("stroke-width", 1)
        // @ts-ignore
        .attr("points", (d) => {
          // @ts-ignore
          const posA = arc.centroid(d); // line insertion in the slice
          // @ts-ignore
          const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
          // @ts-ignore
          const posC = outerArc.centroid(d); // Label position = almost the same as posB
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
          return [posA, posB, posC];
        });

      svg
        .selectAll("allLabels")
        .data(dataReady)
        .enter()
        .append("text")
        // @ts-ignore
        .text((d) => `${d.data.name}: ${d.data.value}`)
        .attr("fill", "#2c3e50")
        .attr("font-family", "Avenir, Helvetica, Arial, sans-serif")
        .attr("transform", (d) => {
          // @ts-ignore
          const pos = outerArc.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          pos[1] = pos[1] + 3;
          return "translate(" + pos + ")";
        })
        .style("text-anchor", (d) => {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? "start" : "end";
        });
    });

    return { d3el };
  },
});
</script>
