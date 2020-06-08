import axios from "axios";
import {message} from "antd";

/***
 * axios配置
 * @reference: https://www.jianshu.com/p/df464b26ae58
 * @mockAPI: https://mockapi.io/projects/5ede1546e36dd000166c7ef9
 * @author: Alexchanchic
 * @date: 2020.06.08
 * @type {AxiosInstance}
 */

const globalAxios = axios.create({
  baseURL: "https://5ede1546e36dd000166c7ef8.mockapi.io/api/"
});

//添加一个请求拦截器
globalAxios.interceptors.request.use(function (config) {
  //在请求发出之前进行一些操作
  message.loading("please waiting for a moment ... 😄");
  return config;
}, function (err) {
  //Do something with request error
  message.error(err);
  return Promise.reject(err);
});
//添加一个响应拦截器
globalAxios.interceptors.response.use(function (res) {
  //在这里对返回的数据进行处理
  message.success("requesting success 🎉");
  return res;
}, function (err) {
  message.error(err+" 😭");
  return Promise.reject(err);
});

export default globalAxios;
