<!--
 * @Author: xiaoHao
-->

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import {apiTest} from '@/api/project/lingshi/apiTest.js'

const handleClick = ()=>{
  apiTest()

}
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style scoped>

</style>
