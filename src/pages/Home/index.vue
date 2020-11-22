<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200">
        <!-- handleOpen菜单展开的时候触发 handleClose菜单关闭的时候触发 -->
        <!-- collapse是否展开收齐 -->
        <!-- router=true 是否进行路由跳转 将Index作为路径进行跳转页面 -->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" :router=true>
          <!-- <el-menu-item index="1-1">管理首页</el-menu-item>
          <el-submenu index="/students">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">学员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">学员项目管理</el-menu-item>
              <el-menu-item index="1-2">学员资料</el-menu-item>
              <el-menu-item index="1-3">学院宿舍</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="1-1">考勤管理</el-menu-item>
          <el-menu-item index="1-1">数据统计</el-menu-item>
          <el-menu-item index="1-1">我的中心</el-menu-item> -->
          <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <i class="iconfont icon-shouqi" @click="isCollapse=!isCollapse"></i>
              </div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">千锋管理系统</div></el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <!-- 头像 -->
                <el-avatar class="head-portrait" :size="50" :src="squareUrl"></el-avatar>
                <span>欢迎您</span>
                <!-- 通过vuex渲染昵称 -->
                <b class="nickname">{{userInfo.nickname}}</b>
                <span class="quit" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:crumb.path}" v-for="crumb in crumbs">
              {{crumb.meta.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>
<script>
// import {getLoginLog} from "@/api";
import {mapState} from "vuex";
// 侧边栏
  export default {
    computed: {
      ...mapState(['userInfo','menuList','crumbs'])
    },
    data() {
      return {
        isCollapse: false,
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      quit(){
        //退出登入
        //1.清除token和userInfo
        localStorage.removeItem("wf-token");
        localStorage.removeItem("wf-userInfo");
        //2.跳转到登入页
        this.$router.push("/login")
        //刷新页面
        window.location.reload()
      }
    },
    mounted () {
      // getLoginLog()
      // .then(res=>{
      //   // console.log(res);
      // })
    }
  }
</script>
<style scoped>
/* 收起图标样式 */
  .icon-shouqi{
    color: white;
    cursor: pointer;
  }
/* container样式 */
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  /* 侧边栏样式 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  /* 头部样式 */
  /* .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  } */
  .el-col {
    border-radius: 4px;
    background-color: #B3C0D1
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    /* padding: 10px 0; */
    background-color: #B3C0D1;
  }
  /* 头像 */
  .head-portrait{
    vertical-align: middle;
  }
  /* 退出 */
  .quit{
    /* 鼠标变成手 */
    cursor: pointer;
    color: white;
  }
</style>