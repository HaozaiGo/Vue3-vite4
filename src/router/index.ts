/*
 * @Author: xiaoHao
 */


import { createRouter, createWebHistory } from "vue-router";
 import Layout from "@/layouts/index.vue" ;
 import setting from '@/config/settings.js';
import {vueRouter} from './global'



// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve:any) => import("@/views/redirect.vue",resolve),
      }
    ]
  },
  {
    path: '/login',
    component: () => import("@/views/login/index.vue"),
    hidden: true
  },
  {
    path: '/system',
    component: () => import("@/views/login/index.vue"),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve:any) => import("@/views/status/404.vue"),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve:any) => import("@/views/staus/401.vue"),
    hidden: true
  },
  {
    path: '/API',
    component: (resolve:any) => require('@/views/BasicInformation/APIInterface/index'),
    hidden: true
  },
  {
    path: '/SystemReg',
    component: (resolve:any) => require('@/views/system/SystemReg/index'),
    hidden: true
  },
  {
    path: '/',
    component: () => import("@/views/login/index.vue"),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve:any) => import("@/views/index/index.vue"),
        // component: (resolve:any) => require('@/views/index/index'),
        name: '首页',
        meta: { title: '首页', icon: '#icon-shouye', noCache: true, affix: true }
      },
      ...vueRouter()
      
    ]
  },
]

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

export default router;
