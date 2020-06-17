import * as React from "react";
import { withRouter } from 'react-router-dom';

 class StockCandlestickComp extends React.Component<any,any>{
   state = {
     companyId: this.props.location.pathname.split("/")[2]
   };

   render(): React.ReactNode {
    return (
        <div>k</div>
    )
  }
}
export default withRouter(StockCandlestickComp)
