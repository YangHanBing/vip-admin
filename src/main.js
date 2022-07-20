import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入axios
// import axios from "axios"
// Vue.prototype.axios=axios

//引入路由守卫
import "./permission"

//引入lodash
import { _ } from "lodash";
Vue.prototype._ = _;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
