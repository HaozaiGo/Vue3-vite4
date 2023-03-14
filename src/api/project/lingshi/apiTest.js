import request from "@/config/request.js";

export function apiTest(){
    return request({
        url: "/mrbsservice/getInfo",
        method: "get",
      })
}
// 系统信息
export function getSysAuthInfo(query) {
    return request({
      url: '/mrbsservice/sys/base/info/getSysAuthInfo',
      method: 'get',
      params: query
    })
  }