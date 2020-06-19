import ReactEcharts from "echarts-for-react";
import * as React from "react";
import {link, node} from "../../api/interfaces/response/stock/StockResponse";
import {chartsHeight, loadingOpt} from "./chartsOpt";

export function NetworkChart(nodes: node[], links: link[]) {
  const categories = [
    {
      name: "Company",
      itemStyle: {
        normal: {
          color: "#c489e6"
        }
      },
      symbolSize:50
    }, {
      name: "Holder",
      itemStyle: {
        normal: {
          color: "#148b96"
        }
      },
      symbolSize:45

    }, {
      name: "Manager",
      itemStyle: {
        normal: {
          color: "#BC8F8F"
        }
      },
      symbolSize:40

    }, {
      name: "Concept",
      itemStyle: {
        normal: {
          color: "#72d5c3"
        }
      },
      symbolSize:35
    }];

  const option = {
    title: {
      text: ""
    },
    tooltip: {},
    legend: {
      y: "5%",
      textStyle: {
        fontSize: 18,//字体大小
        color: "#ffffff"//字体颜色
      },
      data: categories.map(function (a) {//显示策略
        return a.name;
      })
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: "quinticInOut",
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
        type: "graph",
        layout: "force",
        layoutAnimation: false, // 因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
        focusNodeAdjacency: true,
        roam: true,
        draggable: true,
        categories: categories,
        edgeSymbol: ["none", "arrow"],
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
          position: "right"
        },
        itemStyle: {
          borderColor: "#fff", // 节点边框背景色白色
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)"
        },
        data: nodes,
        links: links,
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 1,
            curveness: 0.3,
            color: "source"
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
      <ReactEcharts option={option} showLoading={nodes.length===0} loadingOption={loadingOpt} style={chartsHeight}/>
  );
}
