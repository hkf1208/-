// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import wow from 'wow.js'
import MintUI from 'mint-ui'
import Button from 'mint-ui/lib/button'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)
Vue.component(Button.name, Button)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
require('vue2-animate/dist/vue2-animate.min.css')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  wow
})
