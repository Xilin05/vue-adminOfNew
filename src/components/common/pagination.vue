<template>
    <div>
        <el-pagination
        background
        style="margin-top:10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="pageSizeSelect"
        :page-size="pagesize"
        :layout="layout"
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        layout: {
            type: String,
            default: "total, sizes, prev, pager, next, jumper"
        },
        pagenum: {
            type: Number,
            default: 1
        },
        handleSizeChange: {
            type: Function,
            default: () => {}
        },
        handleCurrentChange: {
            type: Function,
            default: () => {}
        },
        pagesize: {
            type: Number,
            default: 10
        },
        pageSizeSelect: {
            type: Array,
            default: () => [2, 3, 10]
        },
        total: {
            type: Number,
            default: 0
        }
    }
};
</script>

<style>
</style>
