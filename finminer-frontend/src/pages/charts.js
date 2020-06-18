import React from "react";
import {GeoChart} from "../components/charts/GeoChart";
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
      </div>
    );
  }

}

export default Charts;
