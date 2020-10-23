/**
 * 防守点相关
 * @date: 2020.06.23
 * @author: Alexchanchic
 */

import * as React from "react";
import {apiGetDefenseInfoById, apiGetStockBuyRecommend, apiGetStockKLineAboutDefence} from "../../api/index.api";
import {
  DefenseResponse,
  StockBuyRecommendResponse,
  StockKLineDefenceResponse
} from "../../api/interfaces/response/stock/StockResponse";
import {Statistic, Row, Col, Spin, Table, Button, Modal, Typography, Alert, Tooltip} from "antd";
import {valueStyle} from "../../utils/valueStyle";
import {ArrowUpOutlined, ArrowDownOutlined} from "@ant-design/icons";
import {CandlestickDefenceChart} from "../charts/CandlestickDefenceChart";
import {QuestionOutlined} from "@ant-design/icons/lib";

const {Title} = Typography;

interface Defence {
  companyId: string
}

class StockDefenceComp extends React.Component<Defence, any> {
  state = {
    companyId: this.props.companyId,
    // && this.props.companyId !== "" ? this.props.companyId : this.props.location.pathname.split("/")[2],
    defenseData: Object as unknown as DefenseResponse,
    showChart: false,
    selectedYear: 2017,
    pastChartData: Object as unknown as StockKLineDefenceResponse,
    currentChartData: Object as unknown as StockBuyRecommendResponse
  };

  async getStockDefenceData() {
    const res = await apiGetDefenseInfoById(this.state.companyId);
    let data = res.data;
    data.revenueRatio.forEach((d, index) => d.key = index);
    this.setState({
      defenseData: data
    });
  }

  async getStockKlineAboutStock(year: number) {
    const res = await apiGetStockKLineAboutDefence(year, this.state.companyId);
    this.setState({
      pastChartData: res.data
    });
  }

  async getStockBuyRecommend() {
    const res = await apiGetStockBuyRecommend(this.state.companyId);
    this.setState({
      currentChartData: res.data
    });

  }

  showDetail = (record: any) => {
    this.getStockKlineAboutStock(record.year).then(() => {
          this.setState({
            showChart: true,
            selectedYear: record.year
          });
        }
    );
  };

  componentWillReceiveProps(nextProps: Readonly<Defence>, nextContext: any): void {
    this.setState({
      companyId: nextProps.companyId
    }, () => {
      this.getStockDefenceData();
      this.getStockBuyRecommend();
    });
  }

  componentDidMount(): void {
    this.getStockDefenceData();
    this.getStockBuyRecommend();
  }

  alertStyle = {marginBottom: "10px"};

  getAlertComp = () => (
      <div>
        <Alert
            message="投资推荐"
            description={
              <div>若当前股价低于左侧K线图中的防守点，则推荐买入
              </div>}
            type="success"
            showIcon
            style={this.alertStyle}
        />
        <Alert
            message="夏普比率"
            description={
              <div>计算公式：投资组合预期报酬率/标准差。<br />
                对收益与风险加以综合考虑，用以衡量金融资产的绩效表现<br />
                夏普比率越高，则按推荐投资风险越低
              </div>}
            type="info"
            showIcon
            style={this.alertStyle}
        />
        <Alert
            message="K线图标注"
            description={
              <div>
                <div>- 防守点：如股价上涨2%，交易量上涨20%，则低点为防守点</div>
                <div>- 买入点：若价格低于倒数第二个防守点，则买入</div>
                <div>- 卖出点：在买入后，上涨超过3%或下跌超过5%，则卖出</div>
              </div>
            }
            type="warning"
            showIcon
            style={this.alertStyle}
        />
      </div>
  );

  render(): React.ReactNode {
    const defenseData = this.state.defenseData;
    const pastChartData = this.state.pastChartData;
    const currentChartData = this.state.currentChartData;
    const columns = [
      {
        title: "年份",
        dataIndex: "year",
      },
      {
        title: "收益",
        dataIndex: "value",
        render: (value: number) =>
            <Statistic prefix={value === 0 ? "" : value > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                       suffix={"%"}
                       precision={2}
                       valueStyle={{color: valueStyle(value).color}}
                       value={value * 100} />
      },
      {
        title: "买卖次数",
        dataIndex: "times",
        render: (value: number, record: any) =>
            <span>{value}
              <Button ghost
                      onClick={() => this.showDetail(record)}
                      style={{float: "right"}}>查看详情</Button>
            </span>
      }
    ];

    return (
        <div>
          {Object.keys(defenseData).length === 0 || Object.keys(currentChartData).length === 0 ? <Spin /> :
              <div>
                <Row>
                  <Col span={8}>
                    <Title level={2}
                           style={{marginTop: "10px", marginLeft: "10px"}}
                    >{this.state.companyId}</Title>
                  </Col>
                  <Col span={3}> <Statistic title={"投资推荐"}
                                            value={defenseData.shouldBuy === "None" ? "昨日暂无数据" : defenseData.shouldBuy === "True" ? "推荐买入" : "暂不推荐"}
                                            valueStyle={{fontSize: "22px"}}
                  /></Col>
                  <Col span={3}><Statistic title={"夏普比率"} precision={2} value={defenseData.recommendIndex} /></Col>
                  <Col span={1}>
                    <Tooltip
                        title={this.getAlertComp()}>
                      <Button shape={"circle"}
                              style={{marginLeft: "10px"}}
                              icon={<QuestionOutlined />} size={"small"} />
                    </Tooltip>
                  </Col>
                </Row>
                <div style={{display: "flex", alignItems: "center", marginTop: "20px"}}>
                  <div style={{width: "90%"}}>
                    {CandlestickDefenceChart(currentChartData.rawData, [currentChartData.defensePoint])}
                  </div>
                </div>
                <div style={{marginTop: "20px"}}>
                  <Title level={4}>往年情况
                    <Tooltip
                        title={
                          <div>
                            <div>- 收益：收益越高，代表该股票越符合庄家特质</div>
                            <div>- 买卖次数：买卖次数越多，代表该股票越符合庄家特质</div>
                          </div>
                        }>
                      <Button shape={"circle"}
                              style={{marginLeft: "10px"}}
                              icon={<QuestionOutlined />} size={"small"} />
                    </Tooltip>

                  </Title>
                  <Table columns={columns} dataSource={defenseData.revenueRatio} />
                </div>
                {
                  this.state.showChart ?
                      <Modal title={this.state.selectedYear + "年详情信息"}
                             visible={this.state.showChart}
                             footer={null}
                             style={{
                               minWidth: "65vw",
                               minHeight: "65vh"
                             }}
                             onCancel={() => this.setState({showChart: false})}>
                        <div style={{width: "60vw"}}>
                          {
                            CandlestickDefenceChart(pastChartData.rawData, pastChartData.defensePoint, pastChartData.buyPoint, pastChartData.sellPoint)
                          }
                        </div>
                      </Modal> : <></>
                }
              </div>}
        </div>
    );
  }
}

export default StockDefenceComp;
