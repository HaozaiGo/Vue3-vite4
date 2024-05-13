/*
 * @Author: xiaoHao
 */
import request from "@/config/request.js";

const commonMethod = {
  // 字典 - 单个
  getDict(dictType: string) {
    return request({
      url: `/api/api/system/dict/type/type?dictTypes=` + dictType,
      method: "get",
    });
  },

  debounce(fn: any, val: any) {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(fn, 1000);
  },

  once: function (fn: any) {
    let caller = true;
    return function () {
      if (caller) {
        caller = false
        fn.apply(this, arguments)
      }
    }

  },
  tableHeight() {
    return window.innerHeight - 260;
  },

}
export default commonMethod