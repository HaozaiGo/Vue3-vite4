

<template>
  <section class="app-main-container">
  
    <transition mode="out-in" name="fade-transform" v-if="!show">
      <keep-alive>
        <router-view
          class="app-main-height"
          :key="key"
          v-if="this.$route.meta.keepAlive"
          :style="{ height: baseSettings.OverallHeight  + 'px' }"
        />
      </keep-alive>
    </transition>
    <transition mode="out-in" name="fade-transform">
      <router-view :key="key" v-if="!this.$route.meta.keepAlive"  :style="{ height: baseSettings.OverallHeight + 'px' }"></router-view>
    </transition>

    <!-- <footer v-if="footerCopyright" class="footer-copyright">
      Copyright
      <vab-icon :icon="['fas', 'copyright']"></vab-icon>
      {{ title }} {{ fullYear }} by {{ copyright }}
    </footer> -->
  </section>
</template>

<script>
// import { VabKeel, VabKeelHeading, VabKeelText } from "@/plugins/vabKeel";

// import GithubCorner from "@/components/GithubCorner";
import settings from "@/config/settings.js";
import {baseSettings} from '@/stores/counter'

export default {
  name: "AppMain",
  components: {
    // VabKeel,
    // VabKeelHeading,
    // VabKeelText,
    // GithubCorner,
  },
  data() {
    return {
      show: true,
      fullYear: new Date().getFullYear(),
      title: settings.title,
      routerView: true,
      baseSettings:baseSettings()
    };
  },
  computed: {
    // ...mapGetters({
    //   OverallHeight: "settings/OverallHeight",
    //   visitedRoutes: "tagsBar/visitedRoutes",
    //   device: "settings/device",
    //   skeleton: "settings/skeleton",
    // }),
  
    cachedRoutes() {
      const cachedRoutesArr = [];
      this.visitedRoutes.forEach((item) => {
        if (!item.meta.noKeepAlive) {
          cachedRoutesArr.push(item.name);
          this.handleSkeleton();
        }
      });

      return cachedRoutesArr;
    },
    key() {
      return this.$route.path;
    },
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        // console.log("val", val.meta.keepAlive);
        // console.log("val1", val.meta.keepAlive1);
        // console.log("oldVal", oldVal.meta.keepAlive);
        // console.log("oldVal1", oldVal.meta.keepAlive1);
        // console.log("cachedRoutes", this.cachedRoutes);
        if ("mobile" === this.device) {
          this.$store.dispatch("settings/foldSideBar");
        }
      },
      immediate: true,
    },
  },
  created() {
    //重载所有路由
    // this.$baseEventBus.$on("reloadRouterView", () => {
    //   this.routerView = false;
    //   this.$nextTick(() => {
    //     this.routerView = true;
    //     // this.$router.go(0);
    //     this.handleSkeleton();
    //   });
    // });
  },
  mounted() {
    this.handleSkeleton();
   
  },
  methods: {
    handleSkeleton() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: calc(100vh - $base-nav-bar-height - $base-tags-bar-height);

  .app-main-height {
    min-height: $base-app-main-height;
  }

  .footer-copyright {
    min-height: 55px;
    line-height: 55px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    border-top: 1px dashed $base-border-color;
  }
}
</style>
