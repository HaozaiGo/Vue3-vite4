/*
 * @Author: your name
 * @Date: 2021-04-29 10:13:29
 * @LastEditTime: 2023-03-01 14:04:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-Mrbs-Service\src\api\HandleBusiness\alarmWatch.js
 */
import request from '@/config/request.js'
//获取告警监控表格数据
export function getAlarmWatchTableData(query) {
  return request({
    url: '/mrbsservice/business/alarm/monitor/table',
    method: 'get',
    params: query
  })
}
//获取window告警
export function getWindowAlarm(query) {
  return request({
    url: '/mrbsservice/business/alarm/monitor/window',
    method: 'get',
    params: query
  })

}

// 解除告警
export function cancelOneAlarm(query) {
  return request({
    url: '/mrbsservice/business/alarm/monitor/removeAlarm',
    method: 'PUT',
    data: query
  })
}
//获取当前用户告警配置
export function getAlarmSetting() {
  return request({
    url: '/mrbsservice/business/alarm/monitor/getAlarmConfigData',
    method: 'get'
  })
}
//获取告警间隔时间
export function getAlarmSettingTime(query) {
  return request({
    url: '/mrbsservice/system/dict/data/type/base_voice_time_interval',
    method: 'get'
  })
}
export function upLoadSetting(query) {
  return request({
    url: '/mrbsservice/business/alarm/monitor/updateOrInsertAlarmConfigData',
    method: 'post',
    data: query
  })
}

//获取告警监控数据
export function getAlarmWatchData(query,meterCats) {
  return request({
    url: `/mrbsservice/business/alarm/monitor/data/${meterCats}`,
    method: 'post',
    data: query
  })
}

// 获取告警监控表格数据
export function getTableList(query) {
  return request({
    url: '/mrbsservice/business/alarm/monitor/table',
    method: 'post',
    data: query
  })
}

// 楼层树
export function getAreaTree(query) {
  return request({
    url: '/mrbsservice/areaTree/areaTree',
    method: 'get',
    params: query
  })
}

// 接触告警
export function removeAlarm(query) {
  return request({
    url: '/mrbsservice/business/alarm/monitor/removeAlarm',
    method: 'put',
    data: query
  })
}

// 获取仪表类别告警统计数据
export function getMeterCount(query) {
  return request({
    url: `/mrbsservice/business/alarm/monitor/meter/cat`,
    method: 'post',
    data: query
  })
}
// 解除监控
export function cancelAlarm(query){
  return request({
    url: `/mrbsservice/business/alarm/monitor/removeAlarm`,
    method: 'put',
    data: query
  })
}