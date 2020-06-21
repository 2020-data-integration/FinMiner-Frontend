/**
 * 数据面板
 * @author Alexchanchic
 * @date 2020.03.21
 */
import {StockAbstractResponse} from "../../api/interfaces/response/stock/StockResponse";
import * as React from "react";

import {Layout, Menu, Breadcrumb, Statistic, Row, Col} from "antd";
import {apiGetStockAbstract} from "../../api/index.api";
import {ClickParam} from "antd/lib/menu";
import {DownOutlined} from "@ant-design/icons";
import {Link, Route} from "react-router-dom";
import {DashboardRouteList} from "../../config/routes/index.route";
import {withRouter} from "react-router-dom";
import {ArrowUpOutlined, ArrowDownOutlined, MinusOutlined} from "@ant-design/icons";
import {valueStyle} from "../../utils/valueStyle";

const {Header, Sider, Content} = Layout;

class StockAbstractListComp extends React.Component<any, any> {
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
    console.log(this.state.pageNum);
    const currentStockList = this.state.stockList;
    const res = await apiGetStockAbstract(pageNum, pageSize);
    currentStockList.push(...res.data);
    this.setState({
      stockList: currentStockList
    });
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
      }, () => {
        this.props.history.push("/dashboard/" + key + "/info");
      });

    } else {
      this.setState({
        pageNum: this.state.pageNum + 1
      }, () => this.getStockAbstractData(this.state.pageNum, this.pageSize));

    }

  };


  componentDidMount(): void {
    this.getStockAbstractData(this.state.pageNum, this.pageSize);
    this.props.history.listen((location: { pathname: string }) => {
      // 最新路由的 location 对象，可以通过比较 pathname 是否相同来判断路由的变化情况
      if (this.props.location.pathname !== location.pathname) {
        if (location.pathname.split("/").length === 2) {
          this.expandCollapsed();
        }
      }
    });

  }


  // menu展开时后的股票信息
  getStockDetailComp = (props: StockAbstractResponse) => {
    return (
        <div style={{paddingTop: "8px"}}>
          <Row>
            <Col span={8}><Statistic title={props.industry} value={props.companyId} suffix={props.companyName} /></Col>
            <Col span={3}> <Statistic title={"开盘价"} value={props.open} suffix={"元"} /> </Col>
            <Col span={3}> <Statistic title={"最高价"} value={props.high} suffix={"元"} /> </Col>
            <Col span={5}> <Statistic title={"成交量"} value={props.vol} suffix={"手"} /></Col>
            <Col span={4}> <Statistic title={"涨跌额"} valueStyle={{color: valueStyle(props.change).color}}
                                      suffix={props.change === 0 ? <MinusOutlined /> : props.change > 0 ?
                                          <ArrowUpOutlined /> :
                                          <ArrowDownOutlined />} value={props.change} /></Col>
            <Col span={8}> <Statistic title={"交易日期"} value={props.date.split("T")[0]} /></Col>
            <Col span={3}> <Statistic title={"收盘价"} value={props.close} suffix={"元"} /> </Col>
            <Col span={3}> <Statistic title={"最低价"} value={props.low} suffix={"元"} /> </Col>
            <Col span={5}> <Statistic title={"成交额"} value={props.amount} suffix={"千元"} /></Col>
            <Col span={4}> <Statistic title={"涨跌幅(未复权"} valueStyle={{color: valueStyle(props.pct_chg).color}}
                                      suffix={props.pct_chg === 0 ? <MinusOutlined /> : props.change > 0 ?
                                          <ArrowUpOutlined /> :
                                          <ArrowDownOutlined />} value={props.pct_chg} /></Col>

          </Row>
        </div>
    );
  };

  // menu收缩时的股票信息
  getStockAbstractComp = (props: StockAbstractResponse) => {
    return (
        <div>
          {props.companyId}<span style={{marginLeft: 10}}>{props.companyName}</span>
        </div>
    );
  };
  // 单个股票的Menu组件
  getStockMenuComp = (props: StockAbstractResponse) => {
    return (
        <Menu.Item key={props.companyId}
                   style={this.state.isCollapsed ? {} : {height: "150px", borderBottom: "2px solid #1f1f1f"}}>
          {this.state.isCollapsed ? this.getStockAbstractComp(props) : this.getStockDetailComp(props)}
        </Menu.Item>
    );
  };

  render(): React.ReactNode {
    const isCollapsed = this.state.isCollapsed;
    return (
        <Layout>
          <Sider style={isCollapsed ? {
            overflow: "auto",
            height: "90vh",
            position: "fixed",
            left: 0,
          } : {}}>
            <div style={isCollapsed ? {width: "195px"} : {width: "100vw"}}>
              <Menu
                  mode={"inline"}
                  onClick={this.showDetail}
                  inlineCollapsed={isCollapsed}>
                {this.state.stockList.map(stock => this.getStockMenuComp(stock))}
                <Menu.Item key="loading-key" icon={<DownOutlined />} style={{textAlign: "center"}} />
              </Menu>
            </div>
          </Sider>
          {
            isCollapsed ?
                <Layout style={{marginLeft: 200, padding: "20px 30px",}}>
                  <Header>
                    <Breadcrumb style={{margin: "18px 0"}}>
                      {
                        DashboardRouteList(this.state.selectedStock).map((route) =>
                            <Breadcrumb.Item key={route.name}>
                              <Link to={route.path}>{route.name}</Link>
                            </Breadcrumb.Item>)
                      }
                    </Breadcrumb>
                  </Header>
                  <Content style={{paddingTop: 30}}>
                    {
                      DashboardRouteList(this.state.selectedStock).map((route) =>
                          <Route path={route.path} component={route.component} key={route.name} />)
                    }
                  </Content>
                </Layout>
                : <></>
          }
        </Layout>

    );
  }


}

export default withRouter(StockAbstractListComp);

