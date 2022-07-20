<style scoped lang='scss'>
</style>
<template>
<div class="box">
  <AppHeader></AppHeader>
  <AppNavBar></AppNavBar>
  <AppMain></AppMain>
</div>
</template>

<script>
import AppHeader from "../components/AppHeader"
import AppNavBar from "../components/AppNavBar"
import AppMain from "../components/AppMain"

export default {
  name: "",
  components: {
    AppHeader,
    AppNavBar,
    AppMain
},
  
  data() {
    return {
      
    };
  },
  created() {},
  mounted() {},
  methods: {
   
  }
};
</script>

