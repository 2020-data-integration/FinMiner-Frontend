import React from "react";
import "../App.css";
import StockAbstractListComp from "../components/stock/StockAbrstractListComp";


class Dashboard extends React.Component {




  render() {
    // const {stockList} = this.state as PageDashboardInterface;
    return (
        <div>
          {/*{stockList.map((stock: { companyName: string }) =>*/}
          {/*<div>{stock.companyName}</div>)*/}
          {/*}*/}
          <StockAbstractListComp/>
        </div>

    );

  }
}

export default Dashboard;
