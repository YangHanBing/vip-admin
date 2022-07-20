<template>
  <div>
    <el-table height="400" :data="tableDate" border style="width: 100%" @current-change="handleChange">
      <template v-for="item in column">
        <el-table-column v-if="item.type&&item.type!=='action'" v-bind="item">
        </el-table-column>
        <el-table-column v-else-if="!item.type" v-bind="item"></el-table-column>
        <el-table-column v-else-if="item.type=='action'" v-bind="item">
          <template slot-scope="scope">
            <template v-for="item in item.button">
              <el-button v-bind="item" @click="handleAction(item.action,scope.row)">
                {{item.text}}</el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <div class="pager" v-if="pager">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="size" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    column: {
      type: Array,
      default: () => []
    },
    tableDate: {
      type: Array,
      default: () => []
    },
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 2
    },
    total: {
      type: Number,
      default: 0
    },
    pager: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    handleAction (action, row) {
      this.$emit("handleAction", { action, row })
    },
    handleSizeChange (size) {
      this.$emit("handleSizeChange", size)
    },
    handleCurrentChange (page) {
      this.$emit("handleCurrentChange", page)
    },
    handleChange(row){
      this.$emit("handleChange", row)
    }
  }
}
</script>
<style scoped lang='scss'>
.pager{
  width: 400px;
}
.el-pagination{
  width: 400px;
}
</style>
