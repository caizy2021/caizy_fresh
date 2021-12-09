<template>
  <div>
    <!-- product.html 12~98 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">产品中心</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="pl_header">
        <router-link to="/product/1" :class="{ cur: $route.params.type == 1 }"
          >净美仕净化器</router-link
        >
        <router-link to="/product/2" :class="{ cur: $route.params.type == 2 }"
          >净美仕滤网</router-link
        >
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat">
        <li v-for="(item, index) in productList" :key="index">
          <a href=""
            ><img
              :src="`http://www.codeboy.com:9999/mfresh/${item.pic}`"
              alt=""
          /></a>
          <div class="pdlist_text clearfloat">
            <h3>
              <p>{{ item.model }}</p>
              <span>{{ item.title2 }}</span>
            </h3>
            <a href="">查看详情</a>
          </div>
        </li>
      </ul>
      <!-- 分页导航-->
      <div class="pages">
        <a @click="getProductList(pageNum - 1)" v-if="pageNum > 1"
          >上一页</a
        >
        <a class="default" v-else>上一页</a>
        <a
          @click="getProductList(item)"
          v-for="(item, index) in pageCount"
          :key="index"
          :class="{ cur: item == pageNum }"
          >{{ item }}</a
        >
        <a @click="getProductList(pageNum + 1)" v-if="pageNum < pageCount"
          >下一页</a
        >
        <a class="default" v-else>下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 页面数据
  data() {
    return {
      // 产品数据列表
      productList: [],
      // 总页数
      pageCount: 0,
      // 当前页数
      pageNum: 0,
    };
  },

  // 生命周期：挂载时
  mounted() {
    // 获取产品数据列表，解决刷新时没数据的问题
    this.getProductList(1);
  },

  // 路由守卫
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // console.log(to);

    // 放行路由向下执行
    next();
    // 获取产品数据列表
    this.getProductList(1);
  },

  // 页面方法
  methods: {
    // 获取产品数据列表的方法
    async getProductList(newPageNum) {
      const url = `product_select.php?type=${this.$route.params.type}&pageNum=${newPageNum}`;
      // const url = `product_select.php?pageNum=${newPageNum}`;
      const { data: res } = await this.axios.get(url);
      console.log(res);
      this.productList = res.data;
      this.pageCount = res.pageCount;
      this.pageNum = res.pageNum;
    },
  },
};
</script>

<style></style>
