import globalAxios from "../config/server/axios";
import {BasicResponse} from "./interfaces/response/BasicResponse";
import {
  StockAbstractResponse,
  StockResponse,
  StockKLineResponse, CompanyResponse
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

// 接口7. 根据地区获取公司排名
export async function apiGetCompanyRankByArea(area: string): Promise<BasicResponse<CompanyResponse[]>> {
  const {data} = await globalAxios.get("/rank", {
    params: {area}
  });
  return data;
}
