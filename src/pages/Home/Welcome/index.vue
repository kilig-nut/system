<template>
    <fieldset>
        <h1>Welcome</h1>
        <el-table :data="welcomeData" v-loading="loading">
            <el-table-column prop="username" 
                            label="登入账户"
                            align="center"
                            width="180" > 
            </el-table-column>
            <el-table-column prop="lastLogin.ip" 
                            label="上次登入ip"
                            align="center"
                            width="180" > 
            </el-table-column>
            <el-table-column prop="lastLogin.loginTime" 
                            label="上次登入时间"
                            align="center" > 
            </el-table-column>
            <el-table-column prop="nowLogin.ip" 
                            label="本次登入ip"
                            align="center" > 
            </el-table-column>
            <el-table-column prop="nowLogin.loginTime" 
                            label="本次登入时间"
                            align="center"> 
            </el-table-column>
        </el-table>
        <!-- <button @click="send">发送请求</button>
        <button @click="abort">发送中断请求</button> -->
    </fieldset>
</template>
<script>
import { getLoginLog } from "@/api"
    export default{
        data () {
            return {
                loading:true,
                welcomeData:[]
            }
        },
        created () {
            getLoginLog()
            .then(res=>{
                    // console.log(res);
                if(res.data && res.data.state){
                    // console.log(res);
                    this.welcomeData = res.data.data;
                    this.loading = false;
                }
            })
        }
        // methods:{
        //     send(){
        //         getLoginLog(this)
        //         .then(res=>{
        //             // console.log(res);
        //         })
        //     },
        //     abort(){
        //         console.log(this.cancel);
        //         this.cancel就是一个中断函数
        //         if(typeof this.cancel ==="function"){
        //             this.cancel()
        //         }
        //     }
        // }
    }
</script>