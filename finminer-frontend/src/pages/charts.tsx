import React from "react";
import {GeoChart} from "../components/charts/GeoChart";
import {apiGetCompanyRankByArea, apiGetGdp} from "../api/index.api";
import {Drawer, Spin, List, Avatar, Statistic} from "antd";
import {CompanyResponse} from "../api/interfaces/response/stock/StockResponse";
import {rankStyle} from "../utils/valueStyle";

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

  getCompanyList = (info: CompanyResponse, index: number) => (
      <List.Item>
        <List.Item.Meta avatar={<Avatar size={"small"}
                                        style={{
                                          backgroundColor: rankStyle(index)[0],
                                          color: rankStyle(index)[1],
                                          borderColor: rankStyle(index)[2]
                                        }}>{index + 1}</Avatar>}
                        title={info.companyId}
                        description={info.companyName}
        />
        <Statistic title={"总资产"} value={info.total_asset} />
        <Statistic title={"股价"} value={info.close} />
      </List.Item>
  );

  render() {
    return (
        <div>
          {this.state.gdpData.length === 0 ? <Spin /> :
              <GeoChart data={this.state.gdpData}
                        showCompanyRank={this.openDrawer}
                        openDrawer={this.state.showDrawer}
              />
          }
          <Drawer
              title={this.state.selectedArea + " 上市公司排名"}
              visible={this.state.showDrawer}
              closable={false}
              onClose={this.closeDrawer}
              width={"40vw"}
          >
            <List>
              {this.state.companyRanks.map((info, index) => this.getCompanyList(info, index)
              )}
            </List>
          </Drawer>
        </div>
    );
  }

}

export default Charts;
