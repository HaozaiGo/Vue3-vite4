/*
 * @Author: xiaoHao
 */
import setting from '@/config/settings.js'
import request from '@/config/request.js'

let commonMethod = {
    // 字典 - 单个
    getDict(dictType: string) {
        return request({
            url: `${setting.urlBefore}/system/dict/data/type/` + dictType,
            method: 'get'
        })

    },

    debounce(fn: any, val: any) {
        let timer;
        clearTimeout(timer)
        timer = setTimeout(fn, 1000)
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
}
export default commonMethod