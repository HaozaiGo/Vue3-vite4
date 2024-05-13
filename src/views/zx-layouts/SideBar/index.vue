<!--
 * @Author: xiaoHao
-->
<template>
  <div class="sideBar_container">
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="0" @click="router.replace('/Index')">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-sub-menu
        v-for="(item, index) in data"
        :index="String(index + 1)"
        :key="index"
      >
        <template #title>
          <el-icon>
            <setting />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 第二级菜单 -->
        <el-menu-item
          v-for="(children, idx) in item.children"
          :index="children.name"
          :key="idx + children.name"
          @click="handleClickMenu(item, children, idx)"
        >
          <template #title>{{ children.meta.title }}</template>
          <!-- 三级菜单 -->
          <!-- <el-menu-item
            v-for="(menu, idx2) in children.children"
            :index="menu.name"
            @click="handleClickRoute(item, children, menu)"
            :key="idx2 + menu.name"
          >
            <template #title>
              <span>{{ menu.meta.title }}</span>
            </template>
          </el-menu-item> -->
        </el-menu-item>

        <!-- <component
          v-for="(children, idx) in item.children"
          :is="children?.children ? 'el-sub-menu' : 'el-menu-item'"
          :index="children.name"
          :key="idx"
          @click="handleClickMenu(item, children, idx)"
        >
          <template #title>{{ children.meta.title }}</template>
       
          <el-menu-item
            v-for="(menu, idx2) in children.children"
            :index="menu.name"
            @click="handleClickRoute(item, children, menu)"
            :key="idx2"
          >
            <template #title>
              <span>{{ menu.meta.title }}</span>
            </template>
          </el-menu-item>
        </component> -->
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { baseSettings } from "@/stores/counter";
const router = useRouter();
const data = JSON.parse(localStorage.getItem("routes"));
const data1 = reactive({
  // routes: JSON.parse(localStorage.getItem("routes")),
  routes: [
    {
      meta: { title: "商家审核" },
      children: [
        {
          meta: { title: "菜单1的子菜单" },
          name: "01",
          children: [{ meta: { title: "菜单1的三级菜单" } }],
        },
      ],
    },
    {
      meta: { title: "店铺管理" },
      children: [
        {
          meta: { title: "菜单1的子菜单" },
          name: "02",
        },
      ],
    },
    {
      meta: { title: "app版本" },
      children: [
        {
          meta: { title: "菜单1的子菜单" },
          name: "03",
        },
      ],
    },
    {
      meta: { title: "用户管理" },
      children: [
        {
          meta: { title: "菜单1的子菜单" },
          name: "04",
        },
      ],
    },
    {
      meta: { title: "滴滴系统" },
      children: [
        {
          meta: { title: "菜单1的子菜单" },
          name: "05",
        },
      ],
    },
    {
      meta: { title: "广告系统" },
      children: [
        {
          meta: { title: "菜单1的子菜单" },
          name: "06",
        },
      ],
    },
    {
      meta: { title: "系统管理" },
      path: "/system",
      children: [
        {
          meta: { title: "用户管理" },
          name: "001",
        },
        {
          meta: { title: "角色管理" },
          name: "002",
        },
        {
          meta: { title: "路由管理" },
          name: "003",
          path: "/route",
        },
        {
          meta: { title: "字典管理" },
          name: "004",
        },
        {
          meta: { title: "参数设置" },
          name: "005",
        },
        {
          meta: { title: "代码生成" },
          name: "006",
        },
      ],
    },
  ],
});
onBeforeMount(() => {});
onMounted(() => {});
const handleOpen = () => {};
const handleClose = () => {};
const handleClickRoute = (item: any, children: any, menu: any) => {
  console.log(item, children, menu);

  const menuRes = item.name + "/" + children.path + "/" + menu.path;

  router.push({ path: menuRes });
};

const handleClickMenu = (item: any, children: any, idx: Number) => {
  if (children.children) return; //只有二级菜单

  const menuRouter = item.path + "/" + children.path;
  router.push({ path: menuRouter });
  console.log(item);
  console.log(children);
  console.log(menuRouter);
};
</script>

<style lang="scss" scoped>
.sideBar_container {
  top: $base-nav-bar-height;
  position: fixed;
  left: 0;
  width: $base-left-menu-width;
  height: calc(100vh - $base-nav-bar-height);
  overflow-y: scroll;
}
.sideBar_container::-webkit-scrollbar {
  width: 0 !important;
}
</style>
