import * as React from "react";
import {withRouter} from "react-router-dom";
import {Candlestick} from "../public/charts";
import {apiGetStockKLineById} from "../../api/index.api";
import {StockKLineResponse} from "../../api/interfaces/response/stock/StockResponse";
import {Descriptions, Divider, Typography} from "antd";
const {Paragraph} = Typography;

class StockCandlestickComp extends React.Component<any, any> {
  state = {
    companyId: this.props.location.pathname.split("/")[2],
    candlestickData: [] as StockKLineResponse[],
    source: []
  };

  async getStockKLineData(companyId: string) {
    const res = await apiGetStockKLineById(companyId);
    console.log(res)
    this.setState({
      candlestickData: res.data,
      source: res.source
    });
  };
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
  componentDidMount(): void {
    this.getStockKLineData(this.state.companyId);
  }

  render(): React.ReactNode {
    return (
        <div>
          {Candlestick(this.state.candlestickData)}
          {this.getSource(this.state.source)}
        </div>)

  }
}

export default withRouter(StockCandlestickComp);
