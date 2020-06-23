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
    console.log("fgds",nodeId,category)
    const res = await apiGetStockNetworkById(nodeId, category);
    const nodes = this.state.nodes;
    const links = this.state.links;
    nodes.push(...res.data.nodes);
    links.push(...res.data.links);
    let Nodes=[];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        if(nodes[i].category===nodes[j].category&&nodes[i].id===nodes[j].id&&nodes[i].name===nodes[j].name){
          ++i;
        }
      }
      Nodes.push(nodes[i]);
    }
    let Link=[];
    for (let i = 0; i < links.length; i++) {
      for (let j = i+1; j < links.length; j++) {
        if(links[i].source===links[j].source&&links[i].target===links[j].target&&links[i].value===links[j].value){
          ++i;
        }
      }
      Link.push(links[i]);
    }
    console.log(Nodes)
    console.log(Link)
    this.setState({
      nodes: Nodes,
      links: Link,
      loading: false
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
