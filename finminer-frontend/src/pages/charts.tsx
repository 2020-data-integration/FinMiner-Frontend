import React from "react";
import {GeoChart} from "../components/charts/GeoChart";
import {apiGetCompanyRankByArea, apiGetGdp} from "../api/index.api";
import {Drawer, Spin, List, Avatar, Statistic, Descriptions} from "antd";
import {CompanyResponse} from "../api/interfaces/response/stock/StockResponse";
import {rankStyle, valueStyle} from "../utils/valueStyle";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons/lib";

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
        <Descriptions column={4} style={{marginLeft: "30px"}}>
          <Descriptions.Item span={2}> <Statistic title={"总资产"}
                                                  value={info.total_asset === 0 ? "暂无数据" : info.total_asset}
                                                  valueStyle={{fontSize: "15px"}}
          /></Descriptions.Item>
          <Descriptions.Item> <Statistic title={"股价"} value={info.close}
                                         valueStyle={{fontSize: "15px"}}

          /></Descriptions.Item>

          <Descriptions.Item> <Statistic title={"涨跌幅"}
                                         valueStyle={{fontSize: "15px", color: valueStyle(info.pct_chg).color}}
                                         suffix={info.pct_chg === 0 ? "" : info.pct_chg > 0 ?
                                             <ArrowUpOutlined /> :
                                             <ArrowDownOutlined />}
                                         value={info.pct_chg}

          /></Descriptions.Item>
        </Descriptions>
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
