<template>
  <div class="login-page">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
      <p>千锋管理系统</p>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
      </el-form-item>
    </el-form>
    <div class="bg-video">
      <!-- autoplay 视频就绪后立即播放
      muted 规定视频的音频输出应该被静音
      loop 当媒介文件完成播放后再次开始播放 -->
      <video class="v1" autoplay muted loop>
        <source src="@/assets/video/bg_video.mp4">
      </video>
    </div>
  </div>
</template>
<script>
//登入逻辑的实现
//1.收集用户输入的username和password传递给后端
//this.loginForm.username和this.loginForm.password
//2.登入通过后，将后端返回的token存在本地
//3.每次请求的时候，携带token 到请求头 authorization
//4.展示token校验正确的数据
//5.校验不通过，跳转到登入页
  import {login} from "@/api";
  import {mapMutations} from "vuex"//引入模块
  export default {
    data() {
      //jsDoc注释方式
      /***
       * @param {Object} rule 就是一个表单验证对象
       * @param {String} value 输入值
       * @param {Function} callback 校验通过不传参 不通过传参
       */
      //校验用户名
      var validateUsername = (rule, value, callback) => {
        // console.log(rule);
        // console.log(value);//输入框中输入的值
        //用户名正则，4到16位（字母，数字，下划线，减号）
        // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/; 
        //如果验证不通过
        //!uPattern.test(value)
        if(!value){
          //验证没通过 传参
          callback("4到16位（字母，数字，下划线，减号")
        }else{
          //验证通过则不显示 不传参
          callback()
        }
      };
      //校验密码
      var validatePassword = (rule, value, callback) => {
        if(!value){
          //就显示 传参
          callback("密码错误")
        }else{
          //验证通过则不显示 不传参
          callback()
        }
      };
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            //validator 传入校验的函数
            //trigger 触发方式 blur 焦点
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapMutations(['SET_USERINFO']),//映射
      submitForm(formName) {
        //$refs可以得到引用的实例或者引用的dom
        this.$refs[formName].validate((valid) => {
          if (valid) {//代表本地校验通过
            //打开登入加载动画
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });

            // 1.收集用户输入的username和password传递给后端
            // login(this.loginForm.username,this.loginForm.password);
            let {username,password} = this.loginForm;
            login(username,password)//发送请求
            .then(res=>{//请求成功

            //只要服务器响应了就关掉登入加载动画
              loading.close()

              console.log(res);
              if(res.data.state){//如果登录成功
                //登入成功提示
                this.$message.success("登录成功")
                //记录下token
                localStorage.setItem('wf-token',res.data.token)
                //记录下用户名
                localStorage.setItem("wf-userInfo",JSON.stringify(res.data.userInfo))
                // 用户按钮
                localStorage.setItem('wf-permission-buttons', JSON.stringify(res.data.permission.buttons))
                //更改vuex中state['userInfo']的值
                this.SET_USERINFO(res.data.userInfo)
                //跳转到首页
                this.$router.push("/Welcome");//往当前浏览器栈中添加一项
              }else{
                //用户名或者密码错误
                this.$message.error('用户名或者密码错误');
              }
            })
            .catch(err=>{//请求失败
              console.log(err);
            })
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
/* 表单 */
.el-form{
  width: 400px;
  position: absolute;
  top: 200px;
  right: 300px;
  background: rgba(83, 107, 182, 0.46);
  padding-top: 20px;
}
/* 表单标题 */
.el-form p{
  font: 20px/25px "";
  color: white;
  text-align: center;
}
/* 背景视频 */
.bg-video{
  width: 100%;
  height: auto;
  left: 0;
  top: 0;
  z-index: -1;
  position: absolute;
}
.v1{
  width: 100%;
  height: auto;
}
.login-page{
  height: 100%;
  width: 100%;
  background: url("../../assets/imgs/bg2.png") no-repeat 200px 100px;
  overflow: hidden;
}
</style>