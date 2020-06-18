import * as echarts from "echarts";
import geojson from "../../utils/geojson.json";
import ReactEcharts from "echarts-for-react";
import * as React from "react";

export function GeoChart() {
  echarts.registerMap("China", geojson);
  console.log(geojson.features.map((feature) => (
      {
        name: feature.properties.name,
        value: Math.round(Math.random() * 1000)
      }
  )));
  const option = {
    title: {
      text: "中国各省GDP",
      subtext: "数据来源：中国国家统计局",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}<br/>{c}"
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    visualMap: {
      min: 50,
      max: 1000,
      text: ["High", "Low"],
      realtime: false,
      calculable: true,
      inRange: {
        color: ["#01262f", "#148b96", "#11edf3", "#72d5c3"]
      }
    },
    series: [
      {
        name: "中国各省GDP",
        type: "map",
        mapType: "China", // 自定义扩展图表类型
        label: {
          show: false
        },
        emphasis: {
          label: {
            color: "#01262f"
          },
          itemStyle: {
            areaColor: "#b2ffeb"
          }
        },
        data: geojson.features.map((feature) => (
            {
              name: feature.properties.name,
              value: Math.round(Math.random() * 1000)
            }
        ))
      }
    ]
  };
  return (
      // @ts-ignore
      <ReactEcharts option={option} style={{"height": 'calc(100vh - 64px)'}} />
);
}
