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
  </div>
</template>
<script>
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
          //就显示 传参
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
          password: '',
          age: ''
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
/* 表单样式 */
.el-form{
  width: 400px;
}
</style>