import request from "@/config/request.js";

export function getConfigList(params) {
  return request({
    url: "/api/api/system/config/list",
    method: "get",
    params,
  });
}

// 新增字典
export function addConfig(data) {
  return request({
    url: "/api/api/system/config",
    method: "post",
    data,
  });
}
// 删除
export function deleteConfig(configIds) {
  return request({
    url: `/api/api/system/config/${configIds}`,
    method: "delete",
  });
}
// 修改
export function editConfig(data) {
  return request({
    url: "/api/api/system/config",
    method: "put",
    data,
  });
}

//获取字典数据List
export function getDictInsideList(params) {
  return request({
    url: `/api/api/system/dict/data/list`,
    method: "get",
    params,
  });
}
//参数缓存刷新
export function refreshCache() {
  return request({
    url: `/api/api/system/config/refreshCache`,
    method: "delete",
  });
}
