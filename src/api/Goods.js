import request from "../utils/request";
// 获取 商品列表==商品列表查询==商品列表分页
const getGoodsList=(currentPage,pageSize,data)=>{
    return request({url:`/goods/list/search/${currentPage}/${pageSize}`,method:"POST",data})
}
//商品列表删除接口
const deleteGoods=(id)=>{
    return request({url:`/goods/${id}`,method:"DELETE"})
}
//商品添加接口
const addGoods=(data)=>{
    return request({url:"/goods/",method:"POST",data})
}
//商品编辑接口
const editGoods=(id,data)=>{
    return request({url:`/goods/${id}`,method:"PUT",data})
}
//单个商品查询接口
const getGoods=(id)=>{
    return request({url:`/goods/${id}`,method:"GET"})
}
export default {
    getGoodsList,
    deleteGoods,
    addGoods,
    editGoods,
    getGoods
}