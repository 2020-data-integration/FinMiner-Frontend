import React from "react";
import {GeoChart} from "../components/charts/GeoChart";
import {apiGetCompanyRankByArea, apiGetGdp} from "../api/index.api";
import {Drawer, Spin} from "antd";
import {CompanyResponse} from "../api/interfaces/response/stock/StockResponse";

class Charts extends React.Component {

  state = {
    gdpData: [],
    showDrawer: false,
    selectedArea: "",
    companyRanks: [] as CompanyResponse[]
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

  async getCompanyRankByArea() {
    const res = await apiGetCompanyRankByArea(this.state.selectedArea);
    this.setState({
      companyRanks: res.data
    });
  }

  openDrawer = (area: string) => {
    console.log(area);
    this.setState({
      showDrawer: true,
      selectedArea: area
    });
    this.getCompanyRankByArea();
  };

  closeDrawer = () => {
    this.setState({
      showDrawer: false
    });
  };

  render() {
    return (
        <div>
          {this.state.gdpData.length === 0 ? <Spin /> :
              <GeoChart data={this.state.gdpData} showCompanyRank={this.openDrawer} />
          }
          <Drawer visible={this.state.showDrawer} closable={false} onClose={this.closeDrawer}>
            {this.state.companyRanks.map((info) => info.companyName)}
          </Drawer>
        </div>
    );
  }

}

export default Charts;
