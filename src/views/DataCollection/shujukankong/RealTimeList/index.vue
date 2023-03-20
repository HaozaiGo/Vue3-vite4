<!--
 * @Author: xiaoHao
-->

<template>
  <div class="container">
    <h1>实时数据</h1>
    <Child :page="page" @pageFn="pageFn" @click="clickChild" ref="child"></Child>
    
  </div>
</template>
<script lang="ts">
export default{
  name:"RealTimeList",
  isComponents:false,
  isRouter:true
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import Child from './child.vue'

const page = ref(1);
const child = ref()

const pageFn = (val) =>{

  page.value += val
}

function clickChild(){
  child.value.childFn()

  
}

</script>
<style lang="scss" scoped></style>
