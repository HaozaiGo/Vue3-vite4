import request from "@/config/request.js";

export function getRoleList(params) {
  return request({
    url: "/api/api/system/role/list",
    method: "get",
    params,
  });
}
// 新增角色
export function addRole(data) {
  return request({
    url: "/api/api/system/role",
    method: "post",
    data,
  });
}
// 获取当前角色详情
export function getRoleDetail(roleId) {
  return request({
    url: `/api/api/system/role/${roleId}`,
    method: "get",
  });
}
// 修改角色
export function editRole(data) {
  return request({
    url: "/api/api/system/role",
    method: "put",
    data,
  });
}
// 修改状态
export function statusChange(params) {
  return request({
    url: "/api/api/system/role/changeStatus",
    method: "put",
    params,
  });
}
// 删除角色
export function deleteRole(roleIds) {
  return request({
    url: `/api/api/system/role/${roleIds}`,
    method: "delete",
  });
}
// 获取对应角色部门树列表
export function getRoleDepartmentTree(roleId) {
  return request({
    url: `/api/api/system/role/deptTree/${roleId}`,
    method: "get",
  });
}
// 保存数据权限

export function saveDataScope(params) {
  return request({
    url: `/api/api/system/role/dataScope`,
    method: "put",
    params,
  });
}
