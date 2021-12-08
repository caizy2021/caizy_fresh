<template>
  <div>
    <!-- news.html 12~40 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">公司动态</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="news">
        <ul>
          <li v-for="item in newsList" :key="item.nid">
            <span>{{ item.pubTime | dateFormat }}</span>
            <router-link :to="`/news_details/${item.nid}`">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
      <!-- 分页导航-->
      <div class="pages">
        <a @click="getNewsData(pageNum - 1)" v-if="pageNum > 1">上一页</a>
        <a class="default" v-else>上一页</a>
        <!-- cur表示高亮 -->
        <a
          @click="getNewsData(item)"
          :class="{ cur: item === pageNum }"
          v-for="(item, i) in pageCount"
          :key="i"
          >{{ item }}</a
        >
        <a @click="getNewsData(pageNum + 1)" v-if="pageNum < pageCount"
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
      // 公司动态列表
      newsList: [],
      // 总页数
      pageCount: 0,
      // 当前页数
      pageNum: 0,
    };
  },

  // 生命周期：挂载时
  mounted() {
    // 周期中调用函数
    // 获取公司动态数据
    this.getNewsData(1);
  },

  // 页面方法
  methods: {
    // 获取公司动态数据的方法
    async getNewsData(newPageNum) {
      // 向后端发送请求
      // 如果当前页和要请求页是同一页数据，那么就不发送请求
      if (this.newsList && newPageNum == this.pageNum) return;
      const { data: res } = await this.axios.get(
        `news_select.php?pageNum=${newPageNum}`
      );
      this.newsList = res.data;
      this.pageCount = res.pageCount;
      this.pageNum = res.pageNum;
      console.log(res);
    },
  },
};
</script>

<style></style>
