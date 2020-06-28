import {BrowserRouter, Route} from "react-router-dom";
import React from "react";
import Defense from "../../pages/defense"
import Homepage from "../../pages/homepage";
import Charts from "../../pages/charts";
import PageHeader from "../../components/layout/header";
import Dashboard from "../../pages/dashboard";
import StockInfoComp from "../../components/stock/StockInfoComp";
import StockCandlestickComp from "../../components/stock/StockCandlestickComp";
import StockNetworkComp from "../../components/stock/StockNetworkComp";

export const RouteConfig = () => (
  <BrowserRouter>
    <PageHeader />
    <Route exact path='/' component={Homepage} />
    <Route path='/defense' component={Defense} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/charts' component={Charts} />
  </BrowserRouter>
);


export const RouteList = [
  {
    path: "/",
    name: "首页",
    key:'homepage',
    component:Homepage
  },
  {
    path: "/defense",
    name: "投资推荐",
    key:'defense',
    component:Defense
  },
  {
    path: "/dashboard",
    name: "数据面板",
    key:'dashboard',
    component:Dashboard
  },
  {
    path: "/charts",
    name: "GDP可视化",
    key:'charts',
    component: Charts
  }
];

export function DashboardRouteList(companyId) {
  const basicPath = "/dashboard/" + companyId;
  return [
    {
      path: basicPath + "/info",
      name: "基本信息",
      key: "info",
      component: StockInfoComp
    },
    {
      path: basicPath + "/candlestick",
      name: "K线图",
      key:"candlestick",
      component: StockCandlestickComp
    },
    {
      path: basicPath + "/network",
      name: "知识图谱",
      key: "network",
      component: StockNetworkComp
    }
    // {
    //   path: basicPath+"/defense",
    //   name: "投资推荐",
    //   key: "defense",
    //   component: StockDefenceComp
    // }
  ];
}
