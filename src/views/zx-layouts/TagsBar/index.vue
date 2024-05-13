<template>
  <div
    id="tags-bar-container"
    class="tags-bar-container"
    :style="{ left: !flag ? '0px' : '100px' }"
  >
    <el-tabs
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
      v-model="tabActive"
      type="card"
      class="tags-content"
      :stretch="false"
    >
      <el-tab-pane
        v-for="(item, index) in visitedRoutes1"
        :key="index"
        :label="item.meta.title"
        :name="item.path"
        :closable="visitedRoutes1.length != 1 && item.meta.title != '首页'"
      >
        <span slot="label">
          <i
            v-show="item.meta.title != '首页'"
            class="Tabs-i el-icon-star-off"
            style="color: rgba(0, 145, 255, 1)"
            @click="changeFavorites(item, index)"
          ></i>
          {{ item.meta.title }}
        </span></el-tab-pane
      >
    </el-tabs>
    <el-dropdown
      @command="handleCommand"
      style="position: absolute; right: 120px"
      :style="{ right: flag ? '230px' : '120px' }"
    >
      <span style="cursor: pointer">
        更多操作
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="tags-more">
        <!-- <el-dropdown-item command="refreshRoute">
          <vab-icon :icon="['fas', 'circle-notch']" />刷新
        </el-dropdown-item> -->
        <el-dropdown-item command="closeOthersTags">
          <vab-icon :icon="['fas', 'times-circle']" />关闭其他
        </el-dropdown-item>
        <el-dropdown-item command="closeLeftTags">
          <vab-icon :icon="['fas', 'arrow-alt-circle-left']"></vab-icon>关闭左侧
        </el-dropdown-item>
        <el-dropdown-item command="closeRightTags">
          <vab-icon :icon="['fas', 'arrow-alt-circle-right']"></vab-icon
          >关闭右侧
        </el-dropdown-item>
        <el-dropdown-item command="closeAllTags">
          <vab-icon :icon="['fas', 'ban']"></vab-icon>关闭全部
        </el-dropdown-item>
        <!-- <el-dropdown-item command="ClearCache">
          <vab-icon :icon="['fas', 'redo']"></vab-icon>清除缓存
        </el-dropdown-item> -->
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import path from "path";

import {
  DeleteFavorites,
  AddFavorites,
} from "@/api/common/router.js";
import { baseSettings } from "@/stores/counter";

