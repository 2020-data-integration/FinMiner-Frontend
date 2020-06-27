/**
 * 股票接口相关Response
 * @author Alexchanchic
 * @date 2020.06.12
 */

export interface StockAbstractResponse {
  date: string
  companyId: string,
  companyName: string,
  industry: string,
  open: number,
  close: number,
  high: number,
  low: number,
  change: number,
  pct_chg: number,
  vol: number,
  amount: number,
  shouldBuy: boolean,     // 今天是否应该买入
  recommendIndex: number   // 推荐指标
}

export interface StockInfoResponse {
  name: string,
  company_name: string,
  managers: [{
    manager_id: string
    manager_name: string
  }],
  holders: [{
    holder_id: string
    holder_name: string
  }],
  concept: string[], // 概念：卖点
  industry: string,
  area: string,  // 地区
  announcement: string[],
  change_pct: number,   //每股收益增长率
  net_asset: number,    // 净资产
  total_asset: number,   //全部资产
  profit_over_year: number,    // 营业利润同比
  revenue_over_year: number,    // 营业总收入同比
  open: number,
  close: number,
  high: number,
  low: number,
  change: number,
  vol: number,
  amount: number,
  date: string,
  pct_chg: number
}

export interface StockKLineResponse {
  date: string,
  open: number,
  close: number,
  high: number,
  low: number,
  change: number,
  vol: number,
  amount: number
}


export interface node {
  category: number, //0-Company,1-Holer,2-Manager
  id: string,
  name: string //节点大小，可固定，也可以动态
}

export interface link {
  source: string,
  target: string,
  value: string  //联系

}

export interface StockNetworkResponse {
  nodes: node[],
  links: link[]
}

export type NodeCategory = 0 | 1 | 2 | 3

export interface CompanyResponse {
  date: string,
  companyId: string,
  companyName: string,
  industry: string,
  open: number,
  close: number,
  high: number,
  low: number,
  change: number,
  pct_chg: number,
  vol: number,
  amount: number,
  total_asset: number
}

export interface GdpResponse {
  name: string,
  value: number
}


export interface DefenseResponse {
  shouldBuy: boolean,     // 今天是否应该买入
  recommendIndex: number,   // 推荐指标
  revenueRatio: [{
    key: number,
    year: string,
    value: number,
    times: number  // 买入的次数
  }
      ]
}

export interface SharpResponse{
  companyId: string,
  companyName: string,
  shouldBuy: boolean,     // 今天是否应该买入
  recommendIndex: boolean    // 推荐指标
}

export interface StockKLineDefenceResponse{
  rawData: Array<[]>
  defensePoint:  Array<[]>
  buyPoint: Array<[]>
  sellPoint:  Array<[]>
}

export interface StockBuyRecommendResponse{
  rawData: Array<[]>
  defensePoint:  Array<any>
}
