<template>
<div>
    <MyNavForm
      @handleFormAction="handleFormAction"
      @handleDialog="handleDialog"
      :column="navFormColumn"
      :model="searchInfo"
      ref="userInfo">
    </MyNavForm>
    <MyTable 
      @handleAction="handleTableAction"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :column="tableColumn" 
      :tableDate="GoodsList"
      :page="page"
      :size="size"
      :total="total">
    </MyTable>
    <DialogForm
        :title="dialogTitle"
        :dialogVisible="dialogVisible"
        :addInfo="addInfo"
        :rules="rules"
        :dialogFormColumn="dialogFormColumn"
        @handleForm="handleForm"
        @handleClose="handleClose"
        @handleAddOk="handleAddOk"
        ref="addInfo"
        >
    </DialogForm>
    <!-- 选择供应商-->
    <el-dialog title="选择供应商" width="500px"
      :visible.sync="dialogTableVisible">
      <Supplier
      @handleChange="handleChange"
      :isDialog="true"
      ></Supplier>
    </el-dialog>
</div>
</template>

<script>
import Goods from '../../api/Goods'
import MyNavForm from '@/components/MyNavForm.vue'
import MyTable from '@/components/MyTable.vue'
import DialogForm from '@/components/DialogForm.vue'
//引入供应商列表
import Supplier from "../supplier/supplier.vue"
export default {
  name: '',
  components: { MyNavForm, MyTable, DialogForm ,Supplier},
  data() {
    return {
      page: 1,
      size: 3,
      total: 0,
      GoodsList: [],
      searchInfo: {
        name:"",
        code:"",
        supplierName:""
      },
      navFormColumn: [
        {
          type: 'input',
          placeholder: '商品名称',
          prop: 'name',
        },
        {
          type: 'input',
          placeholder: '商品编号',
          prop: 'code',
        },
        {
          type: 'chose',
          placeholder: '选择供应商',
          prop: 'supplierName',
        },
        {
          type: 'action',
          buttons: [
            {
              type: 'primary',
              text: '查询',
              action: 'search',
            },
            {
              type: 'primary',
              text: '新增',
              action: 'add',
            },
            {
              text: '重置',
              action: 'reset',
            },
          ],
        },
      ],
      tableColumn: [
        {
          type: 'index',
          label: '序号',
          width: '50px',
        },
        {
          prop: 'name',
          label: '商品名称',
        },
        {
          prop: 'code',
          label: '商品编码',
        },
        {
          prop: 'spec',
          label: '商品规格',
        },
        {
          prop: 'purchasePrice',
          label: '零售价',
        },
        {
          prop: 'retailPrice',
          label: '进货价',
        },
        {
          prop: 'storageNum',
          label: '库存数量',
        },
        {
          prop: 'supplierName',
          label: '供应商',
        },
        {
          type: 'action',
          label: '操作',
          width: '150px',
          button: [
            {
              type: 'primary',
              text: '编辑',
              size: 'mini',
              action: 'edit',
            },
            {
              type: 'danger',
              text: '删除',
              size: 'mini',
              action: 'delete',
            },
          ],
        },
      ],
      dialogTableVisible:false,
      dialogVisible: false,
      dialogTitle: '',
      addInfo: {
        supplierName:""
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        purchasePrice: [
          { required: true, message: '请输入零售价', trigger: 'blur' },
        ],
      },
      dialogFormColumn: [
        {
          type: 'input',
          prop: 'name',
          label: '商品名称',
        },
        {
          type: 'input',
          prop: 'code',
          label: '商品编码',
        },
        {
          type: 'input',
          prop: 'spec',
          label: '商品规格',
        },
        {
          type: 'input',
          prop: 'purchasePrice',
          label: '零售价',
        },
        {
          type: 'input',
          prop: 'retailPrice',
          label: '进货价',
        },
        {
          type: 'input',
          prop: 'storageNum',
          label: '库存数量',
        },
        {
          type: 'chose',
          prop: 'supplierName',
          label: '供应商',
          placeholder: '请选择供应商',
        },
      ],
      type:""
    }
  },
  created() {
    this.getGoodsList()
  },
  mounted() {},
  methods: {
    //获取所有的商品
    async getGoodsList() {
      const { count, rows } = await Goods.getGoodsList(
        this.page,
        this.size,
        this.searchInfo
      )
      this.GoodsList = rows
      this.total = count
    },  
    //点击navForm的选择供应商打开供应商选择
    handleDialog(type) {
      this.type=type
      this.dialogTableVisible=true
    },
    //得到选择的供应商数据
    handleChange(row){
      if(this.type=="search"){
        this.searchInfo.supplierName=row.name
      }else{
        this.addInfo.supplierName=row.name
      }
      this.dialogTableVisible=false
    },
    //点击打开供应商选择
    handleForm(type){
      this.type=type
      this.dialogTableVisible=true
    },
    //拆分后的表单操作
    handleFormAction(action) {
      if (action == 'search') return this.handleSearch()
      if (action == 'add') return this.handleOpenDialog('add')
      if (action == 'reset') return this.handleReset()
    },
    //查询事件
    handleSearch() {
      this.page = 1
      this.getGoodsList()
    },
    //重置事件
    handleReset() {
      this.$refs['userInfo'].handleReset()
      this.getGoodsList()
    },
    //分页条数改变触发
    handleSizeChange(size) {
      this.size = size
      this.getGoodsList()
    },
    //分页页码改变触发
    handleCurrentChange(page) {
      this.page = page
      this.getGoodsList()
    },
    //拆分后表格操作
    handleTableAction({ action, row }) {
      if (action == 'delete') return this.handleDelete(row.id)
      if (action == 'edit') return this.handleOpenDialog('edit', row.id)
    },
    //删除事件
    handleDelete(id) {
      this.$confirm('确定删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await Goods.deleteGoods(id)
          this.$message.success('删除成功')
          this.page = 1
          this.getGoodsList()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    //打开模态框
    handleOpenDialog(type, id) {
      this.dialogTitle = type == 'add' ? '商品添加' : '供应商编辑'
      if (type == 'edit') this.handleGetGoods(id)
      this.dialogVisible = true
    },
    //获取编辑数据
    async handleGetGoods(id) {
      try {
        this.addInfo = await Goods.getGoods(id)
      } catch (error) {
        this.$message.error('查询失败')
      }
    },
    //关闭添加·模态框
    handleClose() {
      this.dialogVisible = false
    },
    //模态框确定事件
    handleAddOk() {
      // console.log(this.$refs["addInfo"].$refs["addInfo"]);
      this.$refs['addInfo'].$refs['addInfo'].validate(async (valid) => {
        if (valid) {
          if (this.addInfo.id) {
            this.handleEditGoods()
          } else {
            this.handleAddGoods()
          }
          this.$refs['addInfo'].handleClose()
        } else {
          return false
        }
      })
    },
    //实现添加功能
    async handleAddGoods() {
      try {
        await Goods.addGoods(this.addInfo)
        this.handleClose()
        this.getGoodsList()
        this.$message.success('添加成功')
      } catch (error) {
        this.$message.error('添加失败')
      }
    },
    //实现编辑功能
    async handleEditGoods() {
      try {
        await Goods.editGoods(this.addInfo.id, this.addInfo)
        this.handleClose()
        this.getGoodsList()
        this.$message.success('编辑成功')
      } catch (error) {
        this.$message.error('编辑失败')
      }
    },
  },
}
</script>
<style scoped lang='scss'>
</style>
