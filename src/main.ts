/*
 * @Author: xiaoHao
 */

import { createApp } from "vue";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import settings from '@/config/settings.js';
import common from '@/utils/common';
import * as echarts from 'echarts';

// element
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from "./App.vue";
import router from "./router";
import { asyncComponent } from "@/router/global";
import "./assets/main.css";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
asyncComponent(app)

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
window.echarts = echarts;

app.config.globalProperties.$com = common;
app.config.globalProperties.$echarts = function (el: any) {
  return echarts.init(el, null, { renderer: 'svg' });
};
app.provide("$echart", echarts);
app.provide("$com", common);

document.title = settings.title + ' ' + (process.env.npm_config_vnum || 'v1.0.0.1');

app.mount("#app");
