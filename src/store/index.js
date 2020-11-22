import Vue from "vue";
import Vuex from "vuex";
import {getMenuList} from "@/api";

//引入allRoutes
import allRoutes from "@/router/allRoutes"
//引入递归函数
import recursionRoutes from "@/utils/recursionRoutes"
//引入动态路由dynamicRoutes
import dynamicRoutes from "@/router/dynamicRoutes"
//引入router
import router from "@/router"

Vue.use(Vuex);

//刷新页面会丢失用户信息，所以要从localStorage中取
//从localStorage中获取数据，如果数据为空就赋值一个空对象，否则会报错
//逻辑中断
let userInfo = localStorage.getItem("wf-userInfo") || '{}';
userInfo = JSON.parse(userInfo);
let permissionButtons = JSON.parse(localStorage.getItem('wf-permission-buttons')) || {};

export default new Vuex.Store({
  state: {
    userInfo,//用户信息
    menuList:[],//定义用户侧边栏菜单
    crumbs:[],//面包屑
    permissionButtons
  },
  mutations: {
    CLEAR_SIDEMENU(state) {
      state.menuList = []
    },
    //更改userInfo
    SET_USERINFO(state,payload){
      state.userInfo=payload;
    },
    SET_MENULIST(state,payload){
      state.menuList = payload;
      //动态的将路由添加到routes中
      //核心方法router.addRoutes(符合路由配置规则的数据)
      // console.log(state.menuList);
      //1.将menuList赋值给dynamicRoutes的children
      const target = dynamicRoutes.find(item=>item.path==="/")
      target.children = [...state.menuList]
      // console.log(dynamicRoutes);
      //2.动态添加路由配置到router/routes中
      router.addRoutes(dynamicRoutes)
    },
    SET_CRUMBS(state,payload){
      state.crumbs = payload;
    },
    SET_PERMISSION_BUTTONS(state, payload) {
      state.permissionButtons = payload
    }
  },
  actions: {
    //1.发送请求，获取用户菜单数据
    async FETCH_MENULIST({commit}){
      //2.通过allRoutes和返回的用户菜单数据进行对比
      let userMenu = await getMenuList();
      // console.log(userMenu);
      // console.log(123);
      let sideMenu = recursionRoutes(allRoutes,userMenu.data.menuList)
      // console.log(sideMenu);
      //3.将结果提交给mutation
      commit("SET_MENULIST",sideMenu)
    }
  },
  modules: {}
});
