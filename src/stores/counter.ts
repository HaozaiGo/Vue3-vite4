/*
 * @Author: xiaoHao
 */

import { ref, computed } from "vue";
import { defineStore } from "pinia";
import settings from '@/config/settings.js'

// 例子
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});


export const baseSettings = defineStore('baseSettings', {
  state: () => ({
    OverallHeight: window.innerHeight - 45,
    visitedRoutes: [], //tab的路由
    routes: [], //初始加载路由
    collapse: false, //菜单属性
    header: settings.header, //自定义 header
    tagsBar: settings.tagsBar, //多标签页




  }),
  getters: {
    double: (state) => state.OverallHeight * 2,
    addVisitedRoute: (state) => {
      return (route: any) => {
        if (state.visitedRoutes.some((item: any) => item.path === route.path)) return;
        state.visitedRoutes.push(Object.assign({}, route));
      }

    }
  },

  actions: {
    setRoute(route: any) {
      console.log(route);

      this.routes = this.routes.concat(route)
    }

  },
})