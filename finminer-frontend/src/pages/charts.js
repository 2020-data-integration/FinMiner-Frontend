import React from "react";
import {Candlestick, ECharts, GeoChart} from "../components/public/charts";

class Charts extends React.Component {

  render() {
    return (
      <div>
        <GeoChart />
        <ECharts />
        <Candlestick />
      </div>
    );
  }

}

export default Charts;
