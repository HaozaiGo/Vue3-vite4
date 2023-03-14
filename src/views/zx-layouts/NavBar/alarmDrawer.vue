<!--
 * @Description: xiaoHao
 * @Date: 2022-02-21 14:38:52
 * @LastEditTime: 2022-02-24 11:53:34
 * @FilePath: \vue-Mrbs-Service\src\views\zx-layouts\NavBar\alarmDrawer.vue
-->
<template>
  <div style="z-index: 9999">
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      :before-close="handleCloseDrawer"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  props: {
    showAlarm: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.drawer = this.showAlarm;
  },
  methods: {
    handleCloseDrawer() {
      this.showAlarm = false;
    },
  },
};
</script>

<style>
</style>