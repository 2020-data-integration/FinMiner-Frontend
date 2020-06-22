import * as React from "react";
import {withRouter} from "react-router-dom";
import {NetworkChart} from "../charts/NetworkChart";
import {apiGetStockNetworkById} from "../../api/index.api";
import {link, node, NodeCategory} from "../../api/interfaces/response/stock/StockResponse";
import ReactEcharts from "echarts-for-react";
import {categories} from "../charts/NetworkChart";
import {loadingOpt} from "../charts/chartsOpt";


export class StockNetworkComp extends React.Component<any, any> {
  state = {
    companyId: this.props.location.pathname.split("/")[2],
    category: 0 as NodeCategory,
    nodes: [] as node[],
    links: [] as link[],
    loading: true
  };

  async getStockNetworkData(nodeId: string, category: NodeCategory) {
    const res = await apiGetStockNetworkById(nodeId, category);
    const nodes = this.state.nodes;
    const links = this.state.links;
    nodes.push(...res.data.nodes);
    links.push(...res.data.links);
    this.setState({
      nodes: [...new Set(res.data.nodes) as any],
      links: [...new Set(res.data.links) as any],
      loading: false
    });
  }


  updateNetworkData = (nodeId: string, category: NodeCategory) => {
    // TODO 数据更新函数 需要在该函数或者getStockNetworkData函数里实现数据合并
    this.setState({
          loading: true
        }, () => this.getStockNetworkData(nodeId, category)
    );
  };

  componentDidMount(): void {
    this.getStockNetworkData(this.state.companyId, this.state.category);
  }


  render(): React.ReactNode {
    return (
        <div>
          {this.state.loading ?
              // @ts-ignore
              <ReactEcharts option={{series: [{type: "graph", category: categories}]}} showLoading={true}
                            loadingOption={loadingOpt} /> :
              <NetworkChart loading={this.state.loading} nodes={this.state.nodes} links={this.state.links}
                            updateNetworkData={this.updateNetworkData} />}
        </div>
    );

  }
}

export default withRouter(StockNetworkComp);
