<template>
  <div id="tab-bar">
    <mt-tabbar v-model="selected" v-show="isShow" fixed class="border-1px-top">
      <mt-tab-item id="main">
        <img :src="img1" slot="icon">首页
      </mt-tab-item>
      <mt-tab-item id="tool">
        <img :src="img3" slot="icon">应用中心
      </mt-tab-item>
      <mt-tab-item id="my">
        <img :src="img5" slot="icon">我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<style>
</style>
<script>

var imgUrl_selected1 = require('../../../assets/tool/home_selected.png');
var imgUrl_selected3 = require('../../../assets/tool/tool_selected.png');
var imgUrl_selected5 = require('../../../assets/tool/user_selected.png');
var imgUrl1 = require('../../../assets/tool/home.png');
var imgUrl3 = require('../../../assets/tool/tool.png');
var imgUrl5 = require('../../../assets/tool/user.png');
  export default {
    data(){
      return {
        selected: this.$store.state.selectedTab,
        img1: imgUrl_selected1,
        img3: imgUrl3,
        img5: imgUrl5
      }
    },
    computed: {
      isShow: function () {
        return this.$store.state.footerVisible;
      }
    },
    watch: {
      'selected': {
        handler(){
          if (this.selected === "main") {
            this.$router.push('/main');
            this.img1 = imgUrl_selected1
          } else {
            this.img1 = imgUrl1
          }
          if (this.selected === "tool") {
            this.$router.push('/tool');
            this.img3 = imgUrl_selected3
          } else {
            this.img3 = imgUrl3
          }
          if (this.selected === "my") {
            this.$router.push('/my');
            this.img5 = imgUrl_selected5
          } else {
            this.img5 = imgUrl5
          }
        }
      }
    }
  }
</script>
