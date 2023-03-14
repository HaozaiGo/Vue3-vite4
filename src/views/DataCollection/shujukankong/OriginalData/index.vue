<!--
 * @Author: xiaoHao
-->
<template>
  <div class="container">
    <h1>原始数据</h1>
  </div>
</template>
<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: 'App',
  isRouter:true,
  isComponents:false,
  setup () {

    const data = reactive({})
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    return {
      ...toRefs(data),
    }
  },
}

</script>
<style lang="scss" scoped>

</style>
