<template>
  <div>
    <!-- register.html 12~55 -->
    <!--页面主体-->
    <div class="register">
      <h2>新用户注册</h2>
      <ul>
        <li>
          <span>邮箱：</span>
          <input
            type="text"
            id="uname"
            placeholder="请输入邮箱名"
            v-model="email"
            @blur="checkEmail"
          />
          <em
            v-show="status_email == 2 || status_email == 3 || status_email == 4"
            class="icon_error"
            style="display: inline"
          ></em>
          <em
            v-show="status_email == 5"
            class="icon_ok"
            style="display: inline"
          ></em>
          <i style="display: block" v-show="status_email == 2"
            >请输入您的注册邮箱</i
          >
          <i style="display: block" v-show="status_email == 3"
            >邮箱格式不正确</i
          >
          <i style="display: block" v-show="status_email == 4">此邮箱已注册</i>
        </li>
        <li>
          <span>密码：</span>
          <input
            type="password"
            id="upwd"
            placeholder="请输入密码"
            v-model="passwd"
            @blur="checkPasswd"
          />
          <em
            v-show="status_pwd == 2 || status_pwd == 3"
            class="icon_error"
            style="display: inline"
          ></em>
          <em
            v-show="status_pwd == 5"
            class="icon_ok"
            style="display: inline"
          ></em>
          <i style="display: block" v-show="status_pwd == 2">请输入您的密码</i>
          <i style="display: block" v-show="status_pwd == 3"
            >密码长度应为6~12个字符之间</i
          >
        </li>
        <li>
          <span>重复密码：</span>
          <input
            type="password"
            id="upwd2"
            placeholder="请重复输入密码"
            v-model="repasswd"
            @blur="checkRepasswd"
          />
          <em
            v-show="status_rePwd == 2"
            class="icon_error"
            style="display: inline"
          ></em>
          <em
            v-show="status_rePwd == 5"
            class="icon_ok"
            style="display: inline"
          ></em>
          <i style="display: block" v-show="status_rePwd == 2"
            >两次输入的密码不一致</i
          >
        </li>
        <li>
          <span>手机号：</span>
          <input
            type="text"
            id="phone"
            placeholder="请输入手机号"
            v-model="phone"
            @blur="checkPhone"
          />
          <em
            v-show="status_phone == 2 || status_phone == 3 || status_phone == 4"
            class="icon_error"
            style="display: inline"
          ></em>
          <em
            v-show="status_phone == 5"
            class="icon_ok"
            style="display: inline"
          ></em>
          <i style="display: block" v-show="status_phone == 2"
            >请输入您的手机号</i
          >
          <i style="display: block" v-show="status_phone == 3"
            >手机号格式不正确</i
          >
          <i style="display: block" v-show="status_phone == 4"
            >此手机号已注册</i
          >
        </li>
        <li>
          <span>验证码：</span>
          <input
            type="text"
            class="inp_yzm"
            placeholder="请输入验证码"
            v-model="code"
          />
          <img src="../assets/images/yzm.png" alt="" />
          <strong class="icon_refresh"></strong>
        </li>
        <li class="li_checkbox">
          <label>
            <input type="checkbox" v-model="agree" />
            <span>我已阅读并同意用户注册协议</span>
          </label>
        </li>
        <li class="li_btn">
          <button type="button" v-if="agree" @click="doRegist">提交注册</button>
          <button type="button" class="disabled" disabled="" v-else>
            提交注册
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // 页面数据
  data() {
    return {
      // 控制同意框显示和隐藏
      agree: true,
      email: "",
      passwd: "",
      repasswd: "",
      phone: "",
      code: "",
      // 状态
      status_email: 1,
      status_pwd: 1,
      status_rePwd: 1,
      status_phone: 1,
    };
  },

  // 页面方法
  methods: {
    // 点击按钮，执行注册
    async doRegist() {
      if (
        this.status_email +
          this.status_phone +
          this.status_pwd +
          this.status_rePwd !=
        5 * 4
      ) {
        alert("请确保所有信息都正确!");
        return;
      }
      const url = "user_register.php";
      const params = `uname=${this.email}&phone=${this.phone}&upwd=${this.passwd}`;
      // 向后端发送请求
      const res = await this.axios.post(url, params);
      // console.log(res);
      const { code, uid, uname } = res.data;
      // 判断请求是否成功
      if (code == 1) {
        alert(`注册成功！即将跳转到刚才的页面`);
        // 存放用户信息到vueX
        this.$store.commit("updateUser", { uid, uname, phone: this.phone });
        // 跳转到首页
        this.$router.replace("/");
      } else {
        alert(`注册失败！请稍后再试`);
      }
    },

    // 检测手机号的方法
    async checkPhone() {
      const phone = this.phone.trim();
      // 1.普通
      // 2.空
      if (phone.length == 0) return (this.status_phone = 2);
      // 3.格式错误
      const reg_phone = /^1[3-9]\d{9}$/;
      if (!reg_phone.test(phone)) return (this.status_phone = 3);
      // 4.已注册
      const url = "user_check_phone.php?phone=" + this.phone;
      // 向后端发送请求
      const res = await this.axios.get(url);
      // console.log(res);
      if (res.data.code == 1) {
        this.status_phone = 4;
      } else {
        this.status_phone = 5;
      }
      // 5.正确
    },

    // 检测重复密码的方法
    checkRepasswd() {
      const repasswd = this.repasswd.trim();
      // 1.普通
      // 2.不一致
      if (this.passwd != repasswd) return (this.status_rePwd = 2);
      // 5.一致
      this.status_rePwd = 5;
    },

    // 检测密码的方法
    checkPasswd() {
      const passwd = this.passwd.trim();
      // 1.普通
      // 2.空
      if (passwd.length == 0) return (this.status_pwd = 2);
      // 3.长度错误
      if (passwd.length < 6 || passwd.length > 12) return (this.status_pwd = 3);
      // 5.正确
      this.status_pwd = 5;
    },

    // 检测邮箱的方法
    async checkEmail() {
      const email = this.email.trim(); //去除两端空格
      // 判断：
      // 1.普通：什么都不显示
      // 2.空
      if (email.length == 0) return (this.status_email = 2);
      // 3.格式错误：正则表达式
      const reg = /^([a-zA-Z0-9])(\w|\-)+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
      if (!reg.test(email)) return (this.status_email = 3);
      // 4.已注册
      const url = `user_check_uname.php?uname=${this.email}`;
      // 向后端发送请求
      const res = await this.axios.get(url);
      // console.log(res);
      // 判断：code为1表示已存在 code为2表示不存在
      if (res.data.code == 1) {
        this.status_email = 4;
      } else {
        this.status_email = 5;
      }
      // 5.成功
    },
  },
};
</script>

<style></style>
