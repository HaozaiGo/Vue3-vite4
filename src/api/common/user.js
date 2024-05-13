/*
 * @Author: xiaoHao
 */
import request from "@/config/request.js";
import { encryptedData } from "@/utils/encrypt.js";
import settings from "@/config/settings.js";
import { getToken } from "@/utils/auth.js";

// 登陆
export async function login(data) {
  if (settings.loginRSA) {
    data = await encryptedData(data);
  }
  return request({
    url: "/api/api/login",
    method: "post",
    data: {
      username: data.username,
      password: data.password,
      code: data.code,
      uuid: data.uuid,
      client_id: data.client_id,
      client_secret: data.client_secret,
      grant_type: data.grant_type,
      scope: data.scope,
    },
  });
}
// 获取部门
export function getDeptList() {
  return request({
    url: "/api/api/system/user/deptTree",
    method: "get",
  });
}
// 获取角色
export function getRoles() {
  return request({
    url: "/api/api/system/user/roles",
    method: "get",
  });
}
// 获取菜单路由
export function getRoute() {
  return request({
    url: "/api/api/getRouters",
    method: "get",
  });
}

export function refreshlogin(data) {
  return request({
    url: "/mrbsservice/login",
    method: "post",
    data: {
      refresh_token: window.localStorage.getItem("refresh_token"),
      client_id: window.localStorage.getItem("client_id"),
      client_secret: "123456",
      grant_type: "refresh_token",
      scope: "server",
    },
  });
}

export function getInfo(accessToken) {
  return request({
    url: "/mrbsservice/getInfo",
    method: "get",
  });
}
// 获取路由
export function getRouters(accessToken) {
  return request({
    url: "/mrbsservice/getRouters",
    method: "get",
    params: { remark: "meter" },
  });
}
export function logout() {
  return request({
    url: "/mrbsservice/logout",
    method: "delete",
  });
}
export function register() {
  return request({
    url: "/register",
    method: "post",
  });
}
export function getPublicKey(data) {
  return request({
    url: "/publicKey",
    method: "post",
  });
}
