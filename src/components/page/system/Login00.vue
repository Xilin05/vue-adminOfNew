<template>
    <div class="login-wrap">
        <div class="ms-title">elmentUI项目</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username" style="margin-bottom:20px">
                    <el-input v-model="ruleForm.username" size="medium" suffix-icon="iconfont icon-user" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" style="margin-bottom:20px">
                    <el-input type="password" placeholder="密码" size="medium" suffix-icon="iconfont icon-mima" v-model="ruleForm.password"
                        @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="vecode" style="margin-bottom:20px">
                    <el-input size="medium" style="width:188px;position:relative;top:-17px;" placeholder="请输入右侧验证码" v-model="ruleForm.vecode">
                    </el-input>
                    <img src='static/img/code.png' style="height:44px;" />
                </el-form-item>
                <el-form-item>
                    <el-checkbox :checked="true" label="自动登录" name="type"></el-checkbox>
                    <a class='forgetPsd' @click="forgetPsd">忘记密码</a>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click.prevent="submitForm('ruleForm')">登录</el-button>
                </div>
                <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            logining: false,
            ruleForm: {
                username: "admin",
                password: "",
                vecode: ""
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }
                ],
                vecode: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        // submitForm(formName) {
        //     this.$refs[formName].validate(valid => {
        //         if (valid) {
        //             localStorage.setItem("ms_username", this.ruleForm.username);
        //             this.$router.push("/");
        //         } else {
        //             console.log("提交失败");
        //             return false;
        //         }
        //     });
        // },
        submitForm(formName) {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.logining = true;
                    this.$http
                        // .post("/login", this.ruleForm2, {
                        //   headers: headers,
                        //   transformRequest: transformRequest
                        // })
                        .post("login", this.ruleForm)
                        .then(res => {
                            // console.log("ok");
                            // console.log(res);
                            // const { msg, code } = res.data;
                            const {
                                data,
                                meta: { msg, status }
                            } = res.data;
                            if (this.ruleForm.vecode == "6298") {
                                if (status === 200) {
                                    // if (code != "6298") {
                                    //     this.$message.error("请检查验证码");
                                    // }

                                    // 验证通过，登陆成功
                                    // 1. 提示成功
                                    this.logining = false;
                                    sessionStorage.setItem(
                                        "login",
                                        this.ruleForm.username
                                    );
                                    // 2. 跳转首页
                                    this.$message({
                                        message: "登陆成功！",
                                        type: "success"
                                    });
                                    this.$router.push({ path: "/dashboard" });
                                }
                            } else {
                                // 验证失败，登录不成功
                                // 1. 提示错误
                                // console.log(res.data);
                                this.$message.error("登陆失败！请检查验证码");
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
                    // if (this.ruleForm == "") {
                    //     this.$message.error("登陆失败！请检查用户名和密码");
                    // } else if (this.code != "6298") {
                    //     this.$message.error("登陆失败！请检查验证码");
                    // }
                    this.$message.error("登陆失败！请检查验证码");
                    console.log(res.meta);
                    return false;
                }
            });
        },
        //忘记密码
        forgetPsd() {
            this.$router.push("/forgetPsd");
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #242f42;
    /* background: url('./static/img/bg.jpg') no-repeat; */
}

.ms-title {
    position: absolute;
    /*top: 50%;*/
    width: 100%;
    margin-top: 60px;
    text-align: center;
    font-size: 35px;
    color: #fff;
}

.ms-login {
    position: absolute;
    left: 50%;
    /*top: 50%;*/
    width: 300px;
    height: 260px;
    margin: 130px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    font-size: 14px;
}

.forgetPsd {
    float: right;
    text-decoration: none;
    color: #409eff;
}
.forgetPsd:hover {
    color: #cd4f39;
    cursor: pointer;
}
el-form-item {
    /* margin-bottom: 5px; */
}
</style>
