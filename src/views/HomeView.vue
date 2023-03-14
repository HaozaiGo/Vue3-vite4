<!--
 * @Author: xiaoHao
-->

<script lang="ts">
// import TheWelcome from "../components/TheWelcome.vue";


export default {
  name:"HomeView",
  data() {

    return {};
  },
  methods: {
    makeWorker() {
      // 获取计算开始的时间
      let start = performance.now();
      const worker = new Worker("workers.js");
      worker.postMessage(0);
      // 监听message事件
      worker.addEventListener("message", (e: any) => {
        // 关闭线程
        worker.terminate();
        // 获取计算结束的时间
        let end = performance.now();
        // 得到总的计算时间
        let durationTime = end - start;
        console.log("计算结果:", e.data);
        console.log(`代码执行了 ${durationTime} 毫秒`);
      });
    },
  },
};
</script>


<template>
  <main>
    <button @click="makeWorker">开始线程</button>
    <!--在计算时 往input输入值时 没有发生卡顿-->
    <p><input type="text" /></p>
    <TheWelcome />
  </main>
</template>
