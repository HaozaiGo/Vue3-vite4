<!--
 * @Author: xiaohao
 * @Date: 2021-12-20 17:01:55
 * @LastEditTime: 2023-03-01 14:17:01
 * @LastEditors: Please set LastEditors
 * @Description: 一个侧拉菜单
 * @FilePath: \vue-Mrbs-Service\src\views\zx-layouts\SideBar\components\dropItem.vue
-->
<template>
  <div
    class="dropContent"
    style="padding: 20px 0px !important; width: 120px"
    :style="
      flag ? `visibility:visible;opacity:1` : `visibility:hidden;opacity:0`
    "
    ref="dropContent"
    @click.stop="handleClickDrop"
  >
    <ul style="width: 100%" v-if="showTextStatus">
      <li
        v-for="(item, index) in route.children"
        :key="index"
        @click="handleShowThreeRouter(item, index)"
        class="liSty"
      >
        <span class="font_point"></span>
        <span class="secondItemSty">{{ item.meta.title }}</span>
        <span class="font_point"></span>

        <div class="threeTab">
          <ul>
            <li
              v-for="(routes, index2) in item.children"
              :key="routes.meta.title"
              @click="handleClickRouter(item.path, routes)"
              :style="
                threeItem == routes.meta.title
                  ? `background:#CED4DE `
                  : `background:none`
              "
            >
              <span
                class="fontWeight"
                :style="{
                  color:
                    threeItem == routes.meta.title
                      ? `#3D62EC !important`
                      : routes.meta.colorFlag
                      ? `#434f64!important`
                      : `#434f64`,
                }"
                >{{ routes.meta.title }}</span
              >
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showTextStatus: false,
      flag: false,
      secondItem: null, //2级菜单选择
      threeItem: null, //3级菜单
    };
  },
  watch: {
    flag: function (val) {
      if (this.isIndex) {
        this.showTextStatus = false;
        return;
      }
      this.$store.commit("settings/changeFlag", val);

      if (val) {
        this.showText();
      } else if (!val) {
        this.showTextStatus = false;
        this.$store.commit("settings/changeIsIndex", true);
      }
    },
    isIndex: function () {
      this.flag = !this.isIndex;
    },
  },
  mounted() {
    window.localStorage.setItem("lastItem", "");
  },
  computed: {
    // ...mapGetters({
    //   isIndex: "settings/isIndex",
    // }),
  },
  props: {
    route: {
      type: Object,
    },
  },
  created() {},
  methods: {
    handleClickDrop() {
      // 此处需要阻止冒泡
    },
    handleShowThreeRouter(item, index) {
      this.secondItem = index;
    },
    changeFlag(status) {
      this.flag = status;
    },

    showText() {
      setTimeout(() => {
        this.showTextStatus = true;
      }, 100);
    },
    pathCompile(path) {
      const { params } = this.$route;
      const toPath = compile(path);
      return toPath(params);
    },
    handleClickRouter(path, routes) {
      // if(!routes.meta.colorFlag) return; //未完成拦截

      const result = this.route.name + "/" + path + "/" + routes.path;

      this.threeItem = routes.meta.title;

      this.$router.push(result);
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
.liSty {
  padding: 0px 10px 0px 10px;
  border-bottom: solid 1px #cacaca;
}
.secondItemSty {
  font-weight: bold;
  font-size: 14px;
  color: #2952ef !important;
}
li {
  border-radius: 3px;
  text-align: center;
  line-height: 20px;
  padding: 0 10px;
  margin: 15px 10px 25px 10px;
  display: block;

  cursor: pointer;
}
li:hover {
  // background: #cecfd6;
}

.dropContent {
  overflow-x: auto;
  scrollbar-width: none;
  background: #eaeaef !important;
  border-right: 1px solid #cacaca;
  padding-top: 20px !important;
  // width: 0px;
  margin-left: 5px !important;
  position: fixed;
  left: 75px;
  top: 45px;
  height: 100vh;
  transition: all 0.1s linear;
}
.dropContent::-webkit-scrollbar {
  display: none;
}
.font_point {
  background: #2952ef !important;
  width: 7px;
  height: 2px;
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
}
.threeTab {
  background: #eaeaef !important;
  width: 100px !important;
  transition: all 0.5s;
  // height: 0px;
  // min-height: 0px;
  overflow: hidden;
  margin-left: -10px !important;
  margin-top: 5px;
  ul {
    width: 100%;
    li {
      margin: 15px 0px;
      line-height: 30px;
      width: 100px;
    }
  }
}
.fontWeight {
  font-weight: normal !important;
}
</style>