<template>
  <div>
    <!-- product_details.html 12~53 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">产品中心</a>&gt;<a href=""
            >净美仕净化器</a
          >
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="productDetailsList">
      <div class="pd_info clearfloat">
        <div class="pdinfo_img">
          <img :src="productDetailsList.pic" alt="" />
        </div>
        <div class="pdinfo_text">
          <h2>{{ productDetailsList.title1 }}</h2>
          <ul>
            <li>型号：{{ productDetailsList.model }}</li>
            <li>功能：{{ productDetailsList.func }}</li>
            <li>噪音：{{ productDetailsList.noise }}</li>
            <li>风量：{{ productDetailsList.wind }}</li>
            <li>适用对象：{{ productDetailsList.appleTo }}</li>
            <li>适用面积：{{ productDetailsList.size }}</li>
            <li>空气净化能效等级：{{ productDetailsList.level }}</li>
          </ul>
          <p>
            价格：<span>¥</span
            ><strong id="price">{{ productDetailsList.price }}</strong>
          </p>
          <a @click="addToCart" id="addCart"
            ><span class="icon_cart"></span>加入购物车</a
          >
        </div>
      </div>
      <div class="details_box">
        <h2 class="title">产品详情</h2>
        <div class="pd_details" v-html="productDetailsList.detail"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 页面数据
  data() {
    return {
      // 产品详细信息数据
      productDetailsList: [],
    };
  },

  // 生命周期：挂载时
  mounted() {
    // 获取产品详细信息数据
    this.getProductDetailsList();
  },

  // 页面方法
  methods: {
    // 获取产品详细信息数据的方法
    async getProductDetailsList() {
      // 向后端发送请求
      const pid = this.$route.params.pid;
      const url = `product_detail.php?pid=${pid}`;
      const { data: res } = await this.axios.get(url);
      // 处理图片地址数据：拼接
      res.pic = `http://www.codeboy.com:9999/mfresh/${res.pic}`;
      // 处理详情html中的图片地址：正则替换
      // <img src="product-imgs
      // <img src="http://www.codeboy.com:9999/mfresh/product-imgs
      res.detail = res.detail.replace(
        /<img src="product-imgs/g,
        '<img src="http://www.codeboy.com:9999/mfresh/product-imgs'
      );

      console.log(res);
      this.productDetailsList = res;
    },

    // 添加购物车
    async addToCart() {
      // 判断：登录状态=>添加购物车；非登录状态=>跳转到登录页面
      if(this.$store.state.uid){
        // 添加商品到购物车
        const uid = this.$store.state.uid;
        const pid = this.$route.params.pid;
        const url = `cart_detail_add.php?uid=${uid}&pid=${pid}`;
        // 向后端发送请求
        const {data:res} = await this.axios.get(url)
        console.log(res);
        // 判断请求是否成功
        if(res.code==1){
          alert('添加商品到购物车成功！')
        }else{
          alert('添加商品到购物车失败！')
        }
      }else{
        // 编程式跳转：使用代码完成路由的跳转
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style></style>
