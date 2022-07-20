const TOKEN_KEY="token"
const USER_INFO_KEY="userInfo"
//将token存到本地
export function setToken(token){
    localStorage.setItem(TOKEN_KEY,token)
}
//获取本地token
export function getToken(){
    return localStorage.getItem(TOKEN_KEY)
}
//将userInfo存到本地
export function setUserInfo(userInfo){
    localStorage.setItem(USER_INFO_KEY,JSON.stringify(userInfo))
}
//获取本地userInfo
export function getUserInfo(){
    return JSON.parse(localStorage.getItem(USER_INFO_KEY)||null)
}
//退出登录清空本地
export function clearLocal(){
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_INFO_KEY)
}