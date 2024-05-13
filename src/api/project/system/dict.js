import request from "@/config/request.js";

export function getDictList(params) {
  return request({
    url: "/api/api/system/dict/type/list",
    method: "get",
    params,
  });
}

// 新增字典
export function addDict(data) {
  return request({
    url: "/api/api/system/dict/type",
    method: "post",
    data,
  });
}
// 删除
export function deleteDict(dictIds) {
  return request({
    url: `/api/api/system/dict/type/${dictIds}`,
    method: "delete",
  });
}
// 修改
export function editDict(data) {
  return request({
    url: "/api/api/system/dict/type",
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
export function addDictInside(data) {
  return request({
    url: "/api/api/system/dict/data",
    method: "post",
    data,
  });
}
export function editDictInside(data) {
  return request({
    url: "/api/api/system/dict/data",
    method: "put",
    data,
  });
}
// 删除
export function deleteDictInside(dictCodes) {
  return request({
    url: `/api/api/system/dict/data/${dictCodes}`,
    method: "delete",
  });
}
// 缓存刷新
export function refreshCache() {
  return request({
    url: "/api/api/system/dict/type/refreshCache",
    method: "delete",
  });
}
