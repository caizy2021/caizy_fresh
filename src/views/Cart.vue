<template>
  <div>
    <!-- cart.html 12~69 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">产品中心</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="cart">
        <div class="cart_header">
          <span
            >已选商品<em>{{ checkNum }}</em
            >件</span
          >
          <span
            >总金额：<strong>{{ checkPrice }}</strong></span
          >
          <button type="button">结算</button>
        </div>
        <div class="cart_con">
          <div class="cartcon_title">
            <span
              ><input type="checkbox" v-model="checkAll" @change="doCheckAll" />
              全选</span
            >
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
          </div>
          <ul>
            <h2 v-if="products.length == 0">购物车中没有任何商品！</h2>
            <li v-for="(item, index) in products" :key="index">
              <input
                type="checkbox"
                class="cart_checkbox"
                v-model="item.checked"
                @change="doCheck"
              />
              <a href="" class="cart_img"><img :src="item.pic" alt="" /></a>
              <a href="" class="cart_title">{{ item.title1 }}</a>
              <i>{{ item.price }}</i>
              <div>
                <span @click="updateCount(index, -1)">-</span>
                <input type="text" :value="item.count" />
                <span @click="updateCount(index, +1)">+</span>
              </div>
              <strong>{{ item.price * item.count }}</strong>
              <em @click="deleteProduct(index)"></em>
            </li>
            <!--<li>-->
            <!--<input type="checkbox" class="cart_checkbox"/>-->
            <!--<a href="" class="cart_img"><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
            <!--<a href="" class="cart_title">家用除甲醛静音M-8088A</a>-->
            <!--<i>¥1599</i>-->
            <!--<div>-->
            <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
            <!--</div>-->
            <!--<strong>¥1599.00</strong>-->
            <!--<em></em>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="cart_header">
          <span
            >已选商品<em>{{ checkNum }}</em
            >件</span
          >
          <span
            >总金额：<strong>{{ checkPrice }}</strong></span
          >
          <button type="button">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 页面的数据
  data() {
    return {
      products: [],
      checkAll: false,
    };
  },

  // 页面挂载时
  mounted() {
    // 获取购物车列表数据
    this.getProductsList();
  },

  // 页面的方法
  methods: {
    // 监听每个商品是否选中
    doCheck() {
      let total = 0;
      // 遍历：选中的数量
      this.products.forEach((item) => {
        if (item.checked) total += 1;
      });
      // 判断：选中的数量是否等于数组长度
      if (total == this.products.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },

    // 全选的方法
    doCheckAll() {
      this.products.forEach((item) => {
        item.checked = this.checkAll;
      });
    },

    // 删除商品的方法
    async deleteProduct(index) {
      const did = this.products[index].did;
      const url = "cart_detail_delete.php?did=" + did;
      // 向后端发送请求
      const res = await this.axios.get(url);
      if (res.data.code == 1) {
        // splice(n, m)：从序号n开始删除m个元素
        this.products.splice(index, 1);
      }
    },

    // 更新商品数量的方法
    async updateCount(index, delta) {
      // 解构：对应的商品数据
      const { did, pid, count } = this.products[index];
      // 判断：商品数量不能小于1
      if (count == 1 && delta == -1) {
        alert("数量最小为1");
        return;
      }
      // *1: count是字符串类型, 需要转化成数字 再进行运算
      const new_count = count - 0 + delta;
      // URL
      const url = `cart_detail_update.php?did=${did}&pid=${pid}&count=${new_count}`;
      // 向后端发送请求
      const res = await this.axios.get(url);
      console.log(res);
      // 判断请求是否成功
      if (res.data.code == 1) {
        this.products[index].count = count - 0 + delta;
      }
    },

    // 获取购物车列表数据的方法
    async getProductsList() {
      const uid = this.$store.state.uid;
      const url = "cart_detail_select.php?uid=" + uid;
      // 向后端发送请求
      const { data: res } = await this.axios.get(url);
      console.log(res);

      // 为每条数据添加一个checked属性
      res.products.forEach((item) => {
        item.checked = false;
      });

      // 存到data中
      this.products = res.products;
    },
  },

  // 计算属性：通过算法计算出来的值
  computed: {
    // 计算选中的总数
    checkNum() {
      let total = 0;
      this.products.forEach((item) => {
        if (item.checked) total += 1;
      });
      return total;
    },
    // 计算选中的总金额
    checkPrice() {
      let total = 0;
      this.products.forEach((item) => {
        if (item.checked) total += item.price * item.count;
      });
      return total;
    },
  },
};
</script>

<style></style>
