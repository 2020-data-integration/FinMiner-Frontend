import globalAxios from "../config/server/axios";
import {BasicResponse} from "./interfaces/response/BasicResponse";

export async function apiTest(): Promise<BasicResponse> {
  const {data} = await globalAxios.get("/test");
  return data;
}
