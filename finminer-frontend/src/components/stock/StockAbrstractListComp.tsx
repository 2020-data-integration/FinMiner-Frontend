/**
 * 数据面板
 * @author Alexchanchic
 * @date 2020.03.21
 */
import {StockAbstractResponse} from "../../api/interfaces/response/stock/StockResponse";
import * as React from "react";

import {Layout, Menu, Breadcrumb} from "antd";
import {apiGetStockAbstract} from "../../api/index.api";
import {ClickParam} from "antd/lib/menu";
import {DownOutlined} from "@ant-design/icons";

const {Header, Sider, Content} = Layout;

export class StockAbstractListComp extends React.Component {
  state = {
    isCollapsed: false,
    selectedStock: "",
    pageNum: 1,
    stockList: [] as StockAbstractResponse[]
  };
  pageSize = 15;
  // 折叠、展开数据面板
  shrinkCollapsed = () => {
    this.setState({
      isCollapsed: true
    });

  };
  expandCollapsed = () => {
    this.setState({
      isCollapsed: false
    });
  };

  // 增量更新数据面板数据
  async getStockAbstractData(pageNum: number, pageSize: number) {
    const res = await apiGetStockAbstract(pageNum, pageSize);
    this.state.stockList.push(...res.data);
    console.log(this.state.stockList);
    console.log(this.state.pageNum);
  }

  // 点开某支股票后展示数据渲染详情
  showDetail = (param: ClickParam) => {
    const key = param.key;
    if (key !== "loading-key") {
      if (!this.state.isCollapsed) {
        this.shrinkCollapsed();
      }
      this.setState({
        selectedStock: key
      });
    } else {
      this.setState({
        pageNum: this.state.pageNum + 1
      });
      this.getStockAbstractData(this.state.pageNum, this.pageSize);
    }

  };
  // 单个股票的数据面板组件
  getStockAbstractComp = (props: StockAbstractResponse) => {
    return (
        <Menu.Item key={props.companyId}
                   title={<div>title</div>}>
          <div>
            {props.companyId}{props.companyName}
          </div>
        </Menu.Item>
    );
  };

  componentDidMount(): void {
    this.getStockAbstractData(this.state.pageNum, this.pageSize);
  }

  render(): React.ReactNode {
    return (
        <Layout>
          <Sider style={this.state.isCollapsed ? {
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          } : {}}>
            <div style={this.state.isCollapsed ? {} : {width: "100vw"}}>
              <Menu
                  mode={"inline"}
                  onClick={this.showDetail}
                  inlineCollapsed={this.state.isCollapsed}>
                {this.state.stockList.map(stock => this.getStockAbstractComp(stock))}
                <Menu.Item key="loading-key" icon={<DownOutlined />} style={{textAlign: "center"}} />
              </Menu>
            </div>
          </Sider>
          {
            this.state.isCollapsed ?
                <Layout style={{marginLeft: 200, padding: "20px 30px",}}>
                  <Header>
                    <Breadcrumb style={{margin: "18px 0"}}>
                      <Breadcrumb.Item>基本信息</Breadcrumb.Item>
                      <Breadcrumb.Item>K线图</Breadcrumb.Item>
                      <Breadcrumb.Item>知识图谱</Breadcrumb.Item>
                    </Breadcrumb>
                  </Header>
                  <Content>123
                  </Content>
                </Layout>
                : <></>
          }
        </Layout>

    );
  }


}

