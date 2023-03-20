<!--
 * @Author: xiaoHao
-->
<template>
  <div class="container">
    <button @click="childAdd">子组件++</button>
    <div>{{ page }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  page: Number
})
const emit = defineEmits(["pageFn","clickChild"]);
const childAdd = ()=>{
  emit('pageFn',props.page)
}
const childFn = ()=>{
  console.log('this is childFn');
}

defineExpose({
  childFn
})
</script>
<style lang="scss" scoped></style>

