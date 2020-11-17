import axios from "axios";//引入axios

//配置跨域代理
axios.defaults.baseURL = process.env.NODE_ENV==='development'?"/api":"http://www.chst.vip"

axios.defaults.withCredentials = true;//允许请求携带认证

axios.create({
    timeout:4000
})

export default axios;