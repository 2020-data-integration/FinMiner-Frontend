import React from "react";
import {GeoChart} from "../components/charts/GeoChart";
import {apiGetGdp} from "../api/index.api";

class Charts extends React.Component {

  state = {
    gdpData: []
  };

  componentDidMount() {
    this.getGdpData();
  }

  async getGdpData() {
    const res = await apiGetGdp();
    this.setState({
      gdpData: res.data.filter(d => d.value !== 0)
          .map(d => Object({name: d.name, value: Math.trunc(d.value)}))
    }, () => console.log(this.state.gdpData));
  }

  render() {
    return (
        <div>
          {GeoChart(this.state.gdpData)}
        </div>
    );
  }

}

export default Charts;
