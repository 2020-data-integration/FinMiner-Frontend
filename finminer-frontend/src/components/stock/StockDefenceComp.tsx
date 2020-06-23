/**
 * 防守点相关
 * @date: 2020.06.23
 * @author: Alexchanchic
 */

import * as React from "react";
import {withRouter} from "react-router-dom";
import {apiGetDefenseInfoById} from "../../api/index.api";
import {DefenseResponse} from "../../api/interfaces/response/stock/StockResponse";

class StockDefenceComp extends React.Component<any, any> {
  state = {
    companyId: this.props.location.pathname.split("/")[2],
    defenseData: Object as unknown as DefenseResponse
  };

  async getStockDefenceData(companyId: string) {
    const res = await apiGetDefenseInfoById(companyId);
    this.setState({
      defenceData: res.data
    });
  }

  componentDidMount(): void {
    this.getStockDefenceData(this.state.companyId);
  }

  render(): React.ReactNode {
    return (
        <div>
          123
        </div>
    );
  }
}

export default withRouter(StockDefenceComp);
