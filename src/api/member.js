import request from "../utils/request";
// 获取 会员列表==会员列表查询==会员列表分页
const getMemberList=(currentPage,pageSize,data)=>{
    return request({url:`/member/list/search/${currentPage}/${pageSize}`,method:"POST",data})
}
//会员列表删除接口
const delMember=(id)=>{
    return request({url:`/member/${id}`,method:"DELETE"})
}
//会员添加接口
const addMember=(data)=>{
    return request({url:"/member/",method:"POST",data})
}
//会员编辑接口
const editMember=(id,data)=>{
    return request({url:`/member/${id}`,method:"PUT",data})
}
//单个会员查询接口
const getMember=(id)=>{
    return request({url:`/member/${id}`,method:"GET"})
}
export default {
    getMemberList,
    delMember,
    addMember,
    editMember,
    getMember
}