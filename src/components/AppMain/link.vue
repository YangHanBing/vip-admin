<template>
<div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item  class="breadcrumb">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
    }
  },
  created () { },
  mounted () { },
  methods: {}
}
</script>
<style scoped lang='scss'>
.el-breadcrumb{
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 #eee;
    margin-bottom: 20px;
}
.breadcrumb{
    padding-left: 20px;
    border-left: 3px solid #31c17b;
}
</style>
