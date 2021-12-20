<template>
  <div>
    <!-- login.html 12~40 -->
    <!--页面主体-->
    <div class="login_box">
      <div class="container">
        <div class="login">
          <h2>用户登录</h2>
          <dl class="clearfloat">
            <dt>
              <span
                class="tips"
                id="uname_prompt_text"
                style="display: block"
                v-if="showErr"
                >用户名或密码不正确</span
              >用户名：
            </dt>
            <dd>
              <input
                v-model="uname"
                @blur="showErr = false"
                type="text"
                id="uname"
                placeholder="邮箱/手机号"
              />
              <em class="icon_user"></em>
              <i class="icon_error" id="uname_prompt_icon"></i>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="tips" id="pwd_prompt_text">请输入密码</span>密码：
            </dt>
            <dd>
              <input
                v-model="upwd"
                type="password"
                id="pwd"
                placeholder="密码"
              />
              <em class="icon_pwd"></em>
              <i class="icon_error" id="pwd_prompt_icon"></i>
            </dd>
          </dl>
          <p>
            <label>
              <input type="checkbox" />
              <span>自动登录</span>
            </label>
          </p>
          <button @click="doLogin" type="button" id="login">立 即 登 录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 页面数据
  data() {
    return {
      uname: "doudou", //用户名
      upwd: "123456", //密码
      showErr: false, //控制登录错误提示显示和隐藏
    };
  },

  // 页面方法
  methods: {
    // 登录的方法
    async doLogin() {
      console.log(this.uname, this.upwd);
      // POST请求：接口地址 和 参数 分开传递
      const url = "user_login.php";
      const params = `unameOrPhone=${this.uname}&upwd=${this.upwd}`;
      // 向后端发送请求
      const { data: res } = await this.axios.post(url, params);
      console.log(res);
      // 判断请求是否成功
      // code：400表示失败；1表示成功
      if (res.code == 1) {
        // vueX：更新数据
        this.$store.commit('updateUser', res)
        // 逻辑判断：登录成功uid有值，未登录为默认值null

        // 跳转回到之前的页面
        this.$router.go(-1);//编程路由操作
      } else {
        this.showErr = true;
      }
    },
  },
};
</script>

<style></style>
