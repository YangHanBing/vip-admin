<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px">
        <template v-for="item in dialogFormColumn">
          <el-form-item v-if="item.type=='input'" v-bind="item">
            <el-input v-model.trim="addInfo[item.prop]" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type=='date-picker'" v-bind="item">
            <el-date-picker v-model.trim="addInfo[item.prop]" :value-format="item.value_format" v-bind="item" type="date">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="item.type=='select'" v-bind="item">
            <el-select v-model.trim="addInfo[item.prop]" v-bind="item" :style="item.style">
              <el-option v-for="(item,index) in item.payType" :key="index" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="item.type=='textarea'" v-bind="item">
            <el-input v-model.trim="addInfo[item.prop]" v-bind="item"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type=='chose'" v-bind="item">
            <el-input @click.native="handleForm" readonly v-bind="item" v-model.trim="addInfo[item.prop]"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleAddOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    addInfo: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
    dialogFormColumn: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    // 模态框取消事件
    handleClose() {
      this.$emit('handleClose')
      this.$refs['addInfo'].resetFields()
    },
    //模态框确定事件
    handleAddOk() {
      this.$emit('handleAddOk')
    },
    //打开供应商选择
    handleForm(){
      this.$emit("handleForm","add")
    },
  },
}
</script>
<style scoped lang='scss'>
</style>
