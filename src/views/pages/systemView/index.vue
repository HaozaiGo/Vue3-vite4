<template>
  <div class="container">
    <Map></Map>
  </div>
</template>

<script>
import Map from "./component/chinaMap.vue";
export default {
  components: { Map },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  height: 100vh;
  background: #03044A;
}
</style>