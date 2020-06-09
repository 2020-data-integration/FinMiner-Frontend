import React from "react";
import {Candlestick, ECharts} from "../components/public/charts";

class Charts extends React.Component {

  render() {
    return (
      <div>
        <ECharts />
        <Candlestick />
      </div>
    );
  }

}

export default Charts;
