import React from "react";
import {Candlestick, ECharts, GeoChart, MapChart} from "../components/public/charts";

class Charts extends React.Component {

  render() {
    return (
      <div>
        <GeoChart />
        <ECharts />
        <Candlestick />
        <MapChart/>
      </div>
    );
  }

}

export default Charts;
