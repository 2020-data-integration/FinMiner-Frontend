import React from "react";
import {Layout, Menu, Statistic, Row, Col, Tabs, Avatar} from "antd";
import {DislikeOutlined, DownOutlined, LikeOutlined} from "@ant-design/icons/lib";
import {SharpResponse} from "../api/interfaces/response/stock/StockResponse";
import {apiGetCompanyRankBySharp} from "../api/index.api";
import {ClickParam} from "antd/es/menu";
import StockDefenceComp from "../components/stock/StockDefenceComp";
import {rankStyle} from "../utils/valueStyle";

const {Sider, Content} = Layout;

class Defense extends React.Component {
  state = {
    companyRank: [] as SharpResponse[],
    pageNum: 1,
    selectedStock: ""
  };
  pageSize = 15;
  menuWidth = "300px";

  showDetail = (params: ClickParam) => {
    const key = params.key;
    if (key !== "loading-key") {
      this.setState({
            selectedStock: key
          }
      );
    } else {
      this.setState({
        pageNum: this.state.pageNum + 1
      }, () => this.getCompanyRankBySharp(this.state.pageNum, this.pageSize));
    }
  };

  async getCompanyRankBySharp(pageNum: number, pageSize: number) {
    const companyRankList = this.state.companyRank;
    const res = await apiGetCompanyRankBySharp(pageNum, pageSize);
    companyRankList.push(...res.data);
    this.setState({
      companyRank: companyRankList
    });
  }

  componentDidMount(): void {
    this.getCompanyRankBySharp(this.state.pageNum, this.pageSize).then(() => {
      this.setState({
        selectedStock: this.state.companyRank[0].companyId
      }, () => console.log(this.state.selectedStock));
    });
  }


  getDefenceMenu = (companyRank: SharpResponse[]) => {
    return (
        <Menu mode={"inline"}
              onClick={this.showDetail}
              defaultSelectedKeys={[this.state.selectedStock]}
        >
          {companyRank.map((company, index) =>
              <Menu.Item key={company.companyId}
                         style={{
                           height: "100px",
                           width: this.menuWidth,
                           borderBottom: "2px solid #1f1f1f",
                           display: "flex",
                           alignItems: "center",
                           flexDirection: "row"
                         }}
              >
                <Avatar style={{
                  backgroundColor: rankStyle(index)[0],
                  color: rankStyle(index)[1],
                  borderColor: rankStyle(index)[2]
                }}>{index + 1}</Avatar>
                <Statistic style={{marginLeft: "15px"}}
                           title={company.companyName}
                           value={company.companyId}
                           valueStyle={{fontSize: "18px"}}
                />
                <Statistic style={{marginLeft: "15px"}}
                           title={"夏普比率"}
                           precision={2}
                           value={company.recommendIndex}
                           valueStyle={{fontSize: "20px"}}
                />
                <div style={{marginLeft: "15px"}}>
                  {company.shouldBuy ? <LikeOutlined
                      style={{color: "#df1050"}}
                  /> : <DislikeOutlined
                      style={{color: "#04f49b"}}
                  />}
                </div>

              </Menu.Item>
          )}
          <Menu.Item key="loading-key" icon={<DownOutlined />} style={{textAlign: "center"}} />
        </Menu>
    );
  };

  render(): React.ReactNode {
    return (
        <div>
          <Layout>
            <Sider
                width={300}
                style={{
                  overflow: "auto",
                  height: "90vh",
                  position: "fixed",
                  left: 0,
                }}>
              {this.getDefenceMenu(this.state.companyRank)}
            </Sider>
            <Content style={{marginLeft: this.menuWidth, padding: "20px 30px"}}>
              {this.state.selectedStock === "" ? "" : <StockDefenceComp companyId={this.state.selectedStock} />}
            </Content>
          </Layout>
        </div>);
  }

}

export default Defense;
