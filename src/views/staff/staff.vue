<template>
  <div>
    <MyNavForm
    :model="searchInfo"
    ref="userInfo"
    @handleFormAction="handleFormAction"
    :column="formColumn">
    </MyNavForm>
    <MyTable
    :column="tableColumn"
    :tableDate="staffList"
    :page="page"
    :size="size"
    :total="total"
    @handleAction="handleTableAction"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange">
    </MyTable>
    <DialogForm
    :title="dialogTitle"
    :dialogVisible="dialogVisible"
    :addInfo="addInfo"
    :rules="rules"
    :dialogFormColumn="dialogFormColumn"
    @handleClose="handleClose"
    @handleAddOk="handleAddOk"
    ref="addInfo">
    </DialogForm>
  </div>
</template>

<script>
import Staff from '../../api/Staff'
import MyNavForm from '@/components/MyNavForm.vue'
import MyTable from '@/components/MyTable.vue'
import DialogForm from '@/components/DialogForm.vue'
import format from '../../utils/format'
export default {
  name: '',
  components: {
    MyNavForm,
    MyTable,
    DialogForm,
  },
  data() {
    return {
      page: 1,
      size: 3,
      total: 0,
      searchInfo: {
        username: '',
        name: '',
      },
      staffList: [],
      formColumn: [
        {
          type: 'input',
          placeholder: '账号',
          prop: 'username',
        },
        {
          type: 'input',
          placeholder: '姓名',
          prop: 'name',
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
          width: '50',
        },
        {
          label: '账号',
          prop: 'username',
        },
        {
          label: '姓名',
          prop: 'name',
        },
        {
          label: '年龄',
          prop: 'age',
        },
        {
          label: '电话',
          prop: 'mobile',
        },
        {
          label: '薪酬',
          prop: 'salary',
        },
        {
          label: '入职时间',
          prop: 'entryDate',
          formatter: (row, column, type, index) => {
            return format(type)
          },
        },
        {
          label: '操作',
          type: 'action',
          button: [
            {
              size: 'mini',
              text: '编辑',
              action: 'edit',
              type: 'primary',
            },
            {
              size: 'mini',
              text: '删除',
              action: 'delete',
              type: 'danger',
            },
          ],
        },
      ],
      dialogFormColumn: [
        {
          type: 'input',
          prop: 'username',
          label: '账号',
        },
        {
          type: 'input',
          prop: 'name',
          label: '姓名',
        },
        {
          type: 'input',
          prop: 'age',
          label: '年龄',
        },
        {
          type: 'input',
          prop: 'mobile',
          label: '电话',
        },
        {
          type: 'input',
          prop: 'salary',
          label: '薪酬',
        },
        {
          type: 'date-picker',
          prop: 'entryDate',
          placeholder: '入职时间',
          label: '入职时间',
          value_format: 'yyyy-MM-dd',
          style: 'width:150px',
        },
      ],
      dialogVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            max: 12,
            message: '长度在 5 到 12 个字符',
            trigger: 'blur',
          },
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      },
      dialogTitle: '',
      addInfo: {},
    }
  },
  created() {
    this.getStaffList()
  },
  mounted() {},
  methods: {
    //获取员工列表
    async getStaffList() {
      const { count, rows } = await Staff.getStaffList(
        this.page,
        this.size,
        this.searchInfo
      )
      this.staffList = rows
      this.total = count
    },
    //重置事件
    handleReset() {
      this.$refs['userInfo'].handleReset()
      this.getStaffList()
    },
    //拆分后表单操作
    handleFormAction(action) {
      if (action == 'search') return this.handleSearch()
      if (action == 'add') return this.handleOpenDialog('add')
      if (action == 'reset') return this.handleReset()
    },
    //拆分后表格操作
    handleTableAction({ action, row }) {
      if (action == 'delete') return this.handleDelete(row.id)
      if (action == 'edit') return this.handleOpenDialog('edit', row.id)
    },
    //打开模态框
    handleOpenDialog(type, id) {
      this.dialogTitle = type == 'add' ? '员工添加' : '员工编辑'
      if (type == 'edit') this.handleGetStaff(id)
      this.dialogVisible = true
    },
    //获取编辑数据
    async handleGetStaff(id) {
      try {
        this.addInfo = await Staff.getStaff(id)
      } catch (error) {
        this.$message.error('查询失败')
      }
    },
    //删除事件
    handleDelete(id) {
      this.$confirm('确定删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await Staff.deleteStaff(id)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.page = 1
          this.getStaffList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //查询事件
    handleSearch() {
      this.page = 1
      this.getStaffList()
    },
    //模态框取消事件
    handleClose() {
      this.dialogVisible = false
    },
    //模态框确定事件
    handleAddOk() {
      this.$refs['addInfo'].$refs['addInfo'].validate(async (valid) => {
        if (valid) {
          if(this.addInfo.id){
            this.handleEditStaff()
          }else{
            this.handleAddStaff()
          }
          this.$refs["addInfo"].handleClose()
        } else {
          return false
        }
      })
    },
    //实现添加功能
    async handleAddStaff() {
      try {
        await Staff.addStaff(this.addInfo)
        this.handleClose()
        this.getStaffList()
        this.$message.success('添加成功')
      } catch (error) {
        this.$message.error('添加失败')
      }
    },
    //实现编辑功能
    async handleEditStaff() {
      try {
        await Staff.editStaff(this.addInfo.id, this.addInfo)
        this.$message.success('编辑成功')
        this.handleClose()
        this.getStaffList()
      } catch (error) {
        this.$message.error('编辑失败')
      }
    },
    //分页条数改变触发
    handleSizeChange(size) {
      this.size = size
      this.getStaffList()
    },
    //分页页码改变触发
    handleCurrentChange(page) {
      this.page = page
      this.getStaffList()
    },
  },
}
</script>
<style scoped lang='scss'>
</style>
