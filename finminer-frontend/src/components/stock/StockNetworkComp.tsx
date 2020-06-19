import * as React from "react";
import {withRouter} from "react-router-dom";
import {NetworkChart} from "../charts/NetworkChart";
import {apiGetStockNetworkById} from "../../api/index.api";
import {link, node} from "../../api/interfaces/response/stock/StockResponse";


export class StockNetworkComp extends React.Component<any, any> {
  state = {
    companyId: this.props.location.pathname.split("/")[2],
    nodes: [] as node[],
    links: [] as link[]
  };

  async getStockNetworkData(companyId: string) {
    const res = await apiGetStockNetworkById(companyId);
    this.setState({
      nodes: res.data.nodes,
      links: res.data.links
    });
  }

  componentDidMount(): void {
    this.getStockNetworkData(this.state.companyId);
  }

  render(): React.ReactNode {
    return (
        <div>
          {NetworkChart(this.state.nodes, this.state.links)}
        </div>
    );

  }
}

export default withRouter(StockNetworkComp);
