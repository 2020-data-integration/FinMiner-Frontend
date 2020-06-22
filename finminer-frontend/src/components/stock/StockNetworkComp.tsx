import * as React from "react";
import {withRouter} from "react-router-dom";
import {NetworkChart} from "../charts/NetworkChart";
import {apiGetStockNetworkById} from "../../api/index.api";
import {link, node, NodeCategory} from "../../api/interfaces/response/stock/StockResponse";


export class StockNetworkComp extends React.Component<any, any> {
  state = {
    companyId: this.props.location.pathname.split("/")[2],
    category: 0 as NodeCategory,
    nodes: [] as node[],
    links: [] as link[]
  };

  async getStockNetworkData(nodeId: string, category: NodeCategory) {
    const res = await apiGetStockNetworkById(nodeId, category);
    const nodes = this.state.nodes;
    const links = this.state.links;
    nodes.push(...res.data.nodes);
    links.push(...res.data.links);
    this.setState({
      nodes: res.data.nodes,
      links: res.data.links
    });
  }



  componentDidMount(): void {
    this.getStockNetworkData(this.state.companyId, this.state.category);
  }


  render(): React.ReactNode {
    return (
        <div>
          {NetworkChart(this.state.nodes, this.state.links,this.getStockNetworkData)}
        </div>
    );

  }
}

export default withRouter(StockNetworkComp);
