<!--
 * @Author: xiaoHao
-->
<template>
  <div class="sideBar_container">
    <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-menu-item index="0">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-sub-menu v-for="(item, index) in data.routes" :index="String(index + 1)">
        <template #title>
          <el-icon>
            <setting />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 第二级菜单 -->
        <el-sub-menu v-for="(children, idx) in item.children" :index="children.name" >
          <template #title>{{ children.meta.title }}</template>
          <!-- 三级菜单 -->
          <el-menu-item v-for="(menu, idx2) in children.children" :index="menu.name" @click="handleClickRoute(item,children,menu)">
            <template #title >
              <span>{{ menu.meta.title }}</span>
            </template>
        </el-menu-item>
      </el-sub-menu>
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
} from '@element-plus/icons-vue'
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
const data = reactive({
  routes: JSON.parse(localStorage.getItem('routes'))
})
onBeforeMount(() => {

})
onMounted(() => {

})
const handleClickRoute = (item,children,menu)=>{
 
  const menuRes = item.name + '/' + children.path + '/' + menu.path

    router.push({path:menuRes})
  
}



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
.sideBar_container::-webkit-scrollbar { width: 0 !important }
</style>
