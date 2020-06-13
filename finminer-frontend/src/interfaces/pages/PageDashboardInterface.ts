/**
 * dashboard 界面接口
 * @author Alexchanchic
 * @date 2020.06.12
 * @last
 */
import {StockInfoResponse} from "../../api/interfaces/response/stock/StockDetailResponse";

export interface PageDashboardInterface {
  stockList: Array<StockInfoResponse>
}
