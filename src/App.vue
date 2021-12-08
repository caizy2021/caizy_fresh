<template>
  <div>
    <Header />
    <!-- 使用路由切换的页面 -->
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  // 注册子组件
  components: { Header, Footer },
};
</script>

<style>
@import "./assets/css/common.css";
@import "./assets/css/mycss.css";
</style>
