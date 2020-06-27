/**
 * 防守点相关
 * @date: 2020.06.23
 * @author: Alexchanchic
 */

import * as React from "react";
import {withRouter} from "react-router-dom";
import {apiGetDefenseInfoById} from "../../api/index.api";
import {DefenseResponse} from "../../api/interfaces/response/stock/StockResponse";
import {Statistic, Row, Col, Spin, Table} from "antd";
import {valueStyle} from "../../utils/valueStyle";
import {ArrowUpOutlined, ArrowDownOutlined} from "@ant-design/icons";


class StockDefenceComp extends React.Component<any, any> {
  state = {
    companyId: this.props.companyId && this.props.companyId !== "" ? this.props.companyId : this.props.location.pathname.split("/")[2],
    defenseData: Object as unknown as DefenseResponse
  };

  async getStockDefenceData(companyId: string) {
    const res = await apiGetDefenseInfoById(companyId);
    let data = res.data;
    data.revenueRatio.forEach((d, index) => d.key = index);
    this.setState({
      defenseData: data
    });
  }

  componentDidMount(): void {
    this.getStockDefenceData(this.state.companyId);
  }


  render(): React.ReactNode {
    const defenseData = this.state.defenseData;
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
        dataIndex: "times"
      }
    ];

    console.log(defenseData);

    return (
        <div>
          {Object.keys(defenseData).length === 0 ? <Spin /> :
              <div>
                <Row>
                  <Col span={3}> <Statistic title={"投资推荐"}
                                            value={defenseData.shouldBuy ? "推荐买入" : "暂不推荐"}
                                            valueStyle={{fontSize: "25px"}}
                  /></Col>
                  <Col span={3}><Statistic title={"夏普比率"} precision={2} value={defenseData.recommendIndex} /></Col>
                </Row>
                <div style={{marginTop: "20px"}}>
                  <Table columns={columns} dataSource={defenseData.revenueRatio} />
                </div>
              </div>}
        </div>
    );
  }
}

export default withRouter(StockDefenceComp);
