import * as React from "react";
import ReactEcharts from "echarts-for-react";

import * as echarts from "echarts";

export function ECharts() {
  const dataAxis = ["10,20", "10.21", "10.22", "10,20", "10.21", "10.22", "10,20", "10.21", "10.22", "10,20", "10.21", "10.22", "10,20", "10.21", "10.22", "10,20", "10.21", "10.22"];
  const chartsCost = [100, 200, 300, 500, 100, 800, 100, 200, 300, 500, 100, 800, 100, 200, 300, 500, 100, 800];
  const option = {
    dataZoom: [
      {
        type: "inside",
      },
    ],
    grid: {},
    series: [
      {
        animation: false,
        barCategoryGap: "40%",
        barGap: "-100%",
        data: dataAxis,
        itemStyle: {
          normal: {color: "#000"},
        },
        type: "bar",
      },
      {
        data: chartsCost,
        itemStyle: {
          emphasis: {
            barBorderRadius: 20,
            // @ts-ignore
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: "rgba(215,59,255,1)"},
              {offset: 0.5, color: "rgba(66,70,175,1)"},
            ]),
          },
          normal: {
            barBorderRadius: [3, 3, 0, 0],
            // @ts-ignore
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: "rgba(215,59,255,1)"},
              {offset: 0.6, color: "rgba(66,70,175,1)"},
            ]),
          },
        },
        type: "bar",
      },
    ],
    xAxis: {
      axisLabel: {
        textStyle: {
          color: "rgba(136,58,253,1)",
        },
      },

      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      data: dataAxis,
      name: "日期",
      nameTextStyle: {
        color: "rgba(136,58,253,1)",
      },
      z: 10,
    },
    yAxis: {
      axisLabel: {
        textStyle: {
          color: "rgba(136,58,253,1)",
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      name: "投放额",
      nameTextStyle: {
        color: "rgba(136,58,253,1)",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(136,58,253,.2)",
        },
        show: true,
      },
    },
  };
  return (
      // @ts-ignore
      <ReactEcharts option={option} />
  );
}
