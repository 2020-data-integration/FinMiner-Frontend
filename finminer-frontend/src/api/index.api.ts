import globalAxios from "../config/server/axios";
import {BasicResponse} from "./interfaces/response/BasicResponse";
import {
  StockAbstractResponse,
  StockInfoResponse,
  StockKLineResponse,
  CompanyResponse,
  StockNetworkResponse,
  GdpResponse,
  NodeCategory,
  DefenseResponse,
  SharpResponse,
  StockKLineDefenceResponse, StockBuyRecommendResponse
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
export async function apiGetStockNetworkById(nodeId: string, category: NodeCategory): Promise<BasicResponse<StockNetworkResponse>> {
  const {data} = await globalAxios.get("/stock/roadmap", {
    params: {nodeId, category}
  });
  return data;
}

// 接口6. 获取全国GDP
export async function apiGetGdp(): Promise<BasicResponse<GdpResponse[]>> {
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


// 接口8. 根据公司id获取防守点算法相关数据
export async function apiGetDefenseInfoById(companyId: string): Promise<BasicResponse<DefenseResponse>> {
  const {data} = await globalAxios.get("/defense", {
    params: {companyId}
  });
  return data;
}

// 接口9. 按照夏普率获得公司排名
export async function apiGetCompanyRankBySharp(pageNum: number, pageSize: number): Promise<BasicResponse<SharpResponse[]>> {
  const {data} = await globalAxios.get(" /rank/sharp", {params: {pageNum, pageSize}});
  return data;
}

// 接口10. 获取2015-2019防守点相关的K线数据
export async function apiGetStockKLineAboutDefence(
    year: number,
    companyId: string
): Promise<BasicResponse<StockKLineDefenceResponse>> {
  const {data} = await globalAxios.get("/defense/k", {params: {year, companyId}});
  return data;
}

// 接口11. 获取股票买入推荐的K线数据
export async function apiGetStockBuyRecommend(companyId: string): Promise<BasicResponse<StockBuyRecommendResponse>> {
  const {data} = await globalAxios.get("/recommend/k", {params: {companyId}});
  return data;
}
