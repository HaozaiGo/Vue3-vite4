/*
 * @Author: xiaoHao
 */
import request from "@/config/request.js";

// 查询菜单列表
export function listMenu(query) {
  return request({
    url: "/mrbsservice/system/menu/list",
    method: "get",
    params: query,
  });
}

// 查询菜单详细
export function getMenu(menuId) {
  return request({
    url: "/mrbsservice/system/menu/" + menuId,
    method: "get",
  });
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: "/mrbsservice/system/menu/treeselect",
    method: "get",
  });
}

// 根据角色ID查询菜单下拉树结构
// export function roleMenuTreeselect(roleId) {
//   return request({
//     url: '/system/menu/roleMenuTreeselect/' + roleId,
//     method: 'get'
//   })
// }
export function roleMenuTreeselect(roleId) {
  return request({
    url: "/mrbsservice/system/menu/roleMenuTreeselect/" + roleId,
    method: "get",
    params: { remark: "meter" },
  });
}
// 新增菜单
export function addMenu(data) {
  return request({
    url: "/mrbsservice/system/menu",
    method: "post",
    data: data,
  });
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: "/mrbsservice/system/menu",
    method: "put",
    data: data,
  });
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: "/mrbsservice/system/menu/" + menuId,
    method: "delete",
  });
}
