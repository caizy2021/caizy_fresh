<template>
  <div>
    <!-- index.html -->

    <!--banner-->
    <swiper ref="mySwiper" :options="swiperOption">
      <!-- webpack打包机制：
      是静态分析的依赖关系，有依赖就会自动引入 -->
      <!-- src="../assets/images/banner_01.jpg"
      webpack分析代码时 就知道img依赖此图片显示，就会打包图片 -->
      <!-- swiper只能动态分析 -->
      <swiper-slide v-for="(item, index) in banners" :key="index">
        <img :src="item" alt="" />
      </swiper-slide>
      <!-- 上一页和下一页 -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <!-- 页数指示点 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <!--main-->
    <div class="main container">
      <div class="ind_con1">
        <h2 class="title"><a href="#" class="more">more</a>净美仕产品</h2>
        <ul class="clearfloat">
          <li>
            <a href="#" class="link"
              ><img src="../assets/images/01.jpg" alt=""
            /></a>
          </li>
          <li>
            <a href="#" class="link"
              ><img src="../assets/images/02.jpg" alt=""
            /></a>
          </li>
          <li>
            <a href="#" class="link"
              ><img src="../assets/images/03.jpg" alt=""
            /></a>
          </li>
        </ul>
      </div>
      <div class="ind_con2 clearfloat">
        <div class="ind_about">
          <h2 class="title"><a href="#" class="more">more</a>关于净美仕</h2>
          <p>
            北京净美仕环境科技有限公司自诞生起一直关注人类呼吸健康的问题，并专注于室内空气质量的研究与改善。2003年，非典来袭，环境安全威胁到了每个人的生命，全国陷入一片恐慌。净美仕肩负着为人类创造健康安全生活环境的使命应运而生。2012年7月，亿朗以“净美仕(Mfresh)”为品牌重塑，以崭新的面貌屹立在净化行业。
            <a href="#">查看更多</a>
          </p>
        </div>
        <div class="ind_news">
          <h2 class="title"><a href="#" class="more">more</a>公司动态</h2>
          <ul>
            <li>
              <span>2016-02-21</span
              ><a href="">空气净化器要逆天？ “玫瑰金”“土豪金”齐上阵</a>
            </li>
            <li>
              <span>2016-02-21</span
              ><a href="">净美仕新风净化系统　助力校园新风行动</a>
            </li>
            <li>
              <span>2016-02-21</span
              ><a href="">全国新风行动全面启动 助推净美仕战略升级</a>
            </li>
            <li>
              <span>2016-02-21</span
              ><a href="">智能空气净化器翻盘：净美仕能否领衔?</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // swiper的配置
      swiperOption: {
        // 导航方式的配置
        navigation: {
          // 上一页
          nextEl: ".swiper-button-next",
          // 下一页
          prevEl: ".swiper-button-prev",
        },
        // 页数指示点
        pagination: {
          el: ".swiper-pagination",
        },
        // 循环滚动
        loop: true,
        // 自动滚动
        autoplay: {
          delay: 2000, //间隔时间
          disableOnInteraction: false, //自动滚动的同时可以手动滚动
        },
      },
      banners: [
        // require：静态分析的时候，webpack看到require关键词，就知道后方的文件必须引入
        require("../assets/images/banner_01.jpg"),
        require("../assets/images/banner_02.jpg"),
        require("../assets/images/banner_03.jpg"),
        require("../assets/images/banner_04.jpg"),
      ],
    };
  },
};
</script>

<style></style>
