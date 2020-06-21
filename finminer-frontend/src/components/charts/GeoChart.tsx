import * as echarts from "echarts";
import geojson from "../../utils/geojson.json";
import ReactEcharts from "echarts-for-react";
import * as React from "react";
import {GdpResponse} from "../../api/interfaces/response/stock/StockResponse";
import {loadingOpt} from "./chartsOpt";

export function GeoChart(data: GdpResponse[]) {
  echarts.registerMap("China", geojson);
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
      min: data.length === 0 ? 500 : Math.min.call(null, ...data.map(d => d.value)),
      max: data.length === 0 ? 5000 : Math.max.call(null, ...data.map(d => d.value)),
      text: ["Max", "Min"],
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
        data: data
      }
    ]
  };
  return (
      // @ts-ignore
      <ReactEcharts option={option} showLoading={data.length === 0} loadingOption={loadingOpt}
                    style={{"height": "calc(100vh - 64px)"}} />
  );
}
