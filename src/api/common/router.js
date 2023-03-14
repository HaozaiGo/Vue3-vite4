import request from "@/config/request.js";

export function getRouterList(data) {
  return request({
    url: "/mrbsservice/getRouters",
    method: "get",
  });
}

// 获取天气
export function getWeather(data) {
  return request({
    url: "/system/weather?city=" + data,
    method: "get",
  });
}
// 获取项目列表
export function usersubprojects() {
  return request({
    url: "/system/project/usersubprojects",
    method: "get",
  });
}
// 选择项目列表
export function currentproject(data) {
  return request({
    url: "/system/project/currentproject",
    method: "PUT",
    data,
  });
}
// 获取我的收藏列表
export function getFavorites(data) {
  return request({
    url: "/mrbsservice/system/menu/getFavorites",
    method: "GET",
  });
}

// 获取权限id
export function getBtns(data) {
  return request({
    url: "/system/menu/btns/" + data.menuId,
    method: "GET",
  });
}

// 添加我的收藏
export function AddFavorites(param) {
  return request({
    url: "/mrbsservice/system/menu/userFavorite/add/" + param.menuId,
    method: "post",
  });
}
// 删除我的收藏
export function DeleteFavorites(param) {
  return request({
    url: "/mrbsservice/system/menu/userFavorite/delete/" + param.menuId,
    method: "delete",
  });
}