/*
 * @Author: your name
 * @Date: 2021-04-29 10:13:29
 * @LastEditTime: 2023-03-01 14:04:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-Mrbs-Service\src\api\HandleBusiness\alarmWatch.js
 */
import request from "@/config/request.js";

export function getSystemUsers(params) {
  return request({
    url: "/api/api/system/user/list",
    method: "get",
    params,
  });
}
// 新增系统用户
export function addUser(data) {
  return request({
    url: "/api/api/system/user",
    method: "post",
    data,
  });
}
// 编辑用户
export function editUser(data) {
  return request({
    url: "/api/api/system/user",
    method: "put",
    data,
  });
}
// 删除系统用户
export function deleteSystemUser(userIds) {
  return request({
    url: `/api/api/system/user/${userIds}`,
    method: "delete",
  });
}
// 更改状态
export function statusChange(params) {
  return request({
    url: "/api/api/system/user/changeStatus",
    method: "put",
    params,
  });
}
