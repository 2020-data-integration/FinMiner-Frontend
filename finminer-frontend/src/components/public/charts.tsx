/**
 * echarts模块
 * @author Alexchanchic
 * @data 2020.06.09
 */
import * as React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import {geojson} from "../../utils/geojson";
import {kline} from "../../utils/kline";


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

export function Candlestick() {
  let rawData = kline;

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


  let dates = rawData.map(function (item) {
    return item[0];
  });

  let data = rawData.map(function (item) {
    return [+item[1], +item[2], +item[5], +item[6]];
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
      <ReactEcharts option={option} />
  );
}

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
      <ReactEcharts option={option} style={{"height": 600}} />
  );
}

export function MapChart() {
    var nodes = []
    var links = []
    nodes=[
        {category:0, id:'1',name: '平安银行'},
        {category:0,id:'2', name: '交通银行'},
        {category:0,id:'3', name: '联邦集团'},
        {category:1, id:'4',name: '比尔-盖茨'},
        {category:2,id:'5', name: '比尔-盖茨'},
        {category:2,id:'6', name: '比尔-盖茨'},
        {category:2, id:'7',name: '比尔-盖茨'},
        {category:2,id:'8', name: '乔纳森-艾夫'},
        {category:3,id:'9', name: '阿一古'}
    ]
    links=[
            {source : '4', target : '1',value :'hold_stock'},
            {source : '5', target : '1',value :'work_in'},
            {source : '6', target : '1',value :'work_in'},
            {source : '7', target : '1',value :'work_in'},
            {source : '8', target : '1',value:'work_in'},
            {source : '2', target : '1',value:'hold_stock'},
            {source : '2', target : '3',value:'hold_stock'},
            {source : '9', target : '3',value:'hold_stock'},
        ]
    const categories= [
        {
            name: 'Company',
            itemStyle: {
                normal: {
                    color: '#c489e6'
                }
            },
            symbolSize:50
        }, {
            name: 'Holder',
            itemStyle: {
                normal: {
                    color: "#148b96"
                }
            },
            symbolSize:45
        }, {
            name: 'Manager',
            itemStyle: {
                normal: {
                    color: '#BC8F8F'
                }
            },
            symbolSize:40
        }, {
            name: 'Concept',
            itemStyle: {
                normal: {
                    color: '#72d5c3'
                }
            },
            symbolSize:35
        }]

   const option = {
        title: {
            text: ''
        },
        tooltip: {

        },
       legend: {
           y:'5%',
           textStyle:{
               fontSize: 18,//字体大小
               color: '#ffffff'//字体颜色
           },
           data: categories.map(function (a) {//显示策略
               return a.name;
           })
       },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        label: {
            normal: {
                show: true,
                textStyle: {
                    fontSize: 12
                }
            }
        },
        series: [
            {
                type: 'graph',
                layout: 'force',
                focusNodeAdjacency: true,
                roam: true,
                draggable: true,
                categories: categories,
                edgeSymbol: ['none','arrow'],
                edgeSymbolSize: [1, 10],
                force: {
                    repulsion: 2500,
                    edgeLength: [10, 50]
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 12
                        }
                    },
                    position: 'right'
                },
                itemStyle: {
                    borderColor: '#fff', // 节点边框背景色白色
                    borderWidth: 1,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                },
                data: nodes,
                links: links,
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 1,
                        curveness: 0.3,
                        color: 'source'
                    }
                },
                emphasis: { // 高亮的图形样式
                    lineStyle: {
                        width: 5
                    }
                }
            }
        ]

    };
    return (
        // @ts-ignore
        <ReactEcharts option={option} style={{"height": 600}} />
    );
}

