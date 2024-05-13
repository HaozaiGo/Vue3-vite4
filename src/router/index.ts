/*
 * @Author: xiaoHao
 */

import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layouts/index.vue";
import setting from "@/config/settings.js";
import { vueRouter } from "./global";

// 公共路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    hidden: true,
  },
  // 数据大屏
  {
    path: "/SystemView",
    component: () => import("@/views/pages/systemView/index.vue"),
    hidden: true,
  },
  {
    path: "/404",
    component: (resolve: any) => import("@/views/status/404.vue"),
    hidden: true,
  },
  {
    path: "",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        component: (resolve: any) => import("@/views/index/index.vue"),
        // component: (resolve:any) => require("@/views/index/index"),
        name: "首页",
        meta: { title: "首页", icon: "#icon-shouye", noCache: true, affix: true }
      },
      ...vueRouter(),
    ],
  },

];


const router = createRouter({
  // import.meta.env.BASE_URL
  history: createWebHistory(setting.publicPath),
  routes: constantRoutes,
  // [
  //   {
  //     path: "/about",
  //     name: "about",
  //     // route level code-splitting
  //     // this generates a separate chunk (About.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import("../views/AboutView.vue"),
  //   },
  // ],
});
/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;
