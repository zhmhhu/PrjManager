<template>
<div>
  <div>数据来自宁波市水利建设市场信用信息报送系统，此处仅供查看</div>
  <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#FF00FF" router>
    <el-submenu index="2">
    <template slot="title">用户类型</template>
    <el-menu-item index="2-1" :route="{path: '/departhome'}">项目法人</el-menu-item>
    <el-menu-item index="2-2" :route="{path: '/departhome'}">设计单位</el-menu-item>
    <el-menu-item index="2-3" :route="{path: '/departhome'}">监理单位</el-menu-item>
    <el-menu-item index="2-4" :route="{path: '/departhome'}">施工单位</el-menu-item>
    </el-submenu>
  <el-menu-item index="1" :route="{path: '/depart/userhome'}">人员设置
    </el-menu-item>
  <el-menu-item index="3" :route="{path: '/depart/userapp'}">模块权限</el-menu-item>
</el-menu>
<el-col :span="24" class="content-wrapper">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
</el-col>
</div>  
</template>


<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  mounted: function() {
    //视图加载后，直接打开第一个子菜单
    this.$nextTick(function() {
      //this.$router.push({ path: "/depart/userhome" });
    });
  },
  // watch: {
  //   $route: "check"
  // },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
    // check() {
    //   console.log(this.$router.path);
    // }
  }
};
</script>