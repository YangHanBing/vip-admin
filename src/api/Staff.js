import request from '@/utils/request';
//获取员工列表
const getStaffList=(currentPage,pageSize,data)=>{
  return request({url:`/staff/list/search/${currentPage}/${pageSize}`,method:"POST",data})
}
//删除员工列表
const deleteStaff=(id)=>{
  return request({url:`/staff/${id}`,method:"DELETE"})
}
//添加员工列表
const addStaff=(data)=>{
  return request({url:"/staff",method:"POST",data})
}
//编辑员工列表
const editStaff=(id,data)=>{
  return request({url:`/staff/${id}`,method:"PUT",data})
}
//单个员工查询接口
const getStaff=(id)=>{
  return request({url:`/staff/${id}`,method:"GET"})
}
export default {
  getStaffList,
  deleteStaff,
  addStaff,
  editStaff,
  getStaff
}