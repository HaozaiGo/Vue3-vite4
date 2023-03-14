<!--
 * @Author: your name
 * @Date: 2021-12-14 17:36:00
 * @LastEditTime: 2023-03-03 15:52:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-Mrbs-Service\src\views\zx-layouts\SideBar\components\Submenu.vue
-->

<template>
  <el-submenu
    ref="subMenu"
    :index="handlePath(item.path)"
    :popper-append-to-body="false"
    class="submenuSty"
    @click.native="handleClickSizeBar(item)"
    :class="{ resetBackground: isIndex }"
  >
  <div>123</div>
    <template slot="title">
      
      <!-- <vab-icon
        v-if="item.meta && item.meta.icon"
        :icon="['fas', item.meta.icon]"
        class="vab-nav-icon"
      />
      <vab-remix-icon
        v-if="item.meta && item.meta.remixIcon"
        :icon-class="item.meta.remixIcon"
        class="vab-nav-icon"
      />
     
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="item.meta.icon"></use>
      </svg> -->
      <span style="display: block">{{ item.meta.title }}</span>
    </template>
    <!-- 展开框 -->
    <slot :flag="flag"> </slot>
  </el-submenu>
</template>

<script>
import { isExternal } from "@/utils/validate";
import path from "path-browserify";
// import { mapGetters } from "vuex";

export default {
  name: "Submenu",
  data() {
    return {
      flag: false, //展开侧拉菜单
      lastItem: "", //上一个点击菜单
    };
  },
  props: {
    onlyOneChildren: {
      type: Object,
      default() {
        return null;
      },
    },
    item: {
      type: Object,
      default() {
        return null;
      },
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  watch: {
    isIndex(val) {},
  },
  computed: {
   
    // ...mapGetters({
    //   isIndex: "settings/isIndex",
    // }),
  },
  mounted() {
    console.log(this.item);
    // this.lastItem = this.$refs.subMenu.$refs['submenu-title'].innerText;
  },
  methods: {
    handlePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },

    handleClickSizeBar(item) {
      // 判断是否点同一个 关闭侧拉
      let lastItem = window.localStorage.getItem("lastItem");

      if (item.meta.title == lastItem) {
        this.$refs.subMenu.$children[0].changeFlag(false);
        window.localStorage.setItem("lastItem", ""); //存入上一个空的tit
      } else {
        this.$refs.subMenu.$children[0].changeFlag(true);

        this.$store.commit("settings/changeIsIndex", false);

        window.localStorage.setItem("lastItem", item.meta.title); //存入上一个title
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.submenuSty {
  height: 62px;
  margin-top: 10px;
}
</style>
<style scoped>

.resetBackground :deep(.el-submenu__title){
  color: #424561 !important;
}
</style>
