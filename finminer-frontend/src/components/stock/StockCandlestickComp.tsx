import * as React from "react";
import {withRouter} from "react-router-dom";
import {Candlestick} from "../public/charts";
import {apiGetStockKLineById} from "../../api/index.api";
import {StockKLineResponse} from "../../api/interfaces/response/stock/StockResponse";

class StockCandlestickComp extends React.Component<any, any> {
  state = {
    companyId: this.props.location.pathname.split("/")[2],
    candlestickData: [] as StockKLineResponse[]
  };

  async getStockKLineData(companyId: string) {
    const res = await apiGetStockKLineById(companyId);
    this.setState({
      candlestickData: res.data
    });
  };

  componentDidMount(): void {
    this.getStockKLineData(this.state.companyId);
  }

  render(): React.ReactNode {
    return (
        <div>
          {Candlestick(this.state.candlestickData)}
        </div>)

  }
}

export default withRouter(StockCandlestickComp);
