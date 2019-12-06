<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <img v-if="!collapsed" :src="this.logoicon" />        
        
				<!-- {{collapsed?'':'logoicon'}} -->
			</el-col>
			<el-col :span="8">
				<span class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</span>
        <span>{{sysName}}</span>
			</el-col>
			<el-col :span="8" class="userinfo">
    	 <el-dropdown trigger="hover" class='userinfo-inner'>
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> 
          {{sysUserName}} 
          </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>
                <el-button type="text" @click.native="dialogVisible = true">个人信息</el-button>
            </el-dropdown-item>
            <el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown> 
      <!-- <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull userinfo-inner" :width="xwidth"></screenfull>
      </el-tooltip> -->
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router  :collapse="collapsed">
					<template v-for="(item,index) in $router.options.routes " v-if="!item.hidden">

           <!-- 一级菜单，如果有子节点 -->
						<el-submenu :index="index+''" v-if="!item.leaf" :key="item.name">
                <!-- template中是一级菜单标题 -->
                <template slot="title">
                  <i :class="item.iconCls"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <template v-for="(child,cindex) in item.children" v-if="!child.hidden">
                  <!-- 二级菜单，如果有子节点 -->
                  <el-submenu :index="index+'-'+cindex" v-if="child.children&&child.children.length>0" :key="child.name">
                    <template slot="title"><i :class="child.iconCls"></i>{{child.name}}</template>
                    <el-menu-item v-for="grandson in child.children" :key="grandson.name" :index="grandson.path">
                      <i :class="grandson.iconCls"></i>{{grandson.name}}
                    </el-menu-item>
                  </el-submenu>
                  <!-- 二级菜单，如果没有子节点 -->
                  <el-menu-item v-else :index="child.path" :key="child.path" >
                    <i :class="child.iconCls"></i>{{child.name}}
                  </el-menu-item>
                </template>
						</el-submenu>

            <!-- 一级菜单，如果没有子节点 -->
					<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="item.name">
              <!-- 把子节点中的name作为一级菜单标题 -->
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.children[0].name}}</span>          
          </el-menu-item>
					</template>
				</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
          <tags-view></tags-view>
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="dialogClose">
  <span>用户名：{{sysUserName}}</span><br>
  <span>工程编码：{{rescd}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click.native="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click.native="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

	</el-row>
</template>

<script>
import TagsView from "@/components/TagsView.vue";
import Screenfull from "@/components/Screenfull/index.vue";

import { mapGetters } from 'vuex'

export default {
  components: {
    TagsView,
    Screenfull
  },
  data() {
    return {
      sysName: "工程质量管理平台",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      prjName: "",
      rescd:"",
      logoicon : "../static/image/logoicon.png",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
       dialogVisible: false,
       xwidth:50
    };
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
    
      this.sysUserName = user.username || "用户名";
      this.sysUserAvatar = user.avatar || "./static/user/userpic.jpg";
      // this.prjName = user.resnm || "葛岙水库工程";
      this.rescd= user.rescd
    }
  },
  methods: {
    changewidth(){
      this.xwidth=this.xwidth+10
      
    },
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
      
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {

     _this.$cookies.remove("userName");
      _this.$cookies.remove("token");
      //应该清除router路由信息，不然菜单会有问题
      _this.$router.options.routes = [];
      _this.$router.push({ path: "/login" });
        })
        .catch(() => {});
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
     dialogClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    //   logout() {
    //   this.$store.dispatch('LogOut').then(() => {
    //     location.reload()// In order to re-instantiate the vue-router object to avoid bugs
    //   })
    // }  
  },
   computed: {
    // ...mapGetters([
    //   'permission_routers',
    // ]),
  }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;
    .userinfo {
      // text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        float: right;
        // display: inline-block;
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
      .screenfull {
        margin: 12px;
      }
    }
    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        width: 140px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
          padding-top: 5px;
        }
        .breadcrumb-inner {
          float: right;
          padding-top: 5px;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
</style>