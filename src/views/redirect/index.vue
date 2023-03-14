<!--
 * @Author: xiaoHao
-->
<script>
export default {
  name: "Redirect",
  watch: {
    $route: {
      handler(route) {
        console.log(route);
        const { params, query } = this.$route;
        const { path } = params;
        console.log(path, query);
        this.$router.replace({ path: "/" + path, query });
      },
      immediate: true,
    },
  },
  render(h) {
    return h();
  },
};
</script>
