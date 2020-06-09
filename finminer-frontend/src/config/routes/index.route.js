import {BrowserRouter, Route} from "react-router-dom";
import React from "react";
import Homepage from "../../pages/homepage";
import Charts from "../../pages/charts";
import {PageHeader} from "../../components/layout/header";

export const RouteConfig = () => (
  <BrowserRouter>
    <PageHeader />
    <Route path='/react' component={Homepage} />
    <Route path='/charts' component={Charts} />
  </BrowserRouter>
);


export const RouteList = [
  {
    path: "/react",
    name: "React"
  },
  {
    path: "/charts",
    name: "Visualization"
  }
];
