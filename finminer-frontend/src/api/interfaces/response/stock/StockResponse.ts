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
  amount: number
}

export interface StockInfoResponse {
  name: string,
  company_name: string,
  managers: [{
    manager_id: string
    manager_name: string
  }],
  holders:[{
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
  date: number,
  open: number,
  close: number,
  high: number,
  low: number,
}


export interface node {
  category: number, //0-Company,1-Holer,2-Manager
  name: string,
  symbolSize: number //节点大小，可固定，也可以动态
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

export interface CompanyResponse{
  date:string,
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
  amount: number
}
