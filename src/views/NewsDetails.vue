<template>
  <div>
    <!-- news_details.html -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">公司动态</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="news_details">
        <h2>{{ newsDetailsData.title }}</h2>
        <span>发布时间：{{ newsDetailsData.pubTime | dateFormat }}</span>
        <div class="news_content" v-html="newsDetailsData.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 页面数据
  data() {
    return {
      // 公司动态详情数据
      newsDetailsData: {},
    };
  },

  // 生命周期：挂载时
  mounted() {
    // 周期中调用函数
    // 获取公司动态详情数据
    this.getNewsDetailsData();
  },

  // 页面方法
  methods: {
    // 获取公司动态详情数据的方法
    async getNewsDetailsData() {
      // 通过路由传参获取数据
      const nid = this.$route.params.nid;
      // 向后端发送请求
      const { data: res } = await this.axios.get(
        `http://www.codeboy.com:9999/mfresh/data/news_detail.php?nid=${nid}`
      );
      // 处理图片地址数据
      // scr="news_imgs" 改成 scr="http://www.codeboy.com:9999/mfresh/news_imgs"
      // replace()正则替换
      res.content = res.content.replace(
        /src="news_imgs/g,
        'src="http://www.codeboy.com:9999/mfresh/news_imgs'
      );
      // 存入
      this.newsDetailsData = res;
      console.log(this.newsDetailsData);
    },
  },
};
</script>

<style></style>
