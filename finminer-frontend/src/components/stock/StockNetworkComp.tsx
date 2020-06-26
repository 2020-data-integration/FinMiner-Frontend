import * as React from "react";
import {withRouter} from "react-router-dom";
import {NetworkChart} from "../charts/NetworkChart";
import {apiGetStockNetworkById} from "../../api/index.api";
import {link, node, NodeCategory} from "../../api/interfaces/response/stock/StockResponse";
import ReactEcharts from "echarts-for-react";
import {categories} from "../charts/NetworkChart";
import {loadingOpt} from "../charts/chartsOpt";
import {Divider} from "antd";


export class StockNetworkComp extends React.Component<any, any> {
  state = {
    companyId: this.props.location.pathname.split("/")[2],
    category: 0 as NodeCategory,
    nodes: [] as node[],
    links: [] as link[],
    loading: true,
    source: []
  };

  async getStockNetworkData(nodeId: string, category: NodeCategory) {
    const res = await apiGetStockNetworkById(nodeId, category);
    const nodes = res.data.nodes;
    const links = res.data.links;
    let Nodes = this.state.nodes;
    let Links = this.state.links;
    for (let j = 0; j < nodes.length; j++) {
      if (JSON.stringify(Nodes).indexOf(JSON.stringify(nodes[j])) === -1) {
        Nodes.push(nodes[j]); // 进行动态的操作
      }
    }
    for (let i = 0; i < links.length; i++) {
      if (JSON.stringify(Links).indexOf(JSON.stringify(links[i])) === -1) {
        Links.push(links[i]); // 进行动态的操作
      }
    }
    this.setState({
      nodes: Nodes,
      links: Links,
      loading: false,
      source: res.source
    });
  }


  updateNetworkData = (nodeId: string, category: NodeCategory) => {
    this.setState({
          loading: true
        }, () => this.getStockNetworkData(nodeId, category)
    );
  };

  componentDidMount(): void {
    this.getStockNetworkData(this.state.companyId, this.state.category);
  }
  getSource = (Source: string[]) => {
    let titlehtml = ''  //输出title
    titlehtml += Source.map(function(item){
      return   item
    }).join(' , ')
    return (
        <Divider orientation="center" >
          {"数据来源："+titlehtml}
        </Divider>
    );
  };

  render(): React.ReactNode {
    return (
        <div id="charts">
            <div id="myChart" >
          {this.state.loading ?
              // @ts-ignore
              <ReactEcharts option={{series: [{type: "graph", category: categories}]}} showLoading={true}
                            loadingOption={loadingOpt} /> :
              <NetworkChart loading={this.state.loading} nodes={this.state.nodes} links={this.state.links}
                            updateNetworkData={this.updateNetworkData} />

          }
              {this.getSource(this.state.source)}
            </div>
        </div>
    );

  }
}

export default withRouter(StockNetworkComp);
