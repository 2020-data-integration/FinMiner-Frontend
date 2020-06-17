import React from "react";
import {Candlestick, ECharts, GeoChart} from "../components/public/charts";
import {apiGetStockKLineById} from "../api/index.api";

class Charts extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      kLineData: []
    };
  }

  componentDidMount() {
    this.getStockKLineData();
  }

  async getStockKLineData() {
    const res = await apiGetStockKLineById("000001.SZ");
    this.setState({
      kLineData: res.data
    });
    console.log(res.data);

  };

  render() {
    return (
      <div>
        <GeoChart />
        <ECharts />
        {Candlestick(this.state.kLineData)}
      </div>
    );
  }

}

export default Charts;
