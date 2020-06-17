import globalAxios from "../config/server/axios";
import {BasicResponse} from "./interfaces/response/BasicResponse";
import {
  StockAbstractResponse,
  StockResponse,
  StockKLineResponse, StockInfoResponse
} from "./interfaces/response/stock/StockResponse";

// 接口1. 根据companyId查看股票详情信息
export async function apiGetStockDetailById(companyId: string): Promise<BasicResponse<StockResponse>> {
  const {data} = await globalAxios.get("/stock/info", {
    params: {companyId}
  });
  return data;
}

// 接口2. 根据companyId查看股票K线图
export async function apiGetStockKLineById(companyId: string): Promise<BasicResponse<StockKLineResponse[]>> {
  const {data} = await globalAxios.get("/stock/series", {
    params: {companyId}
  });
  return data;
}

// 接口3. 获取昨日行情信息
export async function apiGetStockAbstract(pageNum: number, pageSize: number): Promise<BasicResponse<StockAbstractResponse[]>> {
  const {data} = await globalAxios.get("/stock/market", {
    params: {pageNum, pageSize}
  });
  return data;

}

// 接口4. 获取股票列表
export async function apiGetStockList(): Promise<BasicResponse<StockInfoResponse[]>> {
  const {data} = await globalAxios.get("/stock/all");
  return data;
}
