<!--
 * @Author: your name
 * @Date: 2021-12-14 17:36:00
 * @LastEditTime: 2023-03-03 11:11:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-Mrbs-Service\src\views\zx-layouts\SideBar\components\MenuItem.vue
-->
<template>
  <el-menu-item
    @click.native="handleLink"
    :index="handlePath(onlyOneChildren.path)"
    :class="{ isActive: isIndex }"
    style=""
  >
    <!-- <i style="font-size: 27px" :class="'iconfont '+onlyOneChildren.meta.icon"></i> -->
    <svg class="icon indexIcon" aria-hidden="true">
      <use :xlink:href="onlyOneChildren.meta.icon"></use>
    </svg>
    <template slot="title">
      <vab-icon
        v-if="onlyOneChildren.meta.icon"
        :icon="['fas', onlyOneChildren.meta.icon]"
        class="vab-nav-icon"
      />
      <vab-remix-icon
        v-if="onlyOneChildren.meta.remixIcon"
        :icon-class="onlyOneChildren.meta.remixIcon"
        class="vab-nav-icon"
      />
      <span slot="title">{{ onlyOneChildren.meta.title }}</span>
      <!-- <el-tag
        v-if="onlyOneChildren.meta && onlyOneChildren.meta.badge"
        type="danger"
        effect="dark"
      >{{ onlyOneChildren.meta.badge }}</el-tag>-->
    </template>
  </el-menu-item>
</template>

<script>
import { isExternal } from "@/utils/validate";
import path from "path-browserify";


export default {
  name: "MenuItem",
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
    handleLink() {
      this.$store.commit("settings/changeIsIndex", true);
      this.$store.commit("settings/changeFlag", false);

      const routePath = this.onlyOneChildren.path;
      const target = this.onlyOneChildren.meta.path;
      if (this.$route.path !== path.resolve(this.basePath, routePath)) {
        if (target === "_blank") {
          if (isExternal(routePath)) {
            window.open(routePath);
          }
          if (isExternal(this.basePath)) {
            window.open(routePath);
          }
          let routeData = this.$router.resolve(
            path.resolve(this.basePath, routePath)
          );
          window.open(routeData.href);
        } else {
          if (isExternal(routePath)) {
            window.location.href = routePath;
          }
          if (isExternal(this.basePath)) {
            window.location.href = routePath;
          }
          this.$router.push(path.resolve(this.basePath, routePath));
        }
      }
    },
  },
  computed: {
    // ...mapGetters({
    //   isIndex: "settings/isIndex",
    // }),
  },
};
</script>
<style scoped>
.indexIcon {
  margin: 0 auto;
  display: block;
  margin-top: 10px;
}
.isActive {
}
</style>