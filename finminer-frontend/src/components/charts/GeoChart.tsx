import * as echarts from "echarts";
import geojson from "../../utils/geojson.json";
import * as React from "react";
import {GdpResponse} from "../../api/interfaces/response/stock/StockResponse";
import {loadingOpt} from "./chartsOpt";
import ReactEcharts from "echarts-for-react";


interface Geo {
  data: GdpResponse[],
  showCompanyRank: Function,
  openDrawer: Boolean
}

export class GeoChart extends React.Component<Geo, any> {
  private chartRef: any;

  option = {
    title: {
      text: "中国各省GDP",
      subtext: "点击查看各省上市企业排名",
      left: "center",
      textStyle: {
        color: "#92d0c0"
      }
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
      min: this.props.data.length === 0 ? 500 : Math.min.call(null, ...this.props.data.map(d => d.value)),
      max: this.props.data.length === 0 ? 5000 : Math.max.call(null, ...this.props.data.map(d => d.value)),
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
        data: this.props.data
      }
    ]
  };

  componentDidMount(): void {
    // @ts-ignore
    let echartsInstance = this.chartRef.getEchartsInstance();
    echarts.registerMap("China", geojson);
    echartsInstance.on("click", (params: any) => {
      if (params.data !== undefined) {
        this.props.showCompanyRank(params.data.name);
      }
    });
  }

  render(): React.ReactNode {
    return (
        // @ts-ignore
        <ReactEcharts option={this.option}
                      ref={(e) => {
                        this.chartRef = e;
                      }}
                      showLoading={this.props.data.length === 0}
                      loadingOption={loadingOpt}
                      style={this.props.openDrawer ? {
                        "width": "60vw",
                        "height": "calc(100vh - 84px)"
                      } : {"height": "calc(100vh - 84px)"}}
        />
        //<ReactEcharts option={option} showLoading={data.length === 0} loadingOption={loadingOpt}
        //              style={{"height": "calc(100vh - 64px)"}} />
    );
  }

}
