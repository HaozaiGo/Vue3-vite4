<template>
  <div class="vue-admin-beautiful-wrapper" :class="classObj">
    <!-- 水平布局 -->
    <div
      v-if="layout === 'horizontal'"
      class="layout-container-horizontal"
      :class="{
        fixed: header === 'fixed',
        'no-tags-bar': tagsBar === 'false' || tagsBar === false,
      }"
    >
      <div :class="header === 'fixed' ? 'fixed-header' : ''">
        <top-bar></top-bar>
        <div
          v-if="tagsBar === 'true' || tagsBar === true"
          :class="{ 'tag-view-show': tagsBar }"
        >
          <div class="vab-main">
            <tags-bar></tags-bar>
          </div>
        </div>
      </div>
      <div class="vab-main main-padding">
        <app-main></app-main>
      </div>
    </div>
    <div
      v-else
      class="layout-container-vertical"
      :class="{
        fixed: header === 'fixed',
        'no-tags-bar': tagsBar === 'false' || tagsBar === false,
      }"
    >
      <div
        v-if="device === 'mobile' && collapse === false"
        class="mask"
        @click="handleFoldSideBar"
      />
      <side-bar></side-bar>
      <div class="vab-main" :class="collapse ? 'is-collapse-main' : ''">
        <div :class="header === 'fixed' ? 'fixed-header' : ''">
          <nav-bar></nav-bar>
          <tags-bar v-if="tagsBar === 'true' || tagsBar === true" />
        </div>
        <app-main></app-main>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
// import { AppMain, NavBar, SideBar, TagsBar, TopBar } from "./components/index.js";
import {
  NavBar,
  TopBar,
  SideBar,
  TagsBar,
  AppMain,
} from "./components/index.js";
import settings from "@/config/settings.js";
import Media from "./mixin/Media";
import { mapState } from "pinia";
import { baseSettings } from "@/stores/counter";
export default {
  name: "Layout",
  components: {
    TopBar,
    NavBar,
    SideBar,
    TagsBar,
    AppMain,
    // TagsBar,
  },
  mixins: [Media],
  data() {
    return {
      device: "",
      layout: "",
    };
  },
  computed: {
    ...mapState(baseSettings, ["collapse", "header", "tagsBar"]),
    classObj() {
      return {
        mobile: this.device === "mobile",
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener(
        "storage",
        (e) => {
          if (e.key === settings.tokenName || e.key === null)
            window.location.reload();
          if (e.key === settings.tokenName && e.value === null)
            window.location.reload();
        },
        false
      );

      // console.log(this.tagsBar);
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: $base-z-index - 2;
  width: 100%;
  overflow: hidden;
}

.vue-admin-beautiful-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;

  .layout-container-horizontal {
    position: relative;

    &.fixed {
      padding-top: calc(#{$base-top-bar-height} + #{$base-tags-bar-height});
    }

    &.fixed.no-tags-bar {
      padding-top: $base-top-bar-height;
    }

    // :deep{
    //   .vab-main {
    //     width: 88%;
    //     margin: auto;
    //   }

    //   .fixed-header {
    //     @include fix-header;
    //   }

    //   .tag-view-show {
    //     background: $base-color-white;
    //     box-shadow: $base-box-shadow;
    //   }

    //   .nav-bar-container {
    //     .fold-unfold {
    //       display: none;
    //     }
    //   }
    //   .main-padding {
    //     margin-top: 15px;
    //     margin-bottom: 15px;

    //     .app-main-container {
    //       min-height: calc(100vh - 180px);
    //       background: $base-color-white;
    //     }
    //   }
    // }
  }

  .layout-container-vertical {
    position: relative;

    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: $base-z-index - 1;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
      opacity: 0.5;
    }

    &.fixed {
      padding-top: calc(#{$base-nav-bar-height} + #{$base-tags-bar-height});
      background: $base-color-black1;
      height: 100%;
    }

    &.fixed.no-tags-bar {
      padding-top: $base-nav-bar-height;
    }

    .vab-main {
      position: relative;
      top: $base-nav-bar-height;
      height: calc(100vh - $base-nav-bar-height);
      margin-left: $base-left-menu-width;
      background: #f6f8f9;
      transition: $base-transition;

      &.is-collapse-main {
        margin-left: $base-left-menu-width-min;

        :deep(.fixed-header) {
          left: 0px;
          width: 100%;
        }
      }
    }
  }

  /* 手机端开始 */
  &.mobile {
    // :deep(){
    //   .el-pager,
    //   .el-pagination__jump {
    //     display: none;
    //   }

    //   .layout-container-vertical {
    //     .el-scrollbar .side-bar-container .is-collapse {
    //       width: 0;
    //     }

    //     .vab-main {
    //       width: 100%;
    //       margin-left: 0;
    //     }
    //   }

    //   .vab-main {
    //     .fixed-header {
    //       left: 0 !important;
    //       width: 100% !important;
    //     }
    //   }
    // }
  }

  /* 手机端结束 */
}
</style>
<style>
.vab-main
  .tags-bar-container
  .tags-content
  .el-tabs__header
  .el-tabs__item.is-active {
  height: 38px !important;
  color: #464645 !important;
  background: #273142 !important;
  background: #eff2f7 !important;
  border-radius: 2px 2px 0px 0px;
  border-right: 1px solid #000;
}
</style>
