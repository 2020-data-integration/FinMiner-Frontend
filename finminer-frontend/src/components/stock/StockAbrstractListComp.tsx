/**
 * 数据面板
 * @author Alexchanchic
 * @date 2020.03.21
 */
import {StockAbstractResponse, StockInfoResponse} from "../../api/interfaces/response/stock/StockResponse";
import * as React from "react";

import {Menu, Button} from "antd";
import {apiGetStockAbstract} from "../../api/index.api";

export class StockAbstractListComp extends React.Component {
  state = {
    isCollapsed: false,
    selectedStock: "",

    page: 1,
    source: "",
    stockAbstractList: Array(20).fill({
      companyId: "00001.SZ",
      industry: "平安银行",
      open: 12.88,
      close: 12.97,
      high: 13.07,
      low: 12.7,
      change: 0.26,
      vol: 1136957.74,
      amount: 1467534.945
    }) as StockAbstractResponse[]
  };

  // 折叠、展开数据面板
  toggleCollapsed = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  };

  // 增量更新数据面板数据
  getStockAbstractData = () => {
    // apiGetStockAbstract(this.state.page, 10).then((stockAbstractRes) =>
    //     this.setState({
    //       source: stockAbstractRes.source,
    //       stockAbstractList: this.state.stockAbstractList.push(...stockAbstractRes.data)
    //     })
    // );
    console.log(this.state.stockAbstractList);

  };


  // 单个股票的数据面板组件
  getStockAbstractComp = (props: StockAbstractResponse) => {
    return (
        <Menu.Item title={"平安银行"}>{props.companyId}
        </Menu.Item>
    );
  };


  componentWillMount(): void {
    this.getStockAbstractData();
  }

  render(): React.ReactNode {
    return (
        <div style={{width: "100vw"}}>
          <Button type="primary" onClick={this.toggleCollapsed} style={{marginBottom: 16}}>
            {this.state.isCollapsed ? <div>展开</div> : <div>收起</div>}
          </Button>
          <Menu
              mode={"inline"}
              inlineCollapsed={this.state.isCollapsed}>{this.state.stockAbstractList.map(stock => this.getStockAbstractComp(stock))}
          </Menu>
        </div>
    );
  }


}

