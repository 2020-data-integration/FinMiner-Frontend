/**
 * 公共Response模块
 * @author WenSun
 * Copied from WenSun
 */

interface BasicResponseWrapper<T> {
  code: number; // 状态码
  msg: string; // 额外返回的信息
  source: Array<string>; // 数据来源
  data: T; // 接口返回的数据部分
}

export type BasicResponse<T = undefined> = BasicResponseWrapper<T> & object;
