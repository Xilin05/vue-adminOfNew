<template>
	<div class="login-register">
		<div class="contain">
      <!-- <form action="" :model="ruleForm"> -->
        <div class="big-box" :class="{active:logining}">
				<div class="big-contain" v-if="logining">
					<div class="btitle">账户登录</div>
					<div class="bform">
						<input type="email" placeholder="邮箱" v-model="ruleForm.username">
						<span class="errTips" >* 用户名填写错误 *</span>
						<input type="password" placeholder="密码" v-model="ruleForm.password">
						<span class="errTips" >* 密码填写错误 *</span>
					</div>
					<button class="bbutton" @click.prevent="login">登录</button>
				</div>
        <!-- </form> -->
        <!-- <form action="" :model="forgetForm"> -->
          <div class="big-contain" >
					<div class="btitle">忘记密码</div>
					<div class="bform">
						<input type="text" placeholder="用户名" v-model="forgetForm.username">
						<span class="errTips" >* 用户名已经存在！ *</span>
						<input type="email" placeholder="邮箱" v-model="forgetForm.useremail">
						<!-- <input type="password" placeholder="密码" v-model="signForm.password"> -->
						<input type="email" placeholder="验证码" v-model="forgetForm.vecode">
            <button class="bbutton" @click.prevent="register">获取验证码</button>
					</div>
				</div>
        <!-- </form> -->
			</div>
        <div class="small-box" :class="{active:logining}">
          <div class="small-contain" v-if="logining">
            <div class="stitle">你好，朋友!</div>
            <p class="scontent">忘记密码？这里可以找回来！</p>
            <button class="sbutton" @click.prevent="changeForgetType()">找回密码</button>
          </div>
				<div class="small-contain" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">与我们保持联系，请登录你的账户</p>
					<button class="sbutton" @click="changeLoginType()">登录</button>
				</div>
			</div>
		</div>
</template>

<script>
export default {
    name: "login-register",
    data() {
        return {
            // isLogin:false,
            // emailError: false,
            // passwordError: false,
            // existed: false,
            // form:{
            // 	username:'',
            // 	useremail:'',
            // 	userpwd:''
            // }

            logining: false,
            ruleForm: {
                username: "admin",
                password: ""
                // vecode: ""
            },
            forgetForm: {
                username: "",
                useremail: "",
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
                ]
                // vecode: [
                //     {
                //         required: true,
                //         message: "请输入验证码",
                //         trigger: "blur"
                //     }
                // ]
            }
        };
    },
    methods: {
        changeForgetType() {
            this.logining = !this.logining;
            this.forgetForm.username = "";
            this.forgetForm.password = "";
            this.forgetForm.vecode = "";
        },
        changeLoginType() {
            this.logining = !this.logining;
            this.ruleForm.username = "";
            this.ruleForm.useremail = "";
        },
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
        }
        // login() {
        //     const self = this;
        //     if (self.form.useremail != "" && self.form.userpwd != "") {
        //         self.$axios({
        //             method: "post",
        //             url: "http://127.0.0.1:10520/api/user/login",
        //             data: {
        //                 email: self.form.useremail,
        //                 password: self.form.userpwd
        //             }
        //         })
        //             .then(res => {
        //                 switch (res.data) {
        //                     case 0:
        //                         alert("登陆成功！");
        //                         break;
        //                     case -1:
        //                         this.emailError = true;
        //                         break;
        //                     case 1:
        //                         this.passwordError = true;
        //                         break;
        //                 }
        //             })
        //             .catch(err => {
        //                 console.log(err);
        //             });
        //     } else {
        //         alert("填写不能为空！");
        //     }
        // },
        // register() {
        //     const self = this;
        //     if (
        //         self.form.username != "" &&
        //         self.form.useremail != "" &&
        //         self.form.userpwd != ""
        //     ) {
        //         self.$axios({
        //             method: "post",
        //             url: "http://127.0.0.1:10520/api/user/add",
        //             data: {
        //                 username: self.form.username,
        //                 email: self.form.useremail,
        //                 password: self.form.userpwd
        //             }
        //         })
        //             .then(res => {
        //                 switch (res.data) {
        //                     case 0:
        //                         alert("注册成功！");
        //                         this.login();
        //                         break;
        //                     case -1:
        //                         this.existed = true;
        //                         break;
        //                 }
        //             })
        //             .catch(err => {
        //                 console.log(err);
        //             });
        //     } else {
        //         alert("填写不能为空！");
        //     }
        // }
    }
};
</script>

<style scoped="scoped">
.login-register {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
}
.contain {
    width: 60%;
    height: 60%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
.big-box {
    width: 70%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 30%;
    transform: translateX(0%);
    transition: all 1s;
}
.big-contain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.btitle {
    font-size: 1.5em;
    font-weight: bold;
    color: rgb(57, 167, 176);
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
    height: 30px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding-left: 2em;
    background-color: #f0f0f0;
}
.bbutton {
    width: 20%;
    height: 40px;
    border-radius: 24px;
    border: none;
    outline: none;
    background-color: rgb(57, 167, 176);
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
}
.small-box {
    width: 30%;
    height: 100%;
    background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
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
    transition: all 0.5s;
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
