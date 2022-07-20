import router from "./router"
import store from "./store"
router.beforeEach(async (to, from, next) => {
    const token = store.state.token
    //先判断本地有没有token
    //没有就跳转到login页面
    if (!token) {
        if (to.path == "/login") {
            next()
        } else {
            next("/login")
        }
    } else {
        //有token先判断打开页面路径
        if (to.path == "login") {
            next(from.path)
        } else {
            const userInfo = store.state.userInfo
            if (userInfo) {
                next()
            } else {
                const response = await store.dispatch("setUserInfo")
                if (response) {
                    next()
                } else {
                    next("/login")
                }
            }
        }
    }
})