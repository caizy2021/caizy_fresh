import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 专门存放组件间共享的数据
    uname:sessionStorage.getItem('uname'),
    uid:sessionStorage.getItem('uid'),
    phone:sessionStorage.getItem('phone'),
  },
  mutations: {
    // 专门存放更新 state 中的值的方法
    // 故参数2：user的格式必须是：
    // {phone:xxx, uid:xxx, uname:xxx}
    updateUser(state, user){
      state.phone = user.phone;
      state.uid = user.uid;
      state.uname = user.uname;

      // session：存储的数据 在刷新时不会清除
      sessionStorage.setItem('phone', user.phone);
      sessionStorage.setItem('uid', user.uid);
      sessionStorage.setItem('uname', user.uname);
    },

    // 登出的方法
    logout(state){
      state.phone='';
      state.uid='';
      state.uname='';

      sessionStorage.setItem('phone', '');
      sessionStorage.setItem('uid', '');
      sessionStorage.setItem('uname', '');
    }
  },
  actions: {
  },
  modules: {
  }
})
