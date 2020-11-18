<template>
    <div>
        <el-row>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-date"></i> ICLASS教室管理系统</el-breadcrumb-item>
                    <el-breadcrumb-item>系统首页</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class='msgs'>
                    <h3>公告</h3>
                    <el-button type="text" class="more" @click='more'>更多
                    <i class="el-icon-arrow-right el-icon-right"></i></el-button>
                </div>
                <div class='divTable'>
                <table>
                    <tr>
                        <td><a class='detail' @click='see'>【欢迎新同学】给2020级新生的一封信</a></td>
                        <td align='right'>2020-10-03</td>
                    </tr>
                    <tr>
                        <td><a class='detail' @click='see'>第8周校领导接待日安排公告</a></td>
                        <td align='right'>2020-10-28</td>
                    </tr>
                    <tr>
                        <td style='border-bottom:none'><a class='detail' @click='see'>关于学校各个宿舍免费清洗空调的安排</a></td>
                        <td align='right' style='border-bottom:none'>2020-10-27</td>
                    </tr>
                </table>
                </div>
            </el-col>
        </el-row>

        <el-row style="margin-top: 3rem">
            <el-col :span="24">
                    <h3>教室申请情况概览</h3>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 1rem">
            <el-col :span='8'>
                <div id='myChartLine' style='text-align: center;' :style="{width:'345px',height:'300px'}"></div>
                <div class="overview-chart-title" style="margin-left:100px;">申请教室角色分布</div>
            </el-col>
            <el-col :span="8">
                <div id='myChartCircle' :style="{width:'345px',height:'300px'}"></div>
                <div class="overview-chart-title" style="margin-left:120px;">教室类型申请占比</div>
            </el-col>
            <el-col :span="8">
                <div id='myChartBar' :style="{width:'345px',height:'300px'}"></div>
                <div class="overview-chart-title" style="margin-left:120px;">近日教室申请走向</div>
            </el-col>
        </el-row>

        <!-- 查看 -->
        <el-dialog width='45%' title="公告详情"  :visible.sync="messVisible" >
            <h2><i class="el-icon-phone"></i>【欢迎新同学】给2020级新生的一封信</h2>
            <p class='msg'>金风送爽，丹桂飘香，在这个美丽宜人的季节里，我们迎来了新同学。你们将带着青春活力，带着对知识的不懈的追求，带着对高中生活的无限憧憬，迈进了我们的校园。你们将是新学年里我们学校一道亮丽的风景线。相逢是首歌，相聚是欢乐。学校全体师生对你们表示最诚挚和最热烈的欢迎——欢迎你们，新同学！</p>
            <p class='time'>发布时间：2020-10-03</p>
        </el-dialog>
    </div>
</template>

<script>
//引入基本模板
let echarts = require("echarts/lib/echarts");

//引入柱状图组件
require("echarts/lib/chart/bar");

//引入饼状图
require("echarts/lib/chart/pie");

//引入折线图
require("echarts/lib/chart/line");

//引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
    name: "dashboard",
    data() {
        return {
            messVisible: false,
            name: localStorage.getItem("ms_username"),
            publishList: [
                {
                    title: "【欢迎新同学】给2020级新生的一封信",
                    status: false
                },
                {
                    title: "第8周校领导接待日安排公告",
                    status: false
                },
                {
                    title: "关于学校各个宿舍免费清洗空调的安排",
                    status: false
                }
            ]
        };
    },
    beforeCreate() {
        const token = localStorage.getItem("token");
        if (!token) {
            this.$router.push({ path: "/" });
        }
    },
    mounted() {
        //echarts初始化应在钩子函数mounted()中,这个钩子函数是在el 被新创建的 vm.$el 替换
        //并挂载到实例上去之后调用
        this.drawLine();

        this.drawCircle();

        this.drawBar();
    },
    computed: {
        role() {
            return this.name === "admin" ? "超级管理员" : "普通用户";
        }
    },
    methods: {
        see() {
            this.messVisible = true;
        },
        more() {
            this.$router.push("/adsList");
        },
        drawLine() {
            let myChartLine = echarts.init(
                document.getElementById("myChartLine")
            );

            myChartLine.setOption({
                /*title: {
                        text: '集团角色数量对照图'
                    },*/
                tooltip: {},
                xAxis: {
                    data: ["20级", "19级", "18级", "17级", "教师", "其他"]
                },
                yAxis: {},
                series: [
                    {
                        name: "",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
        },
        drawCircle() {
            let myChartCircle = echarts.init(
                document.getElementById("myChartCircle")
            );

            myChartCircle.setOption({
                /*title: {
                        text: '集团下属机构占比'
                    },*/

                tooltip: {
                    formatter: function(params) {
                        let data = params.data;
                        return (
                            data.name +
                            "(" +
                            data.value +
                            ") " +
                            params.percent +
                            "%"
                        );
                    }
                },
                series: [
                    {
                        name: "教室申请类型分布",
                        type: "pie",
                        radius: "55%",
                        data: [
                            {
                                value: 235,
                                name: "其他"
                            },
                            {
                                value: 274,
                                name: "会议室"
                            },
                            {
                                value: 310,
                                name: "实验室"
                            },
                            {
                                value: 335,
                                name: "多媒体教室"
                            },
                            {
                                value: 400,
                                name: "普通教室"
                            }
                        ]
                    }
                ]
            });
        },
        drawBar() {
            let myChartCircle = echarts.init(
                document.getElementById("myChartBar")
            );

            myChartCircle.setOption({
                /*title: {
                        text: '集团近年招生数量'
                    },*/
                xAxis: {
                    type: "category",
                    data: [
                        "周日",
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六"
                    ]
                },
                yAxis: {
                    type: "value",
                    name: "人数(位)"
                },

                tooltip: {
                    formatter: function(params) {
                        return params.name + params.data + "人";
                        // return params.name + "日 " + params.data + "人";
                    }
                },
                series: [
                    {
                        data: [10, 15, 16, 17, 18, 19, 22],
                        type: "line"
                    }
                ]
            });
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

h3 {
    display: inline-block;
    float: left;
}

.more {
    float: right;
    font-size: 12px;
}
.more:hover {
    cursor: pointer;
}
.msgs {
    height: 2.5rem;
}
.msgs::after {
    clear: both;
}
table {
    width: 100%;
    font-size: 13px;
    border-collapse: collapse;
}
table tr {
    height: 40px;
}
table td {
    padding: 10px;
    border-bottom: 1px solid #d9d9d9;
}
.divTable {
}
.detail:hover {
    color: #409eff;
    cursor: pointer;
}
h2 {
    text-align: center;
}
.overview-chart-title {
    font-size: 13px;
}
.msg {
    margin: 10px 0 70px 0;
    text-indent: 28px;
}
.time {
    text-align: right;
}
</style>
