import * as React from "react";
import * as echarts from "echarts";
import {link, node} from "../../api/interfaces/response/stock/StockResponse";
import {chartsHeight} from "./chartsOpt";
import ReactEcharts from "echarts-for-react";


export const categories = [
  {
    name: "Company",
    itemStyle: {
      normal: {
        color: "#c489e6"
      }
    },
    symbolSize: 50
  }, {
    name: "Holder",
    itemStyle: {
      normal: {
        color: "#148b96"
      }
    },
    symbolSize: 45

  }, {
    name: "Manager",
    itemStyle: {
      normal: {
        color: "#BC8F8F"
      }
    },
    symbolSize: 40

  }, {
    name: "Concept",
    itemStyle: {
      normal: {
        color: "#CDBE70"
      }
    },
    symbolSize: 35
  }];

interface Network {
  nodes: node[],
  links: link[],
  updateNetworkData: Function,
  loading: Boolean
}


export class NetworkChart extends React.Component<Network, any> {
  private chartRef: any;
  constructor(props: Network) {
    super(props);
  }

  option = {
    title: {
      text: ""
    },
    tooltip: {},
    legend: {
      textStyle: {
        fontSize: 10,//字体大小
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
        force: {
          gravity: 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
          edgeLength: 80,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
          repulsion: 500,
          layoutAnimation: false
        },
        focusNodeAdjacency: true,
        roam: true,
        draggable: true,
        categories: categories,
        edgeSymbol: ["none", "arrow"],
        edgeSymbolSize: [1, 10],
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
        data: this.props.nodes,
        links: this.props.links,
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

  componentDidMount(): void {
    let echartsInstance = this.chartRef.getEchartsInstance();
    // @ts-ignore
    // echarts点击事件，通过向父组件传递参数来更新数据，从而更新视图
    echartsInstance.on("click", (params: any) => {
      console.log(params);
      this.props.updateNetworkData(params.data.id, params.data.category);
    });
  }


  render(): React.ReactNode {
    return (
        // @ts-ignore
        <ReactEcharts option={this.option}
                      ref={(e) => {this.chartRef = e;}}
                      style={chartsHeight}
        />
    );
  }


}
