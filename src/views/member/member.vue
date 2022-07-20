<style scoped lang='scss'>
.nav_input {
  .el-input {
    width: 200px;
    margin-right: 10px;
  }
  .el-select {
    margin-right: 10px;
  }
}
.btn_box {
  margin: 25px 0 20px 0;
}
.pay {
  width: 120px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
<template>
  <div>
    <!-- 头部操作区 -->
    <MyNavForm
    :column="formColumn"
    :model="searchForm"
    ref="memberInfo"
    @handleFormAction="handleFormAction">
    </MyNavForm>
    <!-- 会员列表 -->
    <MyTable
    :column="tableColumn"
    :tableDate="memberList"
    :page="page"
    :size="size"
    :total="total"
    @handleAction="handleTableAction"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange">
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
//引入接口文件
import Member from "../../api/member";
//引入支付方式的优化文件
import payType from "../../payType/paytype";
//引入时间过滤文件
import format from "../../utils/format";

import MyTable from "../../components/MyTable"
import MyNavForm from "../../components/MyNavForm"
import DialogForm from "../../components/DialogForm"
export default {
  name: "",
  components: { MyTable ,MyNavForm,DialogForm},
  data () {
    return {
      page: 1,
      size: 3,
      total: 0,
      searchForm: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: ""
      },
      formColumn: [
        {
          type: "input",
          prop: "cardNum",
          placeholder: "会员卡号"
        },
        {
          type: "input",
          prop: "name",
          placeholder: "会员姓名"
        },
        {
          type: "select",
          prop: "payType",
          placeholder: "支付类型",
          style: "width:110px",
          payType
        },
        {
          type: "data-picker",
          prop: "birthday",
          placeholder: "出生日期",
          value_format: "yyyy-MM-dd"
        },
        {
          type: "action",
          buttons: [
            {
              action: "search",
              text: "查询",
              type: "primary"
            },
            {
              action: "add",
              text: "新增",
              type: "primary"
            },
            {
              action: "reset",
              text: "重置"
            }
          ]
        }
      ],
      payType,
      memberList: [],
      tableColumn: [{
        label: "序号",
        type: "index",
        width: "50"
      },
      {
        prop: "cardNum",
        label: "会员卡号"
      },
      {
        prop: "name",
        label: "会员姓名"
      },
      {
        prop: "birthday",
        width: "120",
        label: "会员生日",
        formatter: (row, column, cellValue, index) => {
          return format(cellValue);
        }
      },
      {
        prop: "phone",
        width: "120",
        label: "手机号码"
      },
      {
        prop: "integral",
        label: "可用积分"
      },
      {
        prop: "money",
        label: "开卡金额"
      },
      {
        prop: "payType",
        label: "支付类型",
        //代替了过滤器
        formatter: (row, column, type, index) => {
          const obj = payType.find(item => item.type == type);
          return obj ? obj.name : "";
        }
      },
      {
        prop: "address",
        width: "150",
        label: "会员地址"
      },
      {
        width: "150",
        label: "操作",
        type: "action",
        button: [{
          size: "mini",
          text: "编辑",
          action: "edit"
        },
        {
          size: "mini",
          type: "danger",
          text: "删除",
          action: "delete"
        }
        ]
      }
      ],
      dialogVisible: false,
      addInfo: {
        integral: 0,
        money: 0
      },
      dialogFormColumn:[
        {
          type:"input",
          label:"会员卡号",
          prop:"cardNum"
        },
        {
          type:"input",
          label:"会员姓名",
          prop:"name"
        },
        {
          type : "date-picker",
          label : "会员生日",
          placeholder: "选择日期",
          prop : "birthday",
          value_format : "yyyy-MM-dd"
        },
        {
          type:"input",
          label:"手机号码",
          prop:"phone"
        },
        {
          type:"input",
          label:"开卡金额",
          prop:"money"
        },
        {
          type:"input",
          label:"可用积分",
          prop:"integral"
        },
        {
          type: "select",
          prop: "payType",
          placeholder: "支付类型",
          label:"支付类型",
          style: "width:110px",
          payType
        },
        {
          type:"textarea",
          label:"会员地址",
          prop:"address"
        },
      ],
      rules: {
        cardNum: [
          { required: true, message: '请输入会员卡号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入会员名称', trigger: 'blur' },
        ],
        payType: [
          { required: true, message: '请输入支付类型', trigger: 'blur' }
        ],
      },
      dialogTitle: ""
    };
  },
  filters: {
    //时间过滤
    timeFilter: time => {
      return format(time);
    },
    //支付类型转化
    payTypeFilter (type) {
      const obj = payType.find(item => item.type == type);
      return obj ? obj.name : "";
    }
  },
  created () {
    this.getMember();
  },
  methods: {
    //获取/查询/分页  会员列表
    async getMember () {
      const { count, rows } = await Member.getMemberList(
        this.page,
        this.size,
        this.searchForm
      );
      this.total = count; //总条数
      this.memberList = rows; //会员列表
    },
    //分页条数改变触发
    handleSizeChange (size) {
      this.size = size;
      this.getMember();
    },
    //分页页码改变触发
    handleCurrentChange (page) {
      this.page = page;
      this.getMember();
    },
    //拆分后的表单操作
    handleFormAction (action) {
      if (action == "search") return this.handleSearch()
      if (action == "add") return this.handleOpenDialog("add")
      if (action == "reset") return this.handleReset()
    },
    //查询事件
    handleSearch () {
      this.page = 1;
      this.getMember();
    },
    //删除事件
    handleDelete (id) {
      this.$confirm("确定删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await Member.delMember(id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.page = 1;
          this.getMember();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //重置事件
    handleReset () {
      this.$refs["memberInfo"].handleReset();
      this.getMember();
    },
    //拆分后表格操作
    handleTableAction ({action, row}) {
      if(action=="delete") return this.handleDelete(row.id)
      if(action=="edit") return this.handleOpenDialog("edit",row.id)
    },
    //打开模态框
    handleOpenDialog(type, id) {
      this.dialogTitle = type == 'add' ? '会员添加' : '会员编辑'
      if (type == 'edit') this.handleGetMember(id)
      this.dialogVisible = true
    },
    //获取编辑数据
    async handleGetMember(id) {
      try {
        this.addInfo = await Member.getMember(id)
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
            this.handleEditMember()
          }else{
            this.handleAddMember()
          }
          this.$refs["addInfo"].handleClose()
        } else {
          return false;
        }
      });
    },
    //实现添加功能
    async handleAddMember(){
      try {
        await Member.addMember(this.addInfo)
        this.handleClose()
        this.getMember()
        this.$message.success('添加成功')
      } catch (error) {
        this.$message.error('添加失败')
      }
    },
    //实现编辑功能
    async handleEditMember() {
      try {
        await Member.editMember(this.addInfo.id, this.addInfo)
        this.handleClose()
        this.getMember()
        this.$message.success('编辑成功')
      } catch (error) {
        this.$message.error('编辑失败')
      }
    },
    
  },
}
</script>
