import axios from "axios";//引入axios
import router from "../router";//引入router
import ElementUI from "element-ui";//引入elementui

//配置跨域代理
axios.defaults.baseURL = process.env.NODE_ENV==='development'?"/api":"http://www.chst.vip"

//允许请求携带认证
axios.defaults.withCredentials = true;

//创建请求拦截器，可以给每个请求都携带上想要传递的内容
axios.interceptors.request.use(config=>{
    //登入和注册是不需要携带token的
    if(config.url == "/users/login"){
        //放行
        return config;
    }else{
        //取出token
        let token = localStorage.getItem("wf-token")
        //config指的是每一个请求对象
        config.headers['authorization'] = token;
        //放行
        return config;
    }

    // config.url="/users/login?name=123"
    console.log(config);
})

//响应拦截
axios.interceptors.response.use(config => {
    // console.log(config);
    //服务器返回的数据
    let {data} = config;
    if(data.code=="10022" || data.code=="1004"){//1004状态是自定义的
        //在当前的后台api中1004代表token校验失败
        //10022表示session到期失效，提示错误，页面跳转
        //提示错误信息
        //this.$message.success()this无法使用
        ElementUI.Message.error("登入信息失效，请重新登入")
        //ElementUI是一个对象，里面有它的属性和方法，所以可以使用
        //清空token
        localStorage.removeItem("wf-token")
        //并让页面跳转到登入页
        router.push("/login")//引入router就可以这样写
        //否则这样写this.$router.push("/login")
        //刷新页面
        window.location.reload()
    }
    return config;
})

axios.create({
    timeout:4000
})

export default axios;