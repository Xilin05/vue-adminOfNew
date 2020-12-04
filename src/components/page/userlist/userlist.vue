<template>
    <!-- 卡片 -->
    <el-card class="box-card">
        <!-- 1. 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 2. 搜索 -->

        <!-- 3. 表格 -->

        <!-- 4. 分页 -->
    </el-card>
</template>

<script>
export default {};
</script>

<style>
.box-card {
    height: 100%;
}
</style>
