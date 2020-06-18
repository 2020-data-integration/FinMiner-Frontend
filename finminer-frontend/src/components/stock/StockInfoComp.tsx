import * as React from "react";
import {withRouter} from "react-router-dom";
import {StockInfoResponse} from "../../api/interfaces/response/stock/StockResponse";
import {apiGetStockInfoById} from "../../api/index.api";
import {Timeline, Spin} from "antd";

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

  render(): React.ReactNode {
    const info = this.state.info;
    return (
        <div>
          {Object.keys(info).length === 0 ? <Spin /> :
              <Timeline>
                {
                  info.announcement.map(info => <Timeline.Item>{info}</Timeline.Item>
                  )
                }

              </Timeline>
          }
        </div>
    );
  }
}

export default withRouter(StockInfoComp);
