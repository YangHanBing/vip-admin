import Vue from 'vue'
import Vuex from 'vuex'
import user from "../api/user"
import { setToken, getToken, setUserInfo, getUserInfo, clearLocal } from "../utils/auth"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() || "",
    userInfo: getUserInfo() || null
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setUserInfo(userInfo)
    },
    //清楚vuex的token
    clearToken(state) {
      state.token = ""
    },
    //清楚vuex的userInfo
    clearUserInfo(state) {
      state.userInfo = null
    }
  },
  actions: {
    async handleLogin({ commit }, payload) {
      const response = await user.getToken(payload)
      if (response) {
        commit("setToken", response.token)
      }
      return response
    },
    async setUserInfo({ commit }) {
      const userInfo = await user.getUserInfo()
      commit("setUserInfo", userInfo)
      return userInfo
    },
    // async handleClearLocal({ state }) {
    //   const logout = await user.logout()
    //   state.token = ""
    //   state.userInfo = null
    //   clearLocal()
    //   return logout
    // }
    async handleClearLocal({ commit }) {
      const logout = await user.logout()
      commit("clearToken")
      commit("clearUserInfo")
      // 清楚本地token，userInfo
      clearLocal()
      return logout
    }
  },
  modules: {
  }
})
