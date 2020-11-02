<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{active:isLogin}">
        <!-- <div class="" > -->
           <el-form class="big-contain big-box-login" :class="{active:isOpacity}"  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" v-if="isLogin">
            <div class="btitle">账号登录</div>
             <div class="bform1">
              <el-form-item label="用户名" prop="username" >
              <el-input class="" v-model="ruleForm.username"  autocomplete="off"></el-input>
              </el-form-item>
            <el-form-item label="密码"  prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            </div>
                <div style="display:flex;width:80%;justify-content:space-between;text-center:center;">
              <el-form-item style="width:60%">
            <el-button 
                class="bbutton" 
                style="width:60%;min-width:79px" 
                type="primary" 
                @click.prevent="submitForm('ruleForm')"
                @keyup.enter.native="submitForm('ruleForm')"
            >
            提交
            </el-button>
          </el-form-item>
          <el-form-item style="width:60%">
          <el-button class="bbutton" style="width:60%;min-width:79px" @click.prevent="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
            </div>
            
        </el-form>
        <!-- </div> -->
        <el-form class="big-contain big-box-sign" :class="{active:isLogin}" :model="ruleForm" status-icon :rules="rules" ref="forgetForm" label-width="100px" v-else>
            <div class="btitle">找回密码</div>
            <div class="bform1">
              <el-form-item label="用户名" prop="username01" >
              <el-input class="" v-model="forgetForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱"  prop="useremail">
              <el-input type="email" v-model="forgetForm.useremail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码"  prop="vecode">
              <el-input type="text" v-model="forgetForm.vecode" autocomplete="off" ></el-input>
            </el-form-item>
            </div>
            <div style="display:flex;width:80%;justify-content:space-between;text-center:center;">
              <el-form-item style="width:60%">
            <el-button class="bbutton" style="width:60%;min-width:79px" type="primary" @click.prevent="submitForgetForm('forgetForm')"  >提交</el-button>
          </el-form-item>
          <el-form-item style="width:60%">
          <el-button class="bbutton" style="width:60%;min-width:79px" @click.prevent="resetForm('forgetForm')">重置</el-button>
          </el-form-item>
            </div>
            <el-form-item style="">
          </el-form-item>
        </el-form>
      </div>
      <div class="small-box" :class="{active:isLogin}">
        <div class="small-contain" v-if="isLogin">
					<div class="stitle">你好，朋友!</div>
					<p class="scontent">忘记密码？这里可以找回！</p>
					<button class="sbutton" @click.prevent="changeForgetType">找回密码</button>
				</div>
				<div class="small-contain" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">与我们保持联系，请登录你的账户</p>
					<button class="sbutton" @click.prevent="changeLoginType">登录</button>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "login-register",
    data() {
        var validateUser = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkUser");
                }
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
        };

        // ---------------------------------------
        return {
            isLogin: true,
            isOpacity: true,
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }
                ],
                username01: [
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
                useremail: [
                    {
                        required: true,
                        message: "请输入绑定的邮箱",
                        trigger: "blur"
                    }
                ],
                vecode: [
                    {
                        required: true,
                        message: "请输入收到的验证码",
                        trigger: "blur"
                    }
                ]
            },

            ruleForm: {
                username: "admin",
                password: ""
                // vecode: ""
            },
            forgetForm: {
                username: "admin",
                useremail: "",
                vecode: ""
            }
        };
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        changeForgetType() {
            this.isLogin = !this.isLogin;
            this.isOpacity = !this.isOpacity;
            this.forgetForm.username = "";
            this.forgetForm.useremail = "";
            this.forgetForm.vecode = "";
        },
        changeLoginType() {
            this.isLogin = !this.isLogin;
            this.isOpacity = !this.isOpacity;
            this.ruleForm.username = "";
            this.ruleForm.password = "";
        },
        // 新
        submitForm(formName) {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    this.logining = true;
                    const res = await this.$http.post("login", this.ruleForm);
                    // .post("/login", this.ruleForm2, {
                    //   headers: headers,
                    //   transformRequest: transformRequest
                    // })

                    // console.log(res);
                    // const { msg, code } = res.data;
                    const {
                        data,
                        meta: { msg, status }
                    } = res.data;
                    if (status === 200) {
                        // token验证
                        localStorage.setItem("token", data.token);
                        // 验证通过，登陆成功
                        // console.log(res.data);
                        // 1. 提示成功
                        this.logining = false;
                        sessionStorage.setItem("login", this.ruleForm.username);
                        // 2. 跳转首页
                        this.$message({
                            message: "登陆成功！",
                            type: "success"
                        });
                        this.$router.push({ path: "/dashboard" });
                    } else {
                        // 验证失败，登录不成功
                        // 1. 提示错误
                        // console.log(res.data);
                        this.$message.error("登陆失败！请检查用户名和密码！");
                    }
                    // .catch(err => {
                    //     console.error(err);
                    // });
                }
            });
        },
        submitForgetForm() {},
        register() {
            const self = this;
            if (
                self.form.username != "" &&
                self.form.useremail != "" &&
                self.form.userpwd != ""
            ) {
                self.$axios({
                    method: "post",
                    url: "http://127.0.0.1:10520/api/user/add",
                    data: {
                        username: self.form.username,
                        email: self.form.useremail,
                        password: self.form.userpwd
                    }
                })
                    .then(res => {
                        switch (res.data) {
                            case 0:
                                alert("注册成功！");
                                this.login();
                                break;
                            case -1:
                                this.existed = true;
                                break;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                alert("填写不能为空！");
            }
        }
    }
};
</script>

<style scoped="scoped">
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

.login-register {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background-color: rgb(245, 245, 245);
}
.contain {
    width: 60%;
    min-width: 512px;
    height: 60%;
    position: relative;
    /* margin: 10px 10px; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 5 5 20px #adacac, 5 5 20px #a8a6a6;
}
.big-box {
    display: flex;
    width: 70%;
    /* min-width: 256px; */
    height: 100%;
    position: absolute;
    top: 0;
    left: 30%;
    /* opacity: 1; */
    transform: translateX(0%);
    transition: all 1s;
}

.big-box-login {
    opacity: 0;
    transition: all 0.6s;
}
.big-box-login.active {
    opacity: 1;
    transition: all 0.6s;
}
.big-box-sign {
    opacity: 1;
    transform: translateX(0%);
    transition: all 0.6s;
}

.big-box-sign.active {
    opacity: 0;
    transform: translateX(0%);
    transition: all 0.6s;
}

.big-contain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.login-contain {
    padding: 50px 0px;
}
.btitle {
    font-size: 1.5em;
    font-weight: bold;
    color: rgb(98, 148, 224);
}
.bform1 {
    width: 100%;
    height: 30%;
    margin: 28px 0;
    padding: 2em 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.bform1 .errTips {
    display: block;
    width: 50%;
    text-align: left;
    color: red;
    font-size: 0.7em;
    margin-left: 1em;
}
.bform1 input {
    width: 50%;
    height: 45px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding-left: 2em;
    background-color: #f0f0f0;
}
.bform {
    width: 100%;
    height: 40%;
    padding: 2em 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.bform .errTips {
    display: block;
    width: 50%;
    text-align: left;
    color: red;
    font-size: 0.7em;
    margin-left: 1em;
}
.bform input {
    width: 50%;
    height: 45px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding-left: 2em;
    background-color: #f0f0f0;
}
.bbutton {
    width: 25%;
    height: 40px;
    border-radius: 24px;
    border: none;
    outline: none;
    background-color: rgb(34, 68, 119);
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
}
.small-box {
    width: 30%;
    /* min-width: 160px; */
    height: 100%;
    /* rgb(50, 65, 87) */
    background: linear-gradient(135deg, rgb(98, 148, 224), rgb(32, 74, 138));
    /* background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145)); */
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(0%);
    transition: all 1s;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
}
.small-contain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.stitle {
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
}
.scontent {
    font-size: 0.8em;
    color: #fff;
    text-align: center;
    padding: 2em 4em;
    line-height: 1.7em;
}
.sbutton {
    width: 60%;
    height: 40px;
    border-radius: 24px;
    border: 1px solid #fff;
    outline: none;
    background-color: transparent;
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
}

.big-box.active {
    left: 0;
    transition: all 1s;
    /* opacity: 1; */
}
.small-box.active {
    left: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    transform: translateX(-100%);
    transition: all 1s;
}
</style>
