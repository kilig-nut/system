import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入全局css和element-rest
import "@/assets/styles/base.css"
import "@/assets/styles/el-reset.css"
//引入全局iconfont
import "./assets/iconfont/iconfont.css"
//引入subMenu组件
import qfSubMenu from "qf-sub-menu"
// Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(qfSubMenu)

//路由前置钩子(导航守卫)
router.beforeEach((to,from,next) => {
  // console.log(to);
  // console.log(from);
  //如何拦截用户
  //用户登入后，localStorage中有token
  let token = localStorage.getItem("wf-token") || null;
  if(token){
    //如果是注册页面或者是登入页面，直接放行
    if(store.state.menuList.length==0){
      //说明没有用户路由，触发action获取用户路由
      store.dispatch('FETCH_MENULIST')
      .then(()=>{
        next({path:to.path})
        //这里要注意，Next里面要传参数即要进入的页面的路由信息
        //因为next传参数后，当前要进入的路由会被废止，
        //转而进入参数对应的路由，虽然是同一个路由，
        //这么做主要是为了确保addRoutes生效了
      })
    }else{
      //有路由
      next()
    }
  }else{
    //没有token
    if(to.path === "/login"){
      //如果是去登录页面
      next()//放行
    }else{
      //访问的不是登入页，就要跳转到登入页
      next({path:"/login"})
    }
  }
})

import "./utils/recursionRoutes"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
