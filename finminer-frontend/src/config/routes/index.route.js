import { BrowserRouter, Route} from "react-router-dom";
import React from "react";
import Homepage from '../../pages/homepage'
export function  RouteConfig() {
  return (
    <BrowserRouter>
      <Route path='/react' component={Homepage}/>
    </BrowserRouter>
  )
}
