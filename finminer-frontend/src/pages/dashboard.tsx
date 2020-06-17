import React from "react";
import "../App.css";
import {StockAbstractListComp} from "../components/stock/StockAbrstractListComp";
import {apiGetStockList} from "../api/index.api";


class Dashboard extends React.Component {
  componentDidMount() {
    const res = apiGetStockList();
    res.then((data) => {
      console.log(data);
      this.setState({
        stockList: data.data
      });
    });
  }

  public state = {
    stockList: []
  };


  render() {
    // const {stockList} = this.state as PageDashboardInterface;
    return (
        <div>
          {/*{stockList.map((stock: { companyName: string }) =>*/}
          {/*<div>{stock.companyName}</div>)*/}
          {/*}*/}
          <StockAbstractListComp />
        </div>

    );

  }
}

export default Dashboard;
