import globalAxios from "../config/server/axios";
import {BasicResponse} from "./interfaces/response/BasicResponse";



// 接口4. 获取股票列表
export async function apiGetStockList(): Promise<BasicResponse>{
  const {data} = await globalAxios.get("/stock/all");
  return data;
}
