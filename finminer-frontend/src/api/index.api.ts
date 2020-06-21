import globalAxios from "../config/server/axios";
import {BasicResponse} from "./interfaces/response/BasicResponse";
import {
  StockAbstractResponse,
  StockInfoResponse,
  StockKLineResponse, CompanyResponse, StockNetworkResponse, GdpResponse
} from "./interfaces/response/stock/StockResponse";

// 接口1. 根据companyId查看股票详情信息
export async function apiGetStockInfoById(companyId: string): Promise<BasicResponse<StockInfoResponse>> {
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

// 接口5. 获取股票知识图谱
export async function apiGetStockNetworkById(companyId: string): Promise<BasicResponse<StockNetworkResponse>> {
  const {data} = await globalAxios.get("/stock/roadmap", {
    params: {companyId}
  });
  return data;
}

// 接口6. 获取全国GDP
export async function apiGetGdp():Promise<BasicResponse<GdpResponse[]>>{
  const {data} = await globalAxios.get("/gdp");
  return data;
}


// 接口7. 根据地区获取公司排名
export async function apiGetCompanyRankByArea(area: string): Promise<BasicResponse<CompanyResponse[]>> {
  const {data} = await globalAxios.get("/rank", {
    params: {area}
  });
  return data;
}
