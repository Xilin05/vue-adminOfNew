<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            <i :class="subItem.icon"></i>
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../common/bus";
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: "iconfont icon-xitongshouye",
                    // icon: "iconfont icon-biaoge",
                    index: "dashboard",
                    title: "系统首页"
                },
                {
                    icon: "iconfont icon-shuju",
                    index: "roomAllView",
                    title: "教室总览",
                    subs: [
                        {
                            index: "roomSearch",
                            title: "教室搜索",
                            icon: "iconfont  icon-sousuo"
                        }
                    ]
                },
                {
                    icon: "iconfont icon-yunwei",
                    index: "roomManage",
                    title: "教室管理",
                    subs: [
                        {
                            index: "roomSearch",
                            title: "教室搜索",
                            icon: "iconfont  icon-sousuo"
                        },

                        {
                            index: "roomView",
                            title: "教室总览",
                            icon: "iconfont icon-shuju"
                        },
                        {
                            index: "roomAlter",
                            title: "教室修改",
                            icon: "iconfont icon-bianji"
                        }
                        // {
                        //     index: "dicDengji",
                        //     title: "等级管理",
                        //     icon: "iconfont icon-zhiweiguanli-"
                        // },
                        // {
                        //     index: "dicManage",
                        //     title: "字典管理",
                        //     icon: "iconfont icon-xuexiaoguanli"
                        // }
                    ]
                },
                {
                    icon: "iconfont icon-guanxitu",
                    index: "roomApply",
                    title: "教室申请",
                    subs: [
                        {
                            index: "applyRecord",
                            title: "申请记录",
                            icon: "iconfont icon-renwu"
                        }
                    ]
                },
                {
                    icon: "iconfont icon-qingbaojiankong",
                    index: "roomAudit",
                    title: "教室审批",
                    subs: [
                        {
                            index: "waitingAudit",
                            title: "待审批",
                            icon: "iconfont icon-jiaozhigongguanli"
                        },
                        {
                            index: "roomApplyRecord",
                            title: "教室申请记录",
                            icon: "iconfont icon-renwu"
                        },
                        {
                            icon: "iconfont icon-wendang",
                            index: "auditRecord",
                            title: "审批记录"
                        }
                    ]
                },
                {
                    icon: "iconfont icon-zhexiantu",
                    index: "applyCharts",
                    title: "教室申请情况"
                },
                {
                    icon: "iconfont icon-bingtu",
                    index: "useChartsShow",
                    title: "教室使用情况",
                    subs: [
                        {
                            index: "useCharts",
                            title: "教室使用情况",
                            icon: "iconfont icon-bingtu"
                        },
                        {
                            index: "semesterManage",
                            title: "学期管理",
                            icon: "iconfont icon-xueqiguanli"
                        },
                        {
                            index: "subjectManage",
                            title: "学科管理",
                            icon: "iconfont icon-xuekeguanli"
                        },
                        {
                            index: "banjiManage", // conflict with 'classManage'
                            title: "班级管理",
                            icon: "iconfont icon-banjiguanli"
                        }
                        // {
                        //     index: 'examManage',
                        //     title: '考试管理',
                        //     icon: 'iconfont icon-zaixiankaoshiguanli',
                        // },
                        // {
                        //     index: 'scoreManage',
                        //     title: '成绩管理',
                        //     icon: 'iconfont icon-chengjiguanli',
                        // },
                        // {
                        //     index: 'roomManage',
                        //     title: '教室管理',
                        //     icon: 'iconfont icon-classroom',
                        // },
                        // {
                        //     index: 'classManage',
                        //     title: '课程表管理',
                        //     icon: 'iconfont icon-kechengbiao',
                        // },
                        // {
                        //     index: 'nianjiManage',
                        //     title: '年级管理',
                        //     icon: 'iconfont icon-nianji',
                        // },
                        // {
                        //     index: 'studentManage',
                        //     title: '学生管理',
                        //     icon: 'iconfont icon-nianji',
                        // }
                    ]
                },
                {
                    icon: "iconfont icon-fenzu",
                    index: "userManage",
                    title: "用户管理",
                    subs: [
                        {
                            index: "userList",
                            title: "用户列表",
                            icon: "iconfont icon-yonghu"
                        }
                    ]
                },
                {
                    icon: "iconfont icon-quanxian",
                    index: "authorityManage",
                    title: "权限管理",
                    subs: [
                        {
                            index: "roleList",
                            title: "角色列表",
                            icon: "iconfont icon-_yijicaidanduanxinguanli"
                        },
                        {
                            index: "authorityList",
                            title: "权限列表",
                            icon: "iconfont icon-tongdao"
                        }
                    ]
                },

                {
                    icon: "iconfont icon-shangchuan1",
                    index: "fileUpload",
                    title: "上传管理",
                    subs: [
                        {
                            index: "uploadRecord",
                            title: "上传记录",
                            icon: "iconfont icon-rizhi-2"
                        },
                        {
                            index: "roomUpload",
                            title: "导入设施",
                            icon: "iconfont icon-shujuku1"
                        }
                        // {
                        //     index:'apiConfig',
                        //     title:'应用接口配置',
                        //     icon:'iconfont icon-jiekoupeizhi'
                        // }
                    ]
                },
                {
                    icon: "iconfont icon-yingyongguanli",
                    index: "changePsd",
                    title: "个人中心"
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace("/", "");
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on("collapse", msg => {
            this.collapse = msg;
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}
.sidebar > ul {
    height: 100%;
}
</style>
