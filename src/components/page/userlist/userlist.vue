<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!--左侧树-->
            <el-row :gutter='10'>
                <el-col :span='6'>
                    <el-tree  :data="dataMenu" :highlight-current="true"  node-key="id" :default-expanded-keys="[2]" :indent='14'
                        :expand-on-click-node="false" @node-click="handleNodeClick">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span style='font-size:12px'>
                                <i style='margin-right:3px;font-size:15px' class="iconfont" :class="node.icon"></i>{{ node.label }}</span>
                        </span>
                    </el-tree>
                </el-col>
                <!--右侧表格-->
                <el-col :span='18'>
                    <div class="searchitem">
                        <el-input style='width:150px' v-model="form.num" placeholder="工号/学号" clearable></el-input>
                    </div>
                    <div class="searchitem">
                        <el-input style='width:150px' v-model="form.name" placeholder="姓名" clearable></el-input>
                    </div>
                    <!--<div class="searchitem">
                        <el-select style='width:120px' v-model="form.lishu" placeholder="教职工隶属" clearable @change='change'
                            @clear='clear'>
                            <el-option label="学校" value="学校"></el-option>
                            <el-option label="集团" value="集团"></el-option>
                        </el-select>
                    </div>
                    <div class="searchitem">
                        <el-cascader style='width:220px' v-model="form.classes" expand-trigger="hover"
                            :change-on-select="true" :options="witchDept" :show-all-levels="true" clearable placeholder="所属部门"></el-cascader>
                    </div>-->
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
                        <el-button type="primary" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">搜索</el-button>
                    </div>
                    <div style="float:right;">
                        <el-button type="primary" @click='dlgNew = true'>新建</el-button>
                    </div>

                    <el-row>
                        <el-table :data="tableData4" style="width: 100%" border center>
                            <el-table-column prop="F_F" label="工号/学号" align='center'>
                            </el-table-column>
                            <el-table-column prop="date" label="姓名" width='70' align='center'>
                            </el-table-column>
                            <el-table-column prop="F_phone" label="手机号" align='center'>
                            </el-table-column>
                            <el-table-column prop="F_dept" label="所属部门" align='center'>
                            </el-table-column>
                            <el-table-column prop="city" label="角色" align='center'>
                            </el-table-column>
                            <el-table-column prop="address" label="性别" align='center'>
                            </el-table-column>
                            <el-table-column label="操作" width="130" align='center'>
                                <template slot-scope="scope">
                                    <el-button @click='dlgView = true' type="text" size="small">
                                        查看
                                    </el-button>
                                    <el-button @click='dlgEdit = true' type="text" size="small">
                                        修改
                                    </el-button>
                                    <el-button @click='dlgRelation = true' type="text" size="small">
                                        角色
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row style='margin-top:160px'>
                        <el-col :span='24' style="text-align:center">
                            <el-pagination background :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
                                :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="200">
                            </el-pagination>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>


        <!-- 修改角色 -->
        <el-dialog width='40%' title='修改角色' :visible.sync='dlgRelation'>
            <el-table border :data="dataScope" max-height="250" style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="角色名" prop="label">
                </el-table-column>
                <el-table-column label="描述" prop="desc">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click='dlgRelation = false'>关联</el-button>
            </div>
        </el-dialog>

        <!-- 新建职工 -->
        <el-dialog width='60%' title='新建用户' :visible.sync='dlgNew'>
            <el-row type="flex" class="row-bg">
                <el-col :span='12'>
                    <el-form :label-position="labelPosition" label-width="100px" :model="form">
                        <el-form-item label="头像">
                            <el-upload id='nestaff' action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="工号/学号">
                            <el-input style='width:220px' v-model="form.name6" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input style='width:220px' v-model="form.name" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input style='width:220px' v-model="form.name5" clearable></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="所属类型">
                            <el-radio-group v-model="radio2" @change="handnameVisible('new')">
                                <el-radio :label="1">集团</el-radio>
                                <el-radio :label="2">学校</el-radio>
                            </el-radio-group>
                        </el-form-item> -->
                        <el-form-item label="初始密码">
                            <el-input style='width:220px' v-model="form.name55" type='password' clearable></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-radio-group v-model="radio3">
                                <el-radio label="1">在职/在读</el-radio>
                                <el-radio label="2">离职/休学</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span='12'>
                    <el-form :label-position="labelPosition" label-width="100px" :model="form">
                        <el-form-item label="身份证号">
                            <el-input style='width:220px' v-model="form.name4" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select style='width:220px' v-model="form.name2" clearable placeholder="性别">
                                <el-option label="男" value="shanghai"></el-option>
                                <el-option label="女" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出生日期">
                            <el-date-picker v-model="form.name3" type="date" clearable placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="归属学校" v-show="nameVisible">
                            <el-cascader style='width:220px' v-model="form.schools" expand-trigger="hover"
                                :change-on-select="true" :options="dataSchool" :show-all-levels="true" clearable
                                placeholder="所属部门" @change='changeSchool' @clear='clearSchool'></el-cascader>
                        </el-form-item>
                        <el-form-item label="所属部门">
                            <el-cascader style='width:220px' v-model="form.deptclasses" expand-trigger="hover"
                                :change-on-select="true" :options="witchDept" :show-all-levels="true" clearable
                                placeholder="所属部门"></el-cascader>
                        </el-form-item>
                        <el-form-item label="角色">
                            <el-select style='width:220px' v-model="form.name13" placeholder="角色" clearable>
                                <el-option label="管理员" value="管理员"></el-option>
                                <el-option label="普通用户" value="普通用户"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="身份">
                            <el-select style='width:220px' v-model="form.name14" placeholder="身份" collapse-tags
                                multiple clearable>
                                <el-option label="院长" value="1"></el-option>
                                <el-option label="书记" value="2"></el-option>
                                <el-option label="辅导员" value="3"></el-option>
                                <el-option label="讲师" value="4"></el-option>
                                <el-option label="学生" value="5"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="入职时间/入读时间">
                            <el-date-picker v-model="form.name9" type="date" clearable placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="转正时间">
                            <el-date-picker v-model="form.name10" type="date" clearable placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>

                    </el-form>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="cancelDlg('psdForm','dlgNew')" size="small">新建</el-button>
            </div>
        </el-dialog>

        <!-- 修改职工 -->
        <el-dialog width='60%' title='修改用户' :visible.sync='dlgEdit'>
            <el-row type="flex" class="row-bg">
                <el-col :span='12'>
                    <el-form :label-position="labelPosition" label-width="100px" :model="form">
                        <el-form-item label="头像：">
                            <el-upload id='Estaff' action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
                                <img v-if="imageUrlEdit" :src="imageUrlEdit" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="工号/学号">
                            <el-input style='width:220px' v-model="form.name20" disabled clearable></el-input>
                        </el-form-item>
                        <el-form-item label="姓名：">
                            <el-input style='width:220px' v-model="form.name21" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input style='width:220px' v-model="form.name22" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="初始密码">
                            <el-input style='width:220px' v-model="form.name55" type='password' clearable></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-radio-group v-model="radio21">
                                <el-radio label="1">在职/在读</el-radio>
                                <el-radio label="2">离职/休学</el-radio>
                            </el-radio-group>
                        </el-form-item>

                    </el-form>
                </el-col>


                <el-col :span='12'>
                    <el-form :label-position="labelPosition" label-width="100px" :model="form">
                        <el-form-item label="身份证号">
                            <el-input style='width:220px' v-model="form.name23" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select style='width:220px' v-model="form.name24" clearable placeholder="性别">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出生日期">
                            <el-date-picker v-model="form.name25" type="date" clearable placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="归属学校" v-show="nameVisible2">
                            <el-cascader style='width:220px' v-model="form.name26" expand-trigger="hover"
                                :change-on-select="true" :options="dataSchool" :show-all-levels="true" clearable
                                placeholder="所属部门" @change='changeSchool' @clear='clearSchool'></el-cascader>
                        </el-form-item>
                        <el-form-item label="所属部门">
                            <el-cascader style='width:220px' v-model="form.name27" expand-trigger="hover"
                                :change-on-select="true" :options="witchDept" :show-all-levels="true" clearable
                                placeholder="所属部门"></el-cascader>
                        </el-form-item>
                        <el-form-item label="角色">
                            <el-select style='width:220px' v-model="form.name28" placeholder="角色" clearable>
                                <el-option label="管理员" value="1"></el-option>
                                <el-option label="普通用户" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="身份">
                            <el-select style='width:220px' v-model="form.name29" placeholder="身份" collapse-tags
                                multiple clearable>
                                <el-option label="院长" value="1"></el-option>
                                <el-option label="书记" value="2"></el-option>
                                <el-option label="辅导员" value="3"></el-option>
                                <el-option label="讲师" value="4"></el-option>
                                <el-option label="学生" value="5"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="入职时间/入读时间">
                            <el-date-picker v-model="form.name30" type="date" clearable placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="转正时间">
                            <el-date-picker v-model="form.name31" type="date" clearable placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>

                    </el-form>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="cancelDlg('psdForm','dlgEdit')" size="small">修改</el-button>
            </div>
        </el-dialog>

        <!-- 查看职工 -->
        <el-dialog width='50%' title='查看用户' :visible.sync='dlgView'>
            <el-row type="flex" class="row-bg">
                <el-col :span='12'>
                    <el-form :label-position="labelPosition" label-width="100px" :model="form">
                        <el-form-item label="头像：">
                            <img style='width:175px;height:175px;border-radius:20px;' src='../../../assets/logo.png' />

                        </el-form-item>
                        <el-form-item label="工号/学号：">
                            01
                        </el-form-item>
                        <el-form-item label="姓名：">
                            张三
                        </el-form-item>
                        <el-form-item label="手机号：">
                            13555652652
                        </el-form-item>
                        <!--<el-form-item label="chush">
                            集团
                        </el-form-item>-->
                        <el-form-item label="状态：">
                            在职/在读
                        </el-form-item>

                    </el-form>
                </el-col>
                <el-col :span='12'>
                    <el-form :label-position="labelPosition" label-width="120px" :model="form">
                        <el-form-item label="身份证号：">
                            5101811233532623
                        </el-form-item>
                        <el-form-item label="性别：">
                            女
                        </el-form-item>
                        <el-form-item label="出生日期：">
                            1994-05-10
                        </el-form-item>
                        <el-form-item label="所属部门：">
                            网络技术系
                        </el-form-item>
                        <el-form-item label="角色：">
                            管理员
                        </el-form-item>
                        <el-form-item label="身份：">
                            辅导员
                        </el-form-item>
                        <el-form-item label="入职时间：">
                            2016-02-03
                        </el-form-item>
                        <el-form-item label="转正时间：">
                            2016-05-03
                        </el-form-item>

                    </el-form>
                </el-col>

            </el-row>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "baseform",
    data: function() {
        const generateData2 = _ => {
            const data = [];
            // const cities = [
            //     "财务",
            //     "教师",
            //     "员工",
            //     "成绩导入",
            //     "保洁",
            //     "保安",
            //     "后勤"
            // ];
            // const pinyin = [
            //     "caiwu",
            //     "jiaoshi",
            //     "fasongxiaoxi",
            //     "chengjidaoru",
            //     "baojie",
            //     "baoan",
            //     "houqin"
            // ];
            // cities.forEach((city, index) => {
            //     data.push({
            //         label: city,
            //         key: index,
            //         pinyin: pinyin[index]
            //     });
            // });
            return data;
        };
        return {
            //所属部门 动态
            witchDept: [],
            data2: generateData2(),
            value2: [],
            filterMethod(query, item) {
                return item.pinyin.indexOf(query) > -1;
            },
            labelPosition: "right",
            fullscreenLoading: false,
            dlgRole: false,
            dlgRelation: false,
            dlgNew: false,
            dlgEdit: false,
            dlgView: false,
            imageUrlEdit: "./static/img/logo.png",
            imageUrl: "",
            nameVisible: "",
            nameVisible2: "",
            radio2: "",
            radio3: "1",
            radio20: "1",
            radio21: "1",
            checkRole: "",
            form: {
                name: "",
                num: "",
                zhiwei: "",
                gangwei: [],
                lishu: "",
                options: [],
                name2: "",
                name3: "",
                name4: "",
                name5: "",
                name6: "",
                name7: "",
                name8: "",
                name9: "",
                name10: "",
                name11: "",
                name13: "",
                name14: "",
                name12: "",
                schools: [],
                deptclasses: [],
                name20: "01",
                name21: "张三",
                name22: "13856478521",
                name23: "510322158789656556",
                name24: "1",
                name25: "1993-04-05",
                name26: [],
                name27: ["网络技术系"],
                name28: "1",
                name29: ["1"],
                name30: "2015-06-13",
                name31: "2017-06-13",
                name32: "",
                name55: "123456"
            },
            currentPage: 1,
            tableData4: [
                {
                    date: "张三",
                    name: "集团",
                    province: "财务部",
                    city: "管理员",
                    address: "女",
                    state: "2014-02-03",
                    state1: "员工",
                    state2: "正常",
                    F_A: "510322158789656556",
                    F_B: "1993-04-05",
                    F_C: "2015-06-13",
                    F_D: "2017-06-13",
                    F_F: "1900",
                    F_I: "出纳",
                    F_area: "四川",
                    F_phone: "13856478521",
                    F_school: "成都东区天立学校",
                    F_schoolarea: "成都学区",
                    F_dept: "网络技术系"
                },
                {
                    date: "李四",
                    name: "成都天立小学",
                    province: "教师",
                    city: "管理员",
                    address: "男",
                    state: "2015-06-13",
                    state1: "财务",
                    state2: "注销",
                    F_A: "510322158789656556",
                    F_B: "1993-04-05",
                    F_C: "2015-06-13",
                    F_D: "2017-06-13",
                    F_E: "13856478521",
                    F_F: "1807",
                    F_I: "教师",
                    F_area: "重庆",
                    F_phone: "13856478521",
                    F_school: "重庆渝中区天立学校",
                    F_schoolarea: "重庆学区",
                    F_dept: "数码媒体系"
                }
            ],
            //学校下部门
            regionOptions: [
                {
                    value: "四川",
                    label: "四川",
                    children: [
                        {
                            value: "成都学区",
                            label: "成都学区",
                            children: [
                                {
                                    value: "成都天立学校",
                                    label: "成都天立学校",
                                    children: [
                                        {
                                            value: "财务部",
                                            label: "财务部"
                                        },
                                        {
                                            value: "总裁办",
                                            label: "总裁办"
                                        }
                                    ]
                                },
                                {
                                    value: "成都东区天立学校",
                                    label: "成都东区天立学校",
                                    children: [
                                        {
                                            value: "总裁办",
                                            label: "总裁办"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            value: "泸州学区",
                            label: "泸州学区",
                            children: [
                                {
                                    value: "泸州天立学校",
                                    label: "泸州天立学校",
                                    children: [
                                        {
                                            value: "人力资源中心",
                                            label: "人力资源中心"
                                        }
                                    ]
                                },
                                {
                                    value: "泸州东区天立学校",
                                    label: "泸州东区天立学校",
                                    children: [
                                        {
                                            value: "人力资源中心",
                                            label: "人力资源中心"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            value: "宜宾学区",
                            label: "宜宾学区",
                            children: [
                                {
                                    value: "宜宾天立学校",
                                    label: "宜宾天立学校",
                                    children: [
                                        {
                                            value: "总裁办",
                                            label: "总裁办"
                                        }
                                    ]
                                },
                                {
                                    value: "宜宾东区天立学校",
                                    label: "宜宾东区天立学校",
                                    children: [
                                        {
                                            value: "财务部",
                                            label: "财务部"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    value: "湖南",
                    label: "湖南",
                    children: [
                        {
                            value: "湘潭学区",
                            label: "湘潭学区",
                            children: [
                                {
                                    value: "湘潭天立学校",
                                    label: "湘潭天立学校",
                                    children: [
                                        {
                                            value: "总裁办",
                                            label: "总裁办"
                                        }
                                    ]
                                },
                                {
                                    value: "湘潭东区天立学校",
                                    label: "湘潭东区天立学校",
                                    children: [
                                        {
                                            value: "财务部",
                                            label: "财务部"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            //集团下部门
            dataDept: [
                {
                    value: "总裁办",
                    label: "总裁办",
                    children: [
                        {
                            value: "信息体系部",
                            label: "信息体系部"
                        },
                        {
                            value: "计划运营中心",
                            label: "计划运营中心"
                        }
                    ]
                },
                {
                    value: "资金财务中心",
                    label: "资金财务中心",
                    children: [
                        {
                            value: "财务部",
                            label: "财务部"
                        }
                    ]
                },
                {
                    value: "人力资源中心",
                    label: "人力资源中心",
                    children: [
                        {
                            value: "人事部",
                            label: "人事部"
                        }
                    ]
                }
            ],
            //学校集团非指定下部门
            dataBoth: [
                {
                    value: "集团",
                    label: "集团",
                    children: [
                        {
                            value: "总裁办",
                            label: "总裁办",
                            children: [
                                {
                                    value: "信息体系部",
                                    label: "信息体系部"
                                },
                                {
                                    value: "计划运营中心",
                                    label: "计划运营中心"
                                }
                            ]
                        },
                        {
                            value: "资金财务中心",
                            label: "资金财务中心",
                            children: [
                                {
                                    value: "财务部",
                                    label: "财务部"
                                }
                            ]
                        },
                        {
                            value: "人力资源中心",
                            label: "人力资源中心",
                            children: [
                                {
                                    value: "人事部",
                                    label: "人事部"
                                }
                            ]
                        }
                    ]
                },
                {
                    value: "学校",
                    label: "学校",
                    children: [
                        {
                            value: "四川",
                            label: "四川",
                            children: [
                                {
                                    value: "成都学区",
                                    label: "成都学区",
                                    children: [
                                        {
                                            value: "成都天立学校",
                                            label: "成都天立学校",
                                            children: [
                                                {
                                                    value: "财务部",
                                                    label: "财务部"
                                                },
                                                {
                                                    value: "总裁办",
                                                    label: "总裁办"
                                                }
                                            ]
                                        },
                                        {
                                            value: "成都东区天立学校",
                                            label: "成都东区天立学校",
                                            children: [
                                                {
                                                    value: "总裁办",
                                                    label: "总裁办"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    value: "泸州学区",
                                    label: "泸州学区",
                                    children: [
                                        {
                                            value: "泸州天立学校",
                                            label: "泸州天立学校",
                                            children: [
                                                {
                                                    value: "人力资源中心",
                                                    label: "人力资源中心"
                                                }
                                            ]
                                        },
                                        {
                                            value: "泸州东区天立学校",
                                            label: "泸州东区天立学校",
                                            children: [
                                                {
                                                    value: "人力资源中心",
                                                    label: "人力资源中心"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    value: "宜宾学区",
                                    label: "宜宾学区",
                                    children: [
                                        {
                                            value: "宜宾天立学校",
                                            label: "宜宾天立学校",
                                            children: [
                                                {
                                                    value: "总裁办",
                                                    label: "总裁办"
                                                }
                                            ]
                                        },
                                        {
                                            value: "宜宾东区天立学校",
                                            label: "宜宾东区天立学校",
                                            children: [
                                                {
                                                    value: "财务部",
                                                    label: "财务部"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            value: "湖南",
                            label: "湖南",
                            children: [
                                {
                                    value: "湘潭学区",
                                    label: "湘潭学区",
                                    children: [
                                        {
                                            value: "湘潭天立学校",
                                            label: "湘潭天立学校",
                                            children: [
                                                {
                                                    value: "总裁办",
                                                    label: "总裁办"
                                                }
                                            ]
                                        },
                                        {
                                            value: "湘潭东区天立学校",
                                            label: "湘潭东区天立学校",
                                            children: [
                                                {
                                                    value: "财务部",
                                                    label: "财务部"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            dataSchool: [
                {
                    value: "四川",
                    label: "四川",
                    children: [
                        {
                            value: "成都学区",
                            label: "成都学区",
                            children: [
                                {
                                    value: "成都天立学校",
                                    label: "成都天立学校"
                                },
                                {
                                    value: "成都东区天立学校",
                                    label: "成都东区天立学校"
                                }
                            ]
                        },
                        {
                            value: "泸州学区",
                            label: "泸州学区",
                            children: [
                                {
                                    value: "泸州天立学校",
                                    label: "泸州天立学校"
                                },
                                {
                                    value: "泸州东区天立学校",
                                    label: "泸州东区天立学校"
                                }
                            ]
                        },
                        {
                            value: "宜宾学区",
                            label: "宜宾学区",
                            children: [
                                {
                                    value: "宜宾天立学校",
                                    label: "宜宾天立学校"
                                },
                                {
                                    value: "宜宾东区天立学校",
                                    label: "宜宾东区天立学校"
                                }
                            ]
                        }
                    ]
                },
                {
                    value: "湖南",
                    label: "湖南",
                    children: [
                        {
                            value: "湘潭学区",
                            label: "湘潭学区",
                            children: [
                                {
                                    value: "湘潭天立学校",
                                    label: "湘潭天立学校"
                                },
                                {
                                    value: "湘潭东区天立学校",
                                    label: "湘潭东区天立学校"
                                }
                            ]
                        }
                    ]
                }
            ],
            schoolDept: [
                {
                    value: "人力资源中心",
                    label: "人力资源中心"
                },
                {
                    value: "财务部",
                    label: "财务部"
                },
                {
                    value: "运营中心",
                    label: "运营中心"
                }
            ],
            //角色绑定
            dataScope: [
                {
                    id: 1,
                    label: "管理员",
                    desc: "创建管理员角色"
                },
                {
                    id: 3,
                    label: "普通用户",
                    desc: "创建普通用户角色"
                }
                // {
                //     id: 5,
                //     label: "财务",
                //     desc: "创建财务角色"
                // }
            ],
            //左侧组织结构树
            dataMenu: [
                {
                    id: 2,
                    label: "广州大学华软软件学院",
                    icon: "el-icon-menu",
                    children: [
                        {
                            id: 4,
                            label: "最高管理",
                            icon: "icon-ziyuan",
                            children: [
                                {
                                    id: 11,
                                    label: "院长",
                                    icon: "icon-ziyuan"
                                },
                                {
                                    id: 12,
                                    label: "副院长",
                                    icon: "icon-ziyuan"
                                }
                            ]
                        },
                        {
                            id: 5,
                            label: "院党委",
                            icon: "icon-ziyuan"
                            // children: [
                            //     {
                            //         id: 11,
                            //         label: "人事部",
                            //         icon: "icon-ziyuan"
                            //     },
                            //     {
                            //         id: 12,
                            //         label: "培训部",
                            //         icon: "icon-ziyuan"
                            //     },
                            //     {
                            //         id: 13,
                            //         label: "宣传及品牌部",
                            //         icon: "icon-ziyuan"
                            //     }
                            // ]
                        },
                        {
                            id: 6,
                            label: "教保处",
                            icon: "icon-ziyuan"
                            // children: [
                            //     {
                            //         id: 15,
                            //         label: "财务部",
                            //         icon: "icon-ziyuan"
                            //     },
                            //     {
                            //         id: 16,
                            //         label: "资金部",
                            //         icon: "icon-ziyuan"
                            //     }
                            // ]
                        },
                        {
                            id: 7,
                            label: "对外交流中心",
                            icon: "icon-xuexiaoguanli"
                            // children: [
                            //     {
                            //         id: 172,
                            //         label: "财务部",
                            //         icon: "icon-ziyuan"
                            //     },
                            //     {
                            //         id: 17,
                            //         label: "成都学区",
                            //         icon: "icon-_yijicaidanduanxinguanli",
                            //         children: [
                            //             {
                            //                 id: 1712,
                            //                 label: "成都东区天立学校",
                            //                 icon: "icon-classroom",
                            //                 children: [
                            //                     {
                            //                         id: 15,
                            //                         label: "财务部",
                            //                         icon: "icon-ziyuan"
                            //                     }
                            //                 ]
                            //             },
                            //             {
                            //                 id: 1713,
                            //                 label: "成都南区天立学校",
                            //                 icon: "icon-classroom",
                            //                 children: [
                            //                     {
                            //                         id: 15,
                            //                         label: "招生部",
                            //                         icon: "icon-ziyuan"
                            //                     }
                            //                 ]
                            //             },
                            //             {
                            //                 id: 172,
                            //                 label: "招生部",
                            //                 icon: "icon-ziyuan"
                            //             }
                            //         ]
                            //     },
                            //     {
                            //         id: 171,
                            //         label: "泸州学区",
                            //         icon: "icon-_yijicaidanduanxinguanli"
                            //     }
                            // ]
                        },
                        {
                            id: 8,
                            label: "创新创业协会",
                            icon: "icon-xuexiaoguanli"
                            // children: [
                            //     {
                            //         id: 17,
                            //         label: "沙坪坝学区",
                            //         icon: "icon-_yijicaidanduanxinguanli",
                            //         children: [
                            //             {
                            //                 id: 1712,
                            //                 label: "沙坪坝天立学校",
                            //                 icon: "icon-classroom",
                            //                 children: [
                            //                     {
                            //                         id: 15,
                            //                         label: "财务部",
                            //                         icon: "icon-ziyuan"
                            //                     }
                            //                 ]
                            //             }
                            //         ]
                            //     }
                            // ]
                        },
                        {
                            id: 9,
                            label: "创始者俱乐部",
                            icon: "icon-xuexiaoguanli"
                            // children: [
                            //     {
                            //         id: 17,
                            //         label: "湘潭学区",
                            //         icon: "icon-_yijicaidanduanxinguanli"
                            //     }
                            // ]
                        },
                        {
                            id: 10,
                            label: "系别",
                            icon: "icon-xuexiaoguanli",
                            children: [
                                {
                                    id: 13,
                                    label: "软件技术系",
                                    icon: "icon-_yijicaidanduanxinguanli"
                                },
                                {
                                    id: 14,
                                    label: "网络技术系",
                                    icon: "icon-_yijicaidanduanxinguanli"
                                },
                                {
                                    id: 15,
                                    label: "计算机系",
                                    icon: "icon-_yijicaidanduanxinguanli"
                                },
                                {
                                    id: 16,
                                    label: "电子系",
                                    icon: "icon-_yijicaidanduanxinguanli"
                                },
                                {
                                    id: 17,
                                    label: "国贸系",
                                    icon: "icon-_yijicaidanduanxinguanli"
                                },
                                {
                                    id: 18,
                                    label: "外语系",
                                    icon: "icon-_yijicaidanduanxinguanli"
                                },
                                {
                                    id: 19,
                                    label: "财会系",
                                    icon: "icon-_yijicaidanduanxinguanli"
                                },
                                {
                                    id: 20,
                                    label: "数码媒体系",
                                    icon: "icon-_yijicaidanduanxinguanli"
                                },
                                {
                                    id: 21,
                                    label: "管理系",
                                    icon: "icon-_yijicaidanduanxinguanli"
                                },
                                {
                                    id: 22,
                                    label: "游戏系",
                                    icon: "icon-_yijicaidanduanxinguanli"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    mounted() {
        this.witchDept = this.dataBoth;
    },
    computed: {},
    methods: {
        cancelDlg(formName, witchDlg) {
            this[witchDlg] = false;
        },
        openFullScreen() {
            this.fullscreenLoading = true;
            setTimeout(() => {
                this.fullscreenLoading = false;
            }, 1000);
        },
        toW(x) {
            if (x == "view") {
                this.$router.push("/Vstaff");
            } else if (x == "new") {
                this.$router.push("/NEstaff");
            } else if (x == "edit") {
                this.$router.push("/Estaff");
            }
        },
        //教职工隶属 选择
        change(value) {
            if (value === "学校") {
                this.witchDept = this.regionOptions;
            }
            if (value === "集团") {
                this.witchDept = this.dataDept;
            }
        },
        //清空选择
        clear() {
            this.witchDept = this.dataBoth;
        },
        //新增&修改所属类型
        handnameVisible(type) {
            if (type == "new") {
                if (this.radio2 == "1") {
                    this.nameVisible = false;
                    this.witchDept = this.dataDept;
                }
                if (this.radio2 == "2") {
                    this.nameVisible = true;
                    this.witchDept = this.regionOptions;
                }
            }
            if (type == "edit") {
                if (this.radio20 == "1") {
                    this.nameVisible2 = false;
                    this.witchDept = this.dataDept;
                }
                if (this.radio20 == "2") {
                    this.nameVisible2 = true;
                    this.witchDept = this.regionOptions;
                }
            }
        },
        //修改所属学校
        changeSchool(value) {
            this.witchDept = this.schoolDept;
        },
        //清除学校
        clearSchool() {
            this.witchDept = this.regionOptions;
        },
        //点击树
        handleNodeClick(data) {
            if (data.id == 4 || data.id == 11) {
                this.tableData4 = [
                    {
                        date: "王二",
                        name: "集团",
                        province: "财务部",
                        city: "管理员",
                        address: "女",
                        state: "2014-02-03",
                        state1: "员工",
                        state2: "正常",
                        F_A: "510322158789656556",
                        F_B: "1993-04-05",
                        F_C: "2015-06-13",
                        F_D: "2017-06-13",
                        F_F: "1707",
                        F_I: "出纳",
                        F_area: "四川",
                        F_phone: "13856478521",
                        F_school: "成都东区天立学校",
                        F_schoolarea: "成都学区",
                        F_dept: "网络技术系"
                    }
                ];
            } else if (data.id == 2) {
                this.tableData4 = [
                    {
                        date: "王二",
                        name: "集团",
                        province: "财务部",
                        city: "管理员",
                        address: "女",
                        state: "2014-02-03",
                        state1: "员工",
                        state2: "正常",
                        F_A: "510322158789656556",
                        F_B: "1993-04-05",
                        F_C: "2015-06-13",
                        F_D: "2017-06-13",
                        F_F: "1707",
                        F_I: "出纳",
                        F_area: "四川",
                        F_phone: "13856478521",
                        F_school: "成都东区天立学校",
                        F_schoolarea: "成都学区",
                        F_dept: "网络技术系"
                    },
                    {
                        date: "张三",
                        name: "集团",
                        province: "财务部",
                        city: "管理员",
                        address: "女",
                        state: "2014-02-03",
                        state1: "员工",
                        state2: "正常",
                        F_A: "510322158789656556",
                        F_B: "1993-04-05",
                        F_C: "2015-06-13",
                        F_D: "2017-06-13",
                        F_F: "1900",
                        F_I: "出纳",
                        F_area: "四川",
                        F_phone: "13856478521",
                        F_school: "成都东区天立学校",
                        F_schoolarea: "成都学区",
                        F_dept: "网络技术系"
                    },
                    {
                        date: "李四",
                        name: "成都天立小学",
                        province: "教师",
                        city: "管理员",
                        address: "男",
                        state: "2015-06-13",
                        state1: "财务",
                        state2: "注销",
                        F_A: "510322158789656556",
                        F_B: "1993-04-05",
                        F_C: "2015-06-13",
                        F_D: "2017-06-13",
                        F_E: "13856478521",
                        F_F: "1807",
                        F_I: "教师",
                        F_area: "重庆",
                        F_phone: "13856478521",
                        F_school: "重庆渝中区天立学校",
                        F_schoolarea: "重庆学区",
                        F_dept: "数码媒体系"
                    },
                    {
                        date: "赵六",
                        name: "成都天立小学",
                        province: "教师",
                        city: "管理员",
                        address: "男",
                        state: "2015-06-13",
                        state1: "财务",
                        state2: "注销",
                        F_A: "510322158789656556",
                        F_B: "1993-04-05",
                        F_C: "2015-06-13",
                        F_D: "2017-06-13",
                        F_E: "13856478521",
                        F_F: "1008",
                        F_I: "教师",
                        F_area: "重庆",
                        F_phone: "13856478521",
                        F_school: "重庆渝中区天立学校",
                        F_schoolarea: "重庆学区",
                        F_dept: "数码媒体系"
                    },
                    {
                        date: "王五",
                        name: "成都天立小学",
                        province: "教师",
                        city: "管理员",
                        address: "男",
                        state: "2015-06-13",
                        state1: "财务",
                        state2: "注销",
                        F_A: "510322158789656556",
                        F_B: "1993-04-05",
                        F_C: "2015-06-13",
                        F_D: "2017-06-13",
                        F_E: "13856478521",
                        F_F: "1890",
                        F_I: "教师",
                        F_area: "重庆",
                        F_phone: "13856478521",
                        F_school: "重庆渝中区天立学校",
                        F_schoolarea: "重庆学区",
                        F_dept: "数码媒体系"
                    }
                ];
            } else {
                this.tableData4 = [
                    {
                        date: "赵六",
                        name: "成都天立小学",
                        province: "教师",
                        city: "管理员",
                        address: "男",
                        state: "2015-06-13",
                        state1: "财务",
                        state2: "注销",
                        F_A: "510322158789656556",
                        F_B: "1993-04-05",
                        F_C: "2015-06-13",
                        F_D: "2017-06-13",
                        F_E: "13856478521",
                        F_F: "1008",
                        F_I: "教师",
                        F_area: "重庆",
                        F_phone: "13856478521",
                        F_school: "重庆渝中区天立学校",
                        F_schoolarea: "重庆学区",
                        F_dept: "数码媒体系"
                    },
                    {
                        date: "王五",
                        name: "成都天立小学",
                        province: "教师",
                        city: "管理员",
                        address: "男",
                        state: "2015-06-13",
                        state1: "财务",
                        state2: "注销",
                        F_A: "510322158789656556",
                        F_B: "1993-04-05",
                        F_C: "2015-06-13",
                        F_D: "2017-06-13",
                        F_E: "13856478521",
                        F_F: "1890",
                        F_I: "教师",
                        F_area: "重庆",
                        F_phone: "13856478521",
                        F_school: "重庆渝中区天立学校",
                        F_schoolarea: "重庆学区",
                        F_dept: "数码媒体系"
                    }
                ];
            }
        }
    }
};
</script>

<style>
#nestaff .el-upload--text {
    width: 175px;
    height: 175px;
}

#nestaff .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

#nestaff .el-upload:hover {
    border-color: #409eff;
}

#nestaff .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 175px;
    height: 175px;
    line-height: 175px;
    text-align: center;
}

#nestaff .avatar {
    width: 175px;
    height: 175px;
    display: block;
}

#Estaff .el-upload--text {
    width: 175px;
    height: 175px;
}

#Estaff .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

#Estaff .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 175px;
    height: 175px;
    line-height: 175px;
    text-align: center;
}

#Estaff .avatar {
    width: 175px;
    height: 175px;
    display: block;
}
</style>
<style scoped>
.searchitem {
    display: inline-block;
    margin-bottom: 10px;
}
</style>
