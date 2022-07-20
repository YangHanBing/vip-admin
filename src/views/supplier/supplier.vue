<template>
    <div>
        <MyNavForm
        @handleFormAction="handleFormAction"
        :column="navFormColumn"
        :model="searchInfo"
        ref="userInfo">
        </MyNavForm>
        <!-- :pager="!isDialog" -->
        <MyTable 
        @handleAction="handleTableAction"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @handleChange="handleChange"
        :column="tableColumn" 
        :tableDate="supplierList"
        :page="page"
        :size="size"
        :total="total">
        </MyTable>
        <!-- 添加编辑模态框 -->
      <DialogForm
        :title="dialogTitle"
        :dialogVisible="dialogVisible"
        :addInfo="addInfo"
        :rules="rules"
        :dialogFormColumn="dialogFormColumn"
        @handleClose="handleClose"
        @handleAddOk="handleAddOk"
        ref="addInfo"
        >
    </DialogForm>
    </div>
</template>

<script>
import Supplier from '../../api/Supplier'
import MyNavForm from '@/components/MyNavForm.vue'
import MyTable from '@/components/MyTable.vue'
import DialogForm from '@/components/DialogForm.vue'
import format from '../../utils/format'
export default {
  name: '',
  components: { MyNavForm, MyTable, DialogForm },
  props:{
    isDialog:Boolean,
  },
  data() {
    return {
      page: 1,
      size: 10,
      searchInfo: {},
      total: 0,
      supplierList: [],
      navFormColumn: [
        {
          type: 'input',
          placeholder: '供应商名称',
          prop: 'name',
        },
        {
          type: 'input',
          placeholder: '联系人',
          prop: 'linkman',
        },
        {
          type: 'input',
          placeholder: '联系电话',
          prop: 'mobile',
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
          label: '供应商名称',
        },
        {
          prop: 'linkman',
          label: '联系人',
        },
        {
          prop: 'mobile',
          label: '联系电话',
        },
        {
          prop: 'remark',
          label: '备注',
        },
        {
          type: 'action',
          label: '操作',
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
      addInfo:{},
      dialogTitle: '',
      dialogVisible:false,
      rules: {
        name: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ],
        linkman: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
      },
      dialogFormColumn:[
        {
          type:"input",
          prop:"name",
          label:"供应商名称",
        },
        {
           type:"input",
          prop:"linkman",
          label:"联系人"
        },
        {
           type:"input",
          prop:"mobile",
          label:"联系电话"
        },
        {
          type:"textarea",
          prop:"remark",
          label:"备注"
        },
      ],
    }
  },
  created() {
    this.getSupplierList()
    if(this.isDialog){
      this.tableColumn.splice(3)
      this.navFormColumn=[
         {
          type: 'input',
          placeholder: '供应商名称',
          prop: 'name',
        },
        {
          type: 'action',
          buttons: [
            {
              type: 'primary',
              text: '查询',
              action: 'search',
            }
          ],
        },
      ]
    }
  },
  mounted() {},
  methods: {
    //获取所有的供应商
    async getSupplierList() {
      const { count, rows } = await Supplier.getSupplierList(
        this.page,
        this.size,
        this.searchInfo
      )
      this.supplierList = rows
      this.total = count
    },
    //传递选择的供应商数据
    handleChange(row){
      this.$emit("handleChange",row)
    },
    //分页条数改变触发
    handleSizeChange(size) {
      this.size = size
      this.getSupplierList()
    },
    //分页页码改变触发
    handleCurrentChange(page) {
      this.page = page
      this.getSupplierList()
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
      this.getSupplierList()
    },
    //重置事件
    handleReset() {
      this.$refs['userInfo'].handleReset()
      this.getSupplierList()
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
          await Supplier.deleteSupplier(id)
          this.$message.success('删除成功')
          this.page = 1
          this.getSupplierList()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    //打开模态框
    handleOpenDialog(type, id) {
      this.dialogTitle = type == 'add' ? '供应商添加' : '供应商编辑'
      if (type == 'edit') this.handleGetSupplier(id)
      this.dialogVisible = true
    },
    //获取编辑数据
    async handleGetSupplier(id) {
      try {
        this.addInfo = await Supplier.getSupplier(id)
      } catch (error) {
        this.$message.error('查询失败')
      }
    },
    //关闭添加·模态框
    handleClose () {
      this.dialogVisible = false
    },
    //模态框确定事件
    handleAddOk () {
      // console.log(this.$refs["addInfo"].$refs["addInfo"]);
      this.$refs["addInfo"].$refs["addInfo"].validate(async (valid) => {
        if (valid) {
          if(this.addInfo.id){
            this.handleEditSupplier()
          }else{
            this.handleAddSupplier()
          }
          this.$refs["addInfo"].handleClose()
        } else {
          return false;
        }
      });
    },
    //实现添加功能
    async handleAddSupplier(){
      try {
        await Supplier.addSupplier(this.addInfo)
        this.handleClose()
        this.getSupplierList()
        this.$message.success('添加成功')
      } catch (error) {
        this.$message.error('添加失败')
      }
    },
    //实现编辑功能
    async handleEditSupplier() {
      try {
        await Supplier.editSupplier(this.addInfo.id, this.addInfo)
        this.handleClose()
        this.getSupplierList()
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
