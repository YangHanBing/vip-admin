import axios from "axios"
import store from "../store"
//引入element-ui的错误提示
import {Message} from 'element-ui';
//引入清楚本地缓存的方法
import {clearLocal} from "./auth"
//引入加载
import {Loading} from 'element-ui';

//单例模式
const loading = {
    loadingInstance: null,
    open() {
        if (this.loadingInstance === null) {
            this.loadingInstance = Loading.service({
                target: ".main",
                text: "正在拼命加载中……",
                background: "rgba(0,0,0,0.5)"
            });
        }
    },
    close() {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
            this.loadingInstance = null
        }
    }
}


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 5000
})
service.interceptors.request.use(
    (config) => {
        loading.open()
        //token通过请求头发送给后台
        const token = store.state.token
        // console.log(store.state.token);
        if (token) {
            config.headers.authorization = "Bearer " + token
        }
        return config
    },
    (err) => {
        loading.close()
        return Promise.reject(err)
    })
service.interceptors.response.use(
    (res) => {
        loading.close()
        if (res.data.code === 1) {
            return res.data.data
        }
        if (res.data.error_code === 0) {
            return res.data.msg
        }
        //对token进行过期处理
        if (res.data.code === -1) {
            store.commit("clearToken", "")
            store.commit("clearUserInfo", "")
            clearLocal()
            router.push("/login")
        }
        _showErrorMessage(res.data.message)
    },
    (err) => {
        loading.close()
        return Promise.reject(err)
    })
//请求方式优化
function request(options) {
    options.method = options.method || "get"
    if (options.method.toLocaleLowerCase() === "get") {
        options.params = options.data
    }
    return service(options)
}
//显示错误信息
function _showErrorMessage(msg) {
    const message = msg || "发生未知错误"
    Message({
      message,
        type: "error",
        duration: 1000
    })
}
export default request