import Vue from 'vue'
import category from './category.vue'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  render: h => h(category)
}).$mount('#category')
