import request from "@/config/request.js";

export function getMenuList(params) {
  return request({
    url: "/api/api/system/menu/tree/list",
    method: "get",
    params,
  });
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: "/api/api/system/menu",
    method: "post",
    data,
  });
}
// 删除
export function deleteMenu(menuId) {
  return request({
    url: `/api/api/system/menu/${menuId}`,
    method: "delete",
  });
}
// 修改菜单
export function editMenu(data) {
  return request({
    url: "/api/api/system/menu",
    method: "put",
    data,
  });
}