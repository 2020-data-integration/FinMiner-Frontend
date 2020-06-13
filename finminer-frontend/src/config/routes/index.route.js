import {BrowserRouter, Route} from "react-router-dom";
import React from "react";
import Homepage from "../../pages/homepage";
import Charts from "../../pages/charts";
import {PageHeader} from "../../components/layout/header";
import Dashboard from "../../pages/dashboard";

export const RouteConfig = () => (
  <BrowserRouter>
    <PageHeader />
    <Route exact path='/' component={Homepage} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/charts' component={Charts} />
  </BrowserRouter>
);


export const RouteList = [
  {
    path: "/dashboard",
    name: "Dashboard"
  },
  {
    path: "/charts",
    name: "Visualization"
  }
];
