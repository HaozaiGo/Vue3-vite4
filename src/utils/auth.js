import Cookies from 'js-cookie'
let token1 = ''
const TokenKey = 'Admin-Token'
export function getToken() {
  token1 = window.localStorage.getItem('token') == null ? '' : window.localStorage.getItem('token')
  return token1
}

export function setToken(token) {
  token1 = token
  var millisecond = new Date().getTime();
  var expiresTime = new Date(millisecond + Number(window.localStorage.getItem('expires_in')) * 1000);
  return Cookies.set(TokenKey, token, {
    expires: expiresTime,
  })
}

export function removeToken() {
  window.localStorage.removeItem("token");
  if (getToken() == '') { return; }
  return Cookies.remove(TokenKey)
}