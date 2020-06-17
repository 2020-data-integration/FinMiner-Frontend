import {BrowserRouter, Route} from "react-router-dom";
import React from "react";
import Homepage from "../../pages/homepage";
import Charts from "../../pages/charts";
import {PageHeader} from "../../components/layout/header";
import Dashboard from "../../pages/dashboard";
import StockInfoComp from "../../components/stock/StockInfoComp";
import StockCandlestickComp from "../../components/stock/StockCandlestickComp";
import StockNetworkComp from "../../components/stock/StockNetworkComp";

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
    name: "数据面板"
  },
  {
    path: "/charts",
    name: "GDP可视化"
  }
];

export function DashboardRouteList(companyId) {
  const basicPath = "/dashboard/" + companyId;
  return [
    {
      path: basicPath + "/info",
      name: "基本信息",
      component: StockInfoComp
    },
    {
      path: basicPath + "/candlestick",
      name: "K线图",
      component: StockCandlestickComp
    },
    {
      path: basicPath + "network",
      name: "知识图谱",
      component: StockNetworkComp
    }
  ];
}
