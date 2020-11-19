import Home from "../pages/Home"

//动态路由
const dynamicRoutes = [
    {
        path: "/",
        name: "home",
        component:Home,
        children:[]
    },
    {
        path:"*",
        component:()=>import(/*webpackChunkName:"page404"*/"../pages/Page404")
    }
]

export default dynamicRoutes