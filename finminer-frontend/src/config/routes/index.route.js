import {BrowserRouter, Route} from "react-router-dom";
import React from "react";
import Homepage from "../../pages/homepage";
import Charts from "../../pages/charts";

export const RouteConfig = () => (
  <BrowserRouter>
    <Route path='/react' component={Homepage} />
    <Route path='/charts' component={Charts} />
  </BrowserRouter>
);
