<template>
    <div>
        <div class="title-info">数据来自宁波市水利建设市场信用信息报送系统，此处仅供查看</div>
        <div><span>请选择单位类型：</span>
            <el-select v-model="filters.type" placeholder="请选择" v-on:change="getUnits">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!--列表-->
        <el-table :data="unit" class="units-table" highlight-current-row v-loading="listLoading" @row-click="clickShow"
                  @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection"  >
            </el-table-column>
            <el-table-column type="index" >
            </el-table-column>
            <el-table-column prop="name" label="单位名称"  sortable>
            </el-table-column>
            <el-table-column prop="leadernm" label="法定代表人" width="120"  sortable>
            </el-table-column>
            <el-table-column prop="position" label="职务" width="100" sortable>
            </el-table-column>
            <el-table-column prop="addr" label="单位地址"  sortable>
            </el-table-column>
            <el-table-column prop="phone" label="联系电话" width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click.stop="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--查看表格弹出框-->
        <el-dialog
                title="详细信息"
                :visible.sync="dialogVisible"
                width="60%"
                >
            <el-table
                    :data="dialogData"
                    border
                    max-height="460"
                    style="width: 96%;">
                <el-table-column
                        property="name"
                        label="信息"
                        >

                </el-table-column>

                <el-table-column
                        property="data"
                        label="结果"
                >

                </el-table-column>

            </el-table>


            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false" >确 定</el-button>
  </span>
        </el-dialog>

        <!--编辑表格弹出框-->
        <el-dialog
                title="详细信息"
                :visible.sync="textareaVisible"
                width="60%"
        >
            <el-table
                    :data="dialogData"
                    border
                    max-height="460"
                    style="width: 96%;">
                <el-table-column
                        property="name"
                        label="信息"
                >

                </el-table-column>

                <el-table-column
                        property="data"
                        label="结果"
                >
                    <template slot-scope="scope">
                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="scope.row.data" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>

            </el-table>


            <span slot="footer" class="dialog-footer">
    <el-button @click="textareaVisible = false">取 消</el-button>
    <el-button type="primary" @click="textareaVisible = false;confirmEdit()" >保 存</el-button>
  </span>
        </el-dialog>

        <!--删除判断弹出框-->
        <el-dialog
                title="是否确认删除"
                :visible.sync="deleteVisible"
                width="30%"
               >
            <span slot="footer" class="dialog-footer">
    <el-button @click="deleteVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteVisible = false;confirmDel()">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>


