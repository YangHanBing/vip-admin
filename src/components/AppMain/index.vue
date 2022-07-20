<template>
 <div class="main">
   <App_link v-show="$route.path!=='/home'"></App_link>
    <router-view></router-view>
  </div>
</template>

<script>
import App_link from "./link";
export default {
  name: "",
  components: {
    App_link
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang='scss'>
.main {
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 0;
  padding: 20px;
  left: 200px;
  overflow: auto
}
</style>
