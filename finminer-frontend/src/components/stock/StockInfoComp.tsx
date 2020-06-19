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
    return (<Timeline>
      {
        infos.map(info => <Timeline.Item>{info}</Timeline.Item>
        )
      }

    </Timeline>);
  };

  getBasicInfo = (info: StockInfoResponse) => {
    return (
        <Descriptions title={this.state.companyId}>
          <Descriptions.Item label={"简称"}>{info.name}</Descriptions.Item>
          <Descriptions.Item label={"公司名"}>{info.company_name}</Descriptions.Item>
          <Descriptions.Item label={"概念"}>
            {info.concept.map((item) => <span>{item}/</span>)}
          </Descriptions.Item>
          <Descriptions.Item label={"产业"}>{info.industry}</Descriptions.Item>
          <Descriptions.Item label={"地区"}>{info.area}</Descriptions.Item>
          <Descriptions.Item label={"高管"}>
            {info.managers.map(manager => <span key={manager.manager_id}> <Tag color="cyan">{manager.manager_name}</Tag></span>)}
          </Descriptions.Item>
          <Descriptions.Item label={"持股人"}>
            {info.holders.map(holder => <span key={holder.holder_id}><Tag
                color={"blue"}>{holder.holder_name}</Tag></span>)}
          </Descriptions.Item>

        </Descriptions>
    );
  };

  getLastesStatistic = (info: StockInfoResponse) => {
    return (
        <div>
          <Statistic title={"交易日期"} value={info.date.split("T")[0]} />

          <Row>

            <Col span={4}> <Statistic title={"开盘价"} value={info.open} suffix={"元"} /> </Col>
            <Col span={4}> <Statistic title={"最高价"} value={info.high} suffix={"元"} /> </Col>
            <Col span={10}> <Statistic title={"成交量"} value={info.vol} suffix={"手"} /></Col>
            <Col span={6}> <Statistic title={"涨跌额"} valueStyle={{color: valueStyle(info.change).color}}
                                      suffix={info.change === 0 ? <MinusOutlined /> : info.change > 0 ?
                                          <ArrowUpOutlined /> :
                                          <ArrowDownOutlined />} value={info.change} /></Col>
            <Col span={4}> <Statistic title={"收盘价"} value={info.close} suffix={"元"} /> </Col>
            <Col span={4}> <Statistic title={"最低价"} value={info.low} suffix={"元"} /> </Col>
            <Col span={10}> <Statistic title={"成交额"} value={info.amount} suffix={"千元"} /></Col>
            <Col span={6}> <Statistic title={"涨跌幅(未复权"} value={info.pct_chg} /></Col>

          </Row>
        </div>
    );
  };

  render(): React.ReactNode {
    const info = this.state.info;
    return (
        <div>
          {Object.keys(info).length === 0 ? <Spin /> :
              <div>
                <Row>
                  <Col span={12}>{this.getBasicInfo(info)}</Col>
                  <Col span={12}>{this.getLastesStatistic(info)}</Col>
                </Row>
                {this.getAnnouncement(info.announcement)}
              </div>
          }
        </div>
    );
  }
}

export default withRouter(StockInfoComp);
