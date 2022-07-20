import request from "../utils/request";
//获取token接口
const getToken = (data) => {
    return request({ url: "/admin/login", method: "POST", data })
}
//获取userInfo接口
const getUserInfo=()=>{
    return request({url:"/admin/getUserInfo"})
}
//退出登录接口
const logout = () => {
    return request({ url: "/admin/logout", method: "POST"})
}

export default {
    getToken,
    getUserInfo,
    logout,
}