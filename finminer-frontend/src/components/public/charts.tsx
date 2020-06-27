/**
 * echarts模块
 * @author Alexchanchic
 * @data 2020.06.09
 */
import * as React from "react";
import ReactEcharts from "echarts-for-react";
import {StockKLineResponse} from "../../api/interfaces/response/stock/StockResponse";
import {loadingOpt} from "../charts/chartsOpt";


export function Candlestick(klineData: StockKLineResponse[]) {

  klineData.forEach(item => item.date = item.date.split("T")[0]);
  let rawData = klineData;

  function calculateMA(dayCount: number, data: Array<Array<number>>) {
    let result = [];
    for (let i = 0, len = data.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-");
        continue;
      }
      let sum = 0;
      for (let j = 0; j < dayCount; j++) {
        sum += data[i - j][1];
      }
      result.push(sum / dayCount);
    }
    return result;
  }

  let dates = rawData.map(function (item: StockKLineResponse) {
    return item.date;
  });

  let data = rawData.map(function (item) {
    return [item.open, item.close, item.high, item.low];
  });

  let option = {
    backgroundColor: "transparent",
    legend: {
      data: ["日K", "MA5", "MA10", "MA20", "MA30"],
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
      data: dates,
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
        data: data,
        itemStyle: {
          color: "#FD1050",
          color0: "#0CF49B",
          borderColor: "#FD1050",
          borderColor0: "#0CF49B"
        }
      },
      {
        name: "MA5",
        type: "line",
        data: calculateMA(5, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1
        }
      },
      {
        name: "MA10",
        type: "line",
        data: calculateMA(10, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1
        }
      },
      {
        name: "MA20",
        type: "line",
        data: calculateMA(20, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1
        }
      },
      {
        name: "MA30",
        type: "line",
        data: calculateMA(30, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1
        }
      }
    ]
  };
  return (
      // @ts-ignore
      <ReactEcharts option={option}
                    showLoading={klineData.length === 0}
                    loadingOption={loadingOpt}
                    style={{
                      height: "calc( 100vh - 200px)"
                    }} />
  );
}


// export function ECharts() {
//   const dataAxis = ["10,20", "10.21", "10.22", "10,20", "10.21", "10.22", "10,20", "10.21", "10.22", "10,20", "10.21", "10.22", "10,20", "10.21", "10.22", "10,20", "10.21", "10.22"];
//   const chartsCost = [100, 200, 300, 500, 100, 800, 100, 200, 300, 500, 100, 800, 100, 200, 300, 500, 100, 800];
//   const option = {
//     dataZoom: [
//       {
//         type: "inside",
//       },
//     ],
//     grid: {},
//     series: [
//       {
//         animation: false,
//         barCategoryGap: "40%",
//         barGap: "-100%",
//         data: dataAxis,
//         itemStyle: {
//           normal: {color: "#000"},
//         },
//         type: "bar",
//       },
//       {
//         data: chartsCost,
//         itemStyle: {
//           emphasis: {
//             barBorderRadius: 20,
//             // @ts-ignore
//             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//               {offset: 0, color: "rgba(215,59,255,1)"},
//               {offset: 0.5, color: "rgba(66,70,175,1)"},
//             ]),
//           },
//           normal: {
//             barBorderRadius: [3, 3, 0, 0],
//             // @ts-ignore
//             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//               {offset: 0, color: "rgba(215,59,255,1)"},
//               {offset: 0.6, color: "rgba(66,70,175,1)"},
//             ]),
//           },
//         },
//         type: "bar",
//       },
//     ],
//     xAxis: {
//       axisLabel: {
//         textStyle: {
//           color: "rgba(136,58,253,1)",
//         },
//       },
//
//       axisLine: {
//         show: true,
//       },
//       axisTick: {
//         show: true,
//       },
//       data: dataAxis,
//       name: "日期",
//       nameTextStyle: {
//         color: "rgba(136,58,253,1)",
//       },
//       z: 10,
//     },
//     yAxis: {
//       axisLabel: {
//         textStyle: {
//           color: "rgba(136,58,253,1)",
//         },
//       },
//       axisLine: {
//         show: false,
//       },
//       axisTick: {
//         show: false,
//       },
//       name: "投放额",
//       nameTextStyle: {
//         color: "rgba(136,58,253,1)",
//       },
//       splitLine: {
//         lineStyle: {
//           color: "rgba(136,58,253,.2)",
//         },
//         show: true,
//       },
//     },
//   };
//   return (
//       // @ts-ignore
//       <ReactEcharts option={option} />
//   );
// }