export default {
  name: "TagsBar",
  data() {
    return {
      visitedRoutes1: [],
      affixTags: [],
      tabActive: "",
      checkList: [],
      List: [],
      flag: false,
      settings: baseSettings(),
    };
  },

  computed: {
    routes() {
      return this.settings.routes;
    },
    // ...mapGetters({
    //   visitedRoutes: "tagsBar/visitedRoutes",
    //   routes: "routes/routes",
    // }),
  },
  created() {},
  watch: {
    $route: {
      handler(route) {
        this.initTags();
        this.addTags();
        // getFavorites().then((res) => {
        //   this.List = res.data;
        //   this.visitedRoutes1 = this.List;
        //   let tabActive = "";
        //   this.checkList = [];
        //   this.visitedRoutes1.forEach((item, index) => {
        //     this.checkList.push(0);
        //     this.List.forEach((res) => {
        //       if (res.meta.title == item.meta.title) {
        //         this.checkList[index] = 1;
        //         item.Favorites = true;
        //         document.getElementsByClassName("Tabs-i")[index].className =
        //           "Tabs-i el-icon-star-on";
        //       }
        //     });
        //     if (item.path === this.$route.path) {
        //       tabActive = item.path;
        //     }
        //   });
        //   this.tabActive = tabActive;
        // });
      },
      immediate: true,
    },

    visitedRoutes: function () {
      this.visitedRoutes1 = this.visitedRoutes;
    },
  },
  mounted() {
    //  console.log(this.settings.routes);
    this.visitedRoutes1 = this.visitedRoutes;
    // getFavorites().then((res) => {
    //   this.List = res.data;
    //   let tabActive = "";
    //   this.checkList = [];
    //   res.data.forEach((item, index) => {
    //     var arr = JSON.parse(window.localStorage.getItem("routes"));
    //     var path = "";
    //     var path1 = "";
    //     var path2 = "";
    //     arr.forEach((res) => {
    //       if (res.meta != undefined && res.meta.title == item.meta.title) {
    //       }
    //       res.children.forEach((res1) => {
    //         if (res1.meta != undefined && res1.meta.title == item.meta.title) {
    //         }
    //         res1.children.forEach((res2) => {
    //           if (
    //             res2.meta != undefined &&
    //             res2.meta.title == item.meta.title
    //           ) {
    //             path = res.path.split("/")[res.path.split("/").length - 1];
    //             path1 = res1.path;
    //             path2 = res2.path;
    //           }
    //         });
    //       });
    //       item.path = "/" + path + "/" + path1 + "/" + path2;
    //     });
    //     if (item.path === this.$route.path) {
    //     } else {
    //       this.visitedRoutes1.push(item);
    //     }
    //   });
    //   setTimeout(() => {
    //     this.visitedRoutes1.forEach((item, index) => {
    //       this.List.forEach((res) => {
    //         if (res.meta.title == item.meta.title) {
    //           item.Favorites = true;
    //           document.getElementsByClassName("Tabs-i")[index].className =
    //             "Tabs-i el-icon-star-on";
    //         }
    //       });
    //     });
    //   }, 500);
    // });
  },
  methods: {
    changeFavorites(item, index) {
      if (this.List.length == 10 && this.checkList[index] == 0) {
        this.$baseMessage("收藏超过10个,无法新增", "error");
        return;
      }
      var arr = JSON.parse(window.localStorage.getItem("routes"));
      var id = "";
      arr.forEach((res) => {
        if (res.meta != undefined && res.meta.title == item.meta.title) {
          id = res.meta.menuId;
        }
        res.children.forEach((res1) => {
          if (res1.meta != undefined && res1.meta.title == item.meta.title) {
            id = res1.meta.menuId;
          }
          res1.children.forEach((res2) => {
            if (res2.meta != undefined && res2.meta.title == item.meta.title) {
              id = res2.meta.menuId;
            }
          });
        });
      });
      if (this.checkList[index] == 0) {
        this.checkList[index] = 1;
        item.Favorites = true;
        document.getElementsByClassName("Tabs-i")[index].className =
          "Tabs-i el-icon-star-on";
      } else {
        this.checkList[index] = 0;
        item.Favorites = false;
        document.getElementsByClassName("Tabs-i")[index].className =
          "Tabs-i el-icon-star-off";
      }
      if (this.checkList[index] == 1) {
        let body = {
          menuId: id,
        };
        AddFavorites(body).then((res) => {
          getFavorites().then((res) => {
            this.List = res.data;
          });
        });
      } else {
        let body1 = { menuId: id };
        DeleteFavorites(body1).then((res) => {
          getFavorites().then((res) => {
            this.List = res.data;
          });
        });
      }
    },
    async handleTabRemove(tabActive) {
      if (this.visitedRoutes1.length == 1) {
        return;
      }
      let view;
      this.visitedRoutes1.forEach((item, index) => {
        if (tabActive == item.path) {
          this.checkList.splice(index, 1);
          view = item;
        }
      });
      const { visitedRoutes } = await this.$store.dispatch(
        "tagsBar/delRoute",
        view
      );
      if (this.isActive(view)) {
        this.toLastView(visitedRoutes, view);
      }
    },
    handleTabClick(tab) {
      const route = this.visitedRoutes1.filter((item, index) => {
        if (tab.index == index) return item;
      })[0];
      if (this.$route.path !== route.path) {
        this.$router.push({
          path: route.path,
          query: route.query,
          fullPath: route.fullPath,
          id: route.id,
        });
      } else {
        return false;
      }
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            id: route.id,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        if (tag.name) {
          this.settings.addVisitedRoute(tag);
        }
      }
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.settings.addVisitedRoute(this.$route);
        // this.$store.dispatch("tagsBar/addVisitedRoute", this.$route);
      }
      return false;
    },
    handleCommand(command) {
      switch (command) {
        case "refreshRoute":
          this.refreshRoute();
          break;
        case "closeOthersTags":
          this.closeOthersTags();
          break;
        case "closeLeftTags":
          this.closeLeftTags();
          break;
        case "closeRightTags":
          this.closeRightTags();
          break;
        case "closeAllTags":
          this.closeAllTags();
        case "ClearCache":
          this.ClearCache();
          break;
      }
    },
    async refreshRoute() {
      this.$baseEventBus.$emit("reloadRouterView");
    },
    async closeSelectedTag(view) {
      const { visitedRoutes } = await this.$store.dispatch(
        "tagsBar/delRoute",
        view
      );
      if (this.isActive(view)) {
        this.toLastView(visitedRoutes, view);
      }
    },
    async closeOthersTags() {
      const arr = this.visitedRoutes1.filter((item, index) => {
        if (item.path === this.$route.fullPath) {
          return item;
        }
      });
      const view = arr[0];
      this.$router.push(view);
      await this.$store.dispatch("tagsBar/delOthersRoutes", view);
    },
    async closeLeftTags() {
      const arr = this.visitedRoutes1.filter((item, index) => {
        if (item.path === this.$route.fullPath) {
          return item;
        }
      });
      const view = arr[0];
      this.$router.push(view);
      await this.$store.dispatch("tagsBar/delLeftRoutes", view);
    },
    async closeRightTags() {
      const arr = this.visitedRoutes1.filter((item, index) => {
        if (item.path === this.$route.fullPath) {
          return item;
        }
      });
      const view = arr[0];
      this.$router.push(view);
      await this.$store.dispatch("tagsBar/delRightRoutes", view);
    },
    async closeAllTags() {
      const arr = this.visitedRoutes1.filter((item, index) => {
        if (item.path === this.$route.fullPath) {
          return item;
        }
      });
      const view = arr[0];
      const { visitedRoutes } = await this.$store.dispatch(
        "tagsBar/delAllRoutes"
      );
      if (this.affixTags.some((tag) => tag.path === view.path)) {
        return;
      }
      this.toLastView(visitedRoutes, view);
    },
    async ClearCache() {
      document
        .getElementsByTagName("head")[0]
        .getElementsByTagName("link")
        .forEach((item) => {
          if (
            item.href.split("?")[0].split(".")[
              item.href.split("?")[0].split(".").length - 1
            ] != "css"
          ) {
            item.href = item.href + "?" + Math.random();
          }
        });
      // setTimeout(() => {
      //   this.$baseMessage("清除缓存成功", "success");
      // }, 500);
    },
    toLastView(visitedRoutes, view) {
      const latestView = visitedRoutes.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView);
      } else {
        if (view.name === "Index") {
          this.$router.replace({ path: "/redirect" + view.fullPath });
        } else {
          this.$router.push("/system");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar-moveStart {
  animation: move 0.3s ease 0s 1;
  -webkit-animation: move 0.3s ease 0s 1;
  left: 200px !important;
}
.nav-bar-moveEnd {
  animation: moveEnd 0.1s ease 0s 1;
  -webkit-animation: moveEnd 0.1s ease 0s 1;
  left: 85px !important;
}
/* 声明动画 关键帧 @keyframes 动画名称{} */
@keyframes move {
  0% {
    left: 85px;
  }
  60% {
    left: 190px;
  }
  100% {
    left: 200px;
  }
}
@-webkit-keyframes move {
  0% {
    left: 85px;
  }
  60% {
    left: 190px;
  }
  100% {
    left: 200px;
  }
}
@-ms-keyframes move {
  0% {
    left: 85px;
  }
  60% {
    left: 190px;
  }
  100% {
    left: 200px;
  }
}
@keyframes moveEnd {
  0% {
    left: 200px;
  }
  20% {
    left: 195x;
  }
  40% {
    left: 180px;
  }
  60% {
    left: 170px;
  }
  100% {
    left: 85px;
  }
}
@-webkit-keyframes moveEnd {
  0% {
    left: 200px;
  }
  60% {
    left: 110px;
  }
  100% {
    left: 85px;
  }
}
@-ms-keyframes moveEnd {
  0% {
    left: 200px;
  }
  60% {
    left: 110px;
  }
  100% {
    left: 85px;
  }
}
.tags-bar-container {
  width: calc(100%);

  box-sizing: border-box;
  height: $base-tags-bar-height;
  user-select: none;
  background: $base-color-white;
  border-top: 1px solid #f6f6f6;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding-left: $base-padding;
  padding-right: $base-padding;

  transition: left 0.3s;

  .tags-content {
    width: calc(100% - 290px);
    height: $base-tag-item-height;
    // background: #CDCED5;
    // :deep{
    //   .el-tabs__nav-next,
    //   .el-tabs__nav-prev {
    //     height: $base-tag-item-height;
    //     line-height: $base-tag-item-height;
    //   }

    //   .el-tabs__header {
    //     border-bottom: 0;

    //     .el-tabs__nav {
    //       border: 0;
    //     }

    //     .el-tabs__item {
    //       height: $base-tag-item-height;
    //       line-height: $base-tag-item-height;
    //       border: 1px solid $base-border-color;
    //       margin-right: 5px;
    //       border-radius: $base-border-radius;
    //       box-sizing: border-box;

    //       &.is-active {
    //         background: $base-color-blue;
    //         color: $base-color-white;
    //         border: 1px solid $base-color-blue;
    //       }

    //       .el-icon-close {
    //         position: relative;
    //         font-size: 12px;
    //         width: 0;
    //         height: 14px;
    //         vertical-align: middle;
    //         line-height: 14px;
    //         overflow: hidden;
    //         top: -1px;
    //         right: -2px;
    //         transform-origin: 100% 50%;
    //       }
    //     }
    //   }
    // }
  }

  .tags-content :deep(.el-tabs__nav-next, .el-tabs__nav-prev) {
    height: $base-tag-item-height;
    line-height: $base-tag-item-height;
  }

  .tags-content :deep(.el-tabs__header) {
    border-bottom: 0;
    & :deep(.el-tabs__nav) {
      border: 0;
    }
    & :deep(.el-tabs__item) {
      height: $base-tag-item-height;
      line-height: $base-tag-item-height;
      border: 1px solid $base-border-color;
      margin-right: 5px;
      border-radius: $base-border-radius;
      box-sizing: border-box;
    }
  }
}
</style>
