import * as React from "react";
import {withRouter} from "react-router-dom";


export class StockNetworkComp extends React.Component<any, any> {
  state = {
    companyId: this.props.location.pathname.split("/")[2]
  };

  render(): React.ReactNode {
    return (
        <div>StockNetwork</div>
    );

  }
}

export default withRouter(StockNetworkComp);
