import request from '@/utils/request';
//获取供应商列表
const getSupplierList=(currentPage,pageSize,data)=>{
  return request({url:`/supplier/list/search/${currentPage}/${pageSize}`,method:"POST",data})
}
//删除供应商列表
const deleteSupplier=(id)=>{
  return request({url:`/supplier/${id}`,method:"DELETE"})
}
//添加供应商列表
const addSupplier=(data)=>{
  return request({url:"/supplier/",method:"POST",data})
}
//编辑供应商列表
const editSupplier=(id,data)=>{
  return request({url:`/supplier/${id}`,method:"PUT",data})
}
//单个供应商查询接口
const getSupplier=(id)=>{
  return request({url:`/supplier/${id}`,method:"GET"})
}
export default {
  getSupplierList,
  deleteSupplier,
  addSupplier,
  editSupplier,
  getSupplier
}