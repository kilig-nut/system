<template>
  <div class="login-page">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
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
//3.每次请求的时候，携带token
//4.展示token校验正确的数据
//5.校验不通过，跳转到登入页
  import {login} from "@/api";
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
      submitForm(formName) {
        //$refs可以得到引用的实例或者引用的dom
        this.$refs[formName].validate((valid) => {
          if (valid) {//代表本地校验通过
            // console.log(this.loginForm.username,this.loginForm.password);
            // 1.收集用户输入的username和password传递给后端
            // login(this.loginForm.username,this.loginForm.password);
            let {username,password} = this.loginForm;
            login(username,password)//发送请求
            .then(res=>{//请求成功
              console.log(res);
              if(res.data.state){//如果登录成功
                localStorage.setItem('token',res.token)
                //跳转到首页
                this.$router.push("/");//往当前浏览器栈中添加一项
              }else{
                //用户名或者密码错误
                alert("用户名或者密码错误")
              }
            })
            .catch(err=>{//请求失败
              console.log(err);
            })
            alert('submit!');
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
  background-color: rgba(0, 0, 255, 0.7);
  padding-top: 20px;
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
</style>