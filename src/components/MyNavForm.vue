<template>
  <div>
    <el-form :inline="true" ref="memberInfo" :model="model">
      <template v-for="item in column">
        <el-form-item v-if="item.type=='input'" v-bind="item">
          <el-input v-model.trim="model[item.prop]" v-bind="item"></el-input>
        </el-form-item>
        <el-form-item v-if="item.type=='select'" v-bind="item">
          <el-select v-model.trim="model[item.prop]" v-bind="item" :style="item.style">
            <el-option v-for="item in item.payType" :key="item.type" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="item.type=='data-picker'" v-bind="item">
          <el-date-picker v-model.trim="model[item.prop]" value-format="item.value_format" v-bind="item" type="date">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="item.type=='action'" v-bind="item">
          <template v-for="item in item.buttons">
            <el-button v-bind="item" @click="throttle(item.action)">{{item.text}}</el-button>
          </template>
        </el-form-item>
        <el-form-item v-if="item.type=='chose'" v-bind="item">
          <el-input @click.native="handleDialog" readonly v-bind="item" v-model.trim="model[item.prop]"></el-input>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  props: {
    model: {
      type: Object,
      default: () => {},
    },
    column: {
      type: Array,
      default: () => [],
    },
  },
  created() {},
  mounted() {},
  methods: {
    //实现节流功能
    throttle: _.throttle(
      function(action) {
        this.handleFormAction(action)
      },
      1000,
      {
        leading: true, //指定调用在节流开始前
        trailing: false, //指定调用在节流结束后,
      }
    ),
    handleFormAction(action) {
      this.$emit('handleFormAction', action)
    },
    handleReset() {
      this.$refs['memberInfo'].resetFields()
    },
    handleDialog(){
      this.$emit('handleDialog',"search")
    }
  },
}
</script>
<style scoped lang='scss'>
</style>
