import ReactEcharts from "echarts-for-react";
import {loadingOpt} from "./chartsOpt";
import * as React from "react";



export function CandlestickDefenceChart(rawData: Array<Array<any>>,defensePoint?:Array<Array<any>>,buyPoint?: Array<Array<any>>,sellPoint?:Array<Array<any>>){


  let option = {
    backgroundColor: "transparent",
    legend: {
      data: ["日K"],
      inactiveColor: "#777",
      textStyle: {
        color: "#fff"
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        animation: false,
        type: "cross",
        lineStyle: {
          color: "#376df4",
          width: 2,
          opacity: 1
        }
      }
    },
    xAxis: {
      type: "category",
      data: rawData.map(item=>item[0]),
      axisLine: {lineStyle: {color: "#8392A5"}}
    },
    yAxis: {
      scale: true,
      axisLine: {lineStyle: {color: "#8392A5"}},
      splitLine: {show: false}
    },
    grid: {
      bottom: 80
    },
    dataZoom: [{
      textStyle: {
        color: "#8392A5"
      },
      handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
      handleSize: "80%",
      dataBackground: {
        areaStyle: {
          color: "#8392A5"
        },
        lineStyle: {
          opacity: 0.8,
          color: "#8392A5"
        }
      },
      handleStyle: {
        color: "#fff",
        shadowBlur: 3,
        shadowColor: "rgba(0, 0, 0, 0.6)",
        shadowOffsetX: 2,
        shadowOffsetY: 2
      }
    }, {
      type: "inside"
    }],
    animation: false,
    series: [
      {
        type: "candlestick",
        name: "日K",
        data: rawData,
        itemStyle: {
          color: "#FD1050",
          color0: "#0CF49B",
          borderColor: "#FD1050",
          borderColor0: "#0CF49B"
        },
        markPoint: {
          label: {
            normal: {
              formatter: function (param: any) {
                return param != null ? Math.round(param.value) : "";
              }
            }
          },
          tooltip: {
            formatter: function (param: any) {
              return param.name + "<br>" + (param.data.coord || "");
            }
          },
          data: [
            {
              name: "XX标点",
              coord: ["2016-5-31", 10.55],
              itemStyle: {
                color: "rgb(41,60,85)"
              }
            }
          ]
        }
      }
    ]
  };
  return (
      // @ts-ignore
      <ReactEcharts option={option}
                    showLoading={rawData.length === 0}
                    loadingOption={loadingOpt}
                   />
  );
}