<script>
    import {getUnitListPage} from "api/api";

    export default {
        data() {
            return {
                deleteVisible:false,//是否弹窗
                dialogVisible: false,//是否弹窗——查看表格
                textareaVisible:false,//是否弹窗——可编辑表格
                //弹窗展示信息
                dialogData:[
                    {
                        name:'企业名称',
                        data:'中国水利水电第七工程局有限公司'
                    },
                    {
                        name:'企业类型',
                        data:'施工单位,设计单位,建设单位,勘察单位,质量检测单位,咨询单位,施工图审查单位'
                    },
                    {
                        name:'成立日期',
                        data:'1992-12-30'
                    },
                    {
                        name:'组织机构代码',
                        data:'91510000201827469M'
                    },
                    {
                        name:'组织机构登记机关',
                        data:'四川省工商行政管理局'
                    },
                    {
                        name:'注册地址',
                        data:'成都市郫县郫筒镇北大街成灌东路349号'
                    },
                    {
                        name:'营业执照注册号',
                        data:'91510000201827469M'
                    },
                    {
                        name:'营业执照登记机关',
                        data:'四川省工商行政管理局'
                    },
                    {
                        name:'经营范围',
                        data:'承包与其实力、规模、业绩相适应的国外工程项目；对外派遣实施上述境外工程所需的劳务人员；爆破工程；特种设备安装改造维修；（以上项目及期限以许可证为准）。（以下范围不含前置许可项目，后置许可项目凭许可证或审批文件经营）：水利水电工程；房屋建筑业；土木工程建筑业；建筑安装业；建筑装饰和其他建筑业；承装（修、试）电力设施；投资与资产管理（不得从事非法集资、吸收公众资金等金融活动）；专业技术服务业；进出口业；商品批发与零售；租赁业；装卸搬运和运输代理业；水利管理业；环境治理业。'
                    },
                    {
                        name:'营业期限',
                        data:'10年'
                    },
                    {
                        name:'注册资本',
                        data:'128346.32万元'
                    },
                    {
                        name:'实缴注册资本',
                        data:'128346.32万元'
                    },
                    {
                        name:'法人代表',
                        data:'申茂春'
                    },
                    {
                        name:'工商年检结果',
                        data:'合格'
                    },
                    /*{
                       name:'中国水利水电第七工程局有限公司',
                       type:'施工单位,设计单位,建设单位,勘察单位,质量检测单位,咨询单位,施工图审查单位',
                        date:'1992-12-30',
                        code:'91510000201827469M',
                        depart:'四川省工商行政管理局',
                        BLRN:'91510000201827469M',
                        BLRA:'四川省工商行政管理局',
                        scope:'承包与其实力、规模、业绩相适应的国外工程项目；对外派遣实施上述境外工程所需的劳务人员；爆破工程；特种设备安装改造维修；（以上项目及期限以许可证为准）。（以下范围不含前置许可项目，后置许可项目凭许可证或审批文件经营）：水利水电工程；房屋建筑业；土木工程建筑业；建筑安装业；建筑装饰和其他建筑业；承装（修、试）电力设施；投资与资产管理（不得从事非法集资、吸收公众资金等金融活动）；专业技术服务业；进出口业；商品批发与零售；租赁业；装卸搬运和运输代理业；水利管理业；环境治理业。',
                        term:'10年',
                        RC:'128346.32万元',
                        PRC:'128346.32万元',
                        CP:'申茂夏',
                        RIC:'合格'
                    }*/
                ],
                options: [
                    {
                        value: "admins",
                        label: "水行政管理单位"
                    },
                    {
                        value: "build",
                        label: "项目法人信息"
                    },
                    {
                        value: "design",
                        label: "设计单位信息"
                    },
                    {
                        value: "construct",
                        label: "施工单位信息"
                    },
                    {
                        value: "supervise",
                        label: "监理单位信息"
                    }

                ],
                filters: {
                    type: "admins"
                },
                indexDel:0,
                indexEdit:0,
                unit: [],
                listLoading: false,
                sels: [] //列表选中列
            };
        },

        mounted: function () {
            this.getUnits();
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            //获取用户列表
            getUnits() {
                let para = {
                    page: this.page,
                    type: this.filters.type
                };
                this.listLoading = true;
                getUnitListPage(para).then(res => {
                    this.total = res.data.total;
                    this.unit = res.data.data;
                    console.log(this.unit);
                    this.listLoading = false;
                });
            },
            //点击某一行展示具体信息——弹出框
            clickShow: function (row, event, column) {
                /*console.log(row);console.log(event);console.log(column);*/
                this.dialogVisible = true;


            },
            //确认删除
            confirmDel:function(){
                this.unit.splice(this.indexDel, 1);
                //此处从数据库删除信息
                console.log('已删除');
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            }
            ,
            //删除
            handleDel: function (index, row) {
                this.indexDel=index;
                this.deleteVisible = true;
                console.log("准备删除第"+this.indexDel+"行数据");
            },
            //确认保存
            confirmEdit:function(){
                //此处往数据库保存信息
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            },
            //编辑
            handleEdit: function (index, row) {
                this.indexEdit=index;
                this.textareaVisible=true;

                console.log("准备编辑第"+this.indexEdit+"行数据");

            },
            //全选单选多选
            selsChange: function (sels) {
                this.sels = sels;
            }
        }
        // watch: {
        //   $route: "check"
        // },
    };
</script>

<style>
    /* 修改表格行间距 */
    .units-table td,
    .units-table th {
        padding: 0;
    }

    .title-info {
        font: 12px Extra Extra Small;
        padding: 5px 0;
    }
</style>