import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入nprogress模块的JS和CSS
import NProgress from 'nprogress'

// 引入axios模块
import axios from 'axios'
import VueAxios from 'vue-axios'
// 设置默认axios请求路径
axios.defaults.baseURL="http://www.codeboy.com:9999/mfresh/data/";
// 在request拦截器中，显示进度条 NProgress.start()
axios.interceptors.request.use(config=>{
  NProgress.start()
  return config
})
// 在response拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config=>{
  NProgress.done()
  return config
})
// 挂载axios
Vue.use(VueAxios, axios)

// 引入swiper模块
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'

// import style (<= Swiper 5.x)
// import 'swiper/css/swiper.css'

// 挂载swiper
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false

// 注册filter过滤器
Vue.filter('dateFormat', function(originVal){
  // 接收时间戳
  const dt = new Date(originVal - 0)

  // 计算年
  const year = dt.getFullYear()
  // 计算月，加1后从数字变成字符串
  const month = (dt.getMonth() + 1 + '')
    // 使其组成两位数，缺失的部分用0填充
    .padStart(2, '0')
  // 计算日
  const day = (dt.getDate() + '')
    // 使其组成两位数，缺失的部分用0填充
    .padStart(2, '0')
  
  // 返回时间
  return `${year}-${month}-${day}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
