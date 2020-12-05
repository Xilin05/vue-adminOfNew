<template>
  <el-form
    class="big-contain big-box-login"
    :model="ruleForm"
    status-icon
    :rules="rules"
    :ref="ruleForm"
    label-width="100px"
    v-if='isState'
  >
    <div class="btitle">{{title}}</div>
    <div class="bform1">
      <el-form-item label="用户名" prop="username">
        <el-input class v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="validatetext ==='ruleForm'">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="useremail" v-if="validatetext==='forgetForm'">
        <el-input type="email" v-model="ruleForm.useremail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="vecode" v-if="validatetext==='forgetForm'">
        <el-input type="text" v-model="ruleForm.vecode" autocomplete="off"></el-input>
      </el-form-item>
    </div>
    <div style="display:flex;width:80%;justify-content:space-between;text-center:center;">
      <el-form-item style="width:60%">
        <el-button
          class="bbutton"
          style="width:60%;min-width:79px"
          type="primary"
          @click.prevent="submitForm(validatetext)"
          @keyup.enter.native="submitForm(validatetext)"
        >提交</el-button>
      </el-form-item>
      <el-form-item style="width:60%">
        <el-button
          class="bbutton"
          style="width:60%;min-width:79px"
          @click.prevent="resetForm(validatetext)"
        >重置</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    ruleForm: {
      type: Object,
      default: () => {},
    },
    isState: {
      type: Boolean,
      default: true,
    },
    submitForm: {
      type: Function,
      default: () => {},
    },
    resetForm: {
      type: Function,
      default: () => {},
    },
    rules:{
      type: Object,
      default: () => {},
    },
    validatetext:{
      type: String,
      default: "",
    }
  },
};
</script>
