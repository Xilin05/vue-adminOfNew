<template>
<div>
    <!-- 卡片 -->
        <!-- 1. 面包屑 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    <el-card class="box-card">

        <!-- <el-breadcrumb separator="/"> -->
            <!-- <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="#">用户管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item> -->
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        <!-- </el-breadcrumb> -->
        <!-- 2. 搜索 -->
        <!-- <div class="searchitem">
                        <el-input style='width:150px' v-model="query" placeholder="工号/学号" clearable></el-input>
                    </div>
                    <div class="searchitem">
                        <el-input style='width:150px' v-model="query" placeholder="姓名" clearable></el-input>
                    </div>
        <div class="searchitem">
            <el-select style='width:120px' v-model="form.zhiwei" placeholder="角色" clearable>
                <el-option label="管理员" value="管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
        </div>
        <div class="searchitem">
            <el-select style='width:150px' v-model="form.gangwei" placeholder="身份" collapse-tags multiple
                clearable>
                <el-option label="院长" value="1"></el-option>
                <el-option label="书记" value="2"></el-option>
                <el-option label="辅导员" value="3"></el-option>
                <el-option label="讲师" value="4"></el-option>
                <el-option label="学生" value="5"></el-option>
            </el-select>
            <el-button type="primary" @click="openFullScreen" >搜索</el-button>
        </div>
        <div style="float:right;">
            <el-button type="success" @click='dlgNew = true'>新建</el-button>
        </div> -->
        <el-row>
            <el-col>
                <el-input placeholder="请输入内容" v-model="query" class="input-with-select inputSearch">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                    <el-button type="primary">成功按钮</el-button>
            </el-col>
        </el-row>
        <!-- 3. 表格 -->
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        type="index"
        label="#"
        width="100">
      </el-table-column>
      <el-table-column
        prop="id"
        label="工号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="80">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
      </el-table-column>
    </el-table>
        <!-- 4. 分页 -->
    </el-card>
</div>

</template>

<script>
export default {
    data() {
        return {
            // 获取用户列表查询参数对象
            query: "",
            // 当前页数
            pagenum: 1,
            // 每页显示多少数据
            pagesize: 10,
            // userlist: [],
            // totle: 0,
            form: {
                gangwei: "",
                zhiwei: ""
            },
            tableData: [
                {
                    // date: "1",
                    id: 1107,
                    name: "王小虎",
                    gender: "男",
                    phone: "17876374525",
                    role: "管理员"
                    // address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    // date: "2",
                    id: 1107,
                    name: "王小虎",
                    gender: "男",
                    phone: "17876374525",
                    role: "管理员"
                }
            ]
        };
    },
    created() {
        this.getUserList();
    },
    methods: {
        openFullScreen() {},
        async getUserList() {
            const AUTH_TOKEN = localStorage.getItem("token");
            this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            const res = await this.$http.get(
                `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
                    this.pagesize
                }`
            );
            console.log(res);
        }
        // async getUserList() {
        //     const { data: res } = await this.$http.get("users", {
        //         params: this.queryInfo
        //     });
        //     if (res.meta.status !== 200) {
        //         console.log(res.meta.status);
        //         return this.$message.error("获取用户列表失败！");
        //     }
        //     this.userlist = res.data.users;
        //     this.totle = res.data.totle;
        // }
    }
};
</script>

<style>
.box-card {
    height: 100%;
}
.inputSearch {
    width: 30%;
}
.searchitem {
    display: inline-block;
    margin-bottom: 10px;
}
</style>
