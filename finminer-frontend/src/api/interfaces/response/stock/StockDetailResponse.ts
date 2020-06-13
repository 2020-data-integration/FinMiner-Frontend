/**
 * 股票接口相关Response
 * @author Alexchanchic
 * @date 2020.06.12
 */

export interface StockInfoResponse {
  companyId: string,
  companyName: string
}

export interface StockAbstractResponse {
  companyId: string,
  industry: string,
  open: number,
  close: number,
  high: number,
  low: number,
  change: number,
  vol: number,
  amount: number
}

export interface StockDetailResponse {
  name: string,
  fullName: string,
  managers: [{
    manager_id: string
    manager_name: string
  }],
  holders: [{
    holder_id: string
    holder_name: string
  }],
  concept: [string], // 概念：卖点
  industry: string,
  open: number,
  close: number,
  high: number,
  low: number,
  change: number,
  vol: number,
  amount: number,
  announcement: Array<string>, // 公司公告，最近的5条
  area: string,  // 地区
  change_pct: number,   //每股收益增长率
  net_asset: number,    // 净资产
  total_asset: number,   //全部资产
  profit_over_year: number,    // 营业利润同比
  revenue_over_year: number    // 营业总收入同比
}

export interface StockKLineResponse {
  date: number,
  open: number,
  close: number,
  high: number,
  low: number,
}
