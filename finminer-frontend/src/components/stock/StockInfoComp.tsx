import * as React from "react";
import {withRouter} from "react-router-dom";
import {StockInfoResponse} from "../../api/interfaces/response/stock/StockResponse";
import {apiGetStockInfoById} from "../../api/index.api";
import {Timeline, Spin, Descriptions, Tag, Statistic, Row, Col} from "antd";
import {valueStyle} from "../../utils/valueStyle";
import {ArrowUpOutlined, ArrowDownOutlined, MinusOutlined} from "@ant-design/icons";

class StockInfoComp extends React.Component<any, any> {
  state = {
    companyId: this.props.location.pathname.split("/")[2],
    info: {} as StockInfoResponse
  };

  async getStockInfoData(companyId: string) {
    const res = await apiGetStockInfoById(companyId);
    this.setState({
      info: res.data
    });
  }

  componentDidMount(): void {
    this.getStockInfoData(this.state.companyId);
  }

  getAnnouncement = (infos: string[]) => {
    return (
        <Descriptions title={"公司公告"}>
          <Timeline>
            {
              infos.map(info => <Timeline.Item>{info}</Timeline.Item>
              )
            }
          </Timeline>
        </Descriptions>
    );
  };

  getBasicInfo = (info: StockInfoResponse) => {
    return (
        <Descriptions title={this.state.companyId}>
          <Descriptions.Item label={"简称"}>{info.name}</Descriptions.Item>
          <Descriptions.Item label={"公司名"} span={2}>{info.company_name}</Descriptions.Item>
          <Descriptions.Item label={"行业"}>{info.industry}</Descriptions.Item>
          <Descriptions.Item label={"地区"} span={2}>{info.area}</Descriptions.Item>
          <Descriptions.Item label={"概念"} span={3}>
            {info.concept.map((item) => <Tag color={"lime"} style={{marginBottom: "10px"}}>{item}</Tag>)}
          </Descriptions.Item>
          <Descriptions.Item label={"高管"} span={3}>
            {info.managers.map(manager => <Tag color="cyan"
                                               style={{marginBottom: "10px"}}>{manager.manager_name}</Tag>)}
          </Descriptions.Item>
          <Descriptions.Item label={"持股人"} span={3}>
            {info.holders.map(holder => <Tag
                color={"blue"} style={{marginBottom: "10px"}}>{holder.holder_name}</Tag>)}
          </Descriptions.Item>

        </Descriptions>
    );
  };

  getLatestStatistic = (info: StockInfoResponse) => {
    return (
        <Descriptions column={4} title={<div>最新数据<Tag color={"default"}
                                                      style={{marginLeft: "10px"}}>{info.date.split("T")[0]}</Tag>
        </div>}>
          <Descriptions.Item> <Statistic title={"开盘价"} value={info.open} suffix={"元"} /> </Descriptions.Item>
          <Descriptions.Item> <Statistic title={"最高价"} value={info.high} suffix={"元"} /> </Descriptions.Item>
          <Descriptions.Item> <Statistic title={"成交量"} value={info.vol} suffix={"手"} /></Descriptions.Item>
          <Descriptions.Item> <Statistic title={"涨跌额"} valueStyle={{color: valueStyle(info.change).color}}
                                         suffix={info.change === 0 ? <MinusOutlined /> : info.change > 0 ?
                                             <ArrowUpOutlined /> :
                                             <ArrowDownOutlined />} value={info.change} /></Descriptions.Item>
          <Descriptions.Item> <Statistic title={"收盘价"} value={info.close} suffix={"元"} /> </Descriptions.Item>
          <Descriptions.Item> <Statistic title={"最低价"} value={info.low} suffix={"元"} /> </Descriptions.Item>
          <Descriptions.Item> <Statistic title={"成交额"} value={info.amount}
                                         suffix={"千元"} /></Descriptions.Item>

          <Descriptions.Item> <Statistic title={"涨跌幅(未复权)"} valueStyle={{color: valueStyle(info.pct_chg).color}}
                                         suffix={info.pct_chg === 0 ? <MinusOutlined /> : info.pct_chg > 0 ?
                                             <ArrowUpOutlined /> :
                                             <ArrowDownOutlined />} value={info.pct_chg} /></Descriptions.Item>

        </Descriptions>
    );
  };

  getFinanialReport = (info: StockInfoResponse) => {
    return (
        <Descriptions column={1} title={"公司财报"}>
          <Descriptions.Item> <Statistic title={"每股收益增长率"} value={info.change_pct} /></Descriptions.Item>
          <Descriptions.Item> <Statistic title={"净资产"} value={info.net_asset} /></Descriptions.Item>

          <Descriptions.Item> <Statistic title={"全部资产"} value={info.total_asset} /></Descriptions.Item>

          <Descriptions.Item> <Statistic title={"营业利润同比"} value={info.profit_over_year} /></Descriptions.Item>
          <Descriptions.Item> <Statistic title={"营业总收入同比"} value={info.revenue_over_year} /></Descriptions.Item>


        </Descriptions>
    );
  };

  render(): React.ReactNode {
    const info = this.state.info;
    return (
        <div>
          {Object.keys(info).length === 0 ? <Spin /> :
              <div>
                <Row gutter={8}>
                  <Col span={18}>{this.getBasicInfo(info)}</Col>
                  <Col span={6}>{this.getFinanialReport(info)}</Col>

                </Row>
                <Row gutter={8}>
                  {this.getLatestStatistic(info)}
                </Row>
                <Row style={{marginTop: "20px"}}>
                  {this.getAnnouncement(info.announcement)}
                </Row>
              </div>
          }
        </div>
    );
  }
}

export default withRouter(StockInfoComp);
