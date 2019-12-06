<template>
    <div>
        <div style="padding:10px 0 30px 0;"><span>请选择项目流程：</span>
            <el-select v-model="filters.type" placeholder="请选择" v-on:change="getUnits">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-loading="listLoading" label-width="145px" class="demo-ruleForm">

            <el-form-item label="开工时间" required width="100">
                <el-col >
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="开工文件名称(文号)" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="开工备案单位" prop="region">
                <el-input v-model="ruleForm.com"></el-input>
            </el-form-item>
            <el-form-item label="开工备案时间" required>
                <el-col >
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <div>开工文件扫描件</div>
            <el-upload
                    class="upload-demo"
                    ref="upload1"
                    action="https://www.baidu.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload1">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpdf文件，且不超过5Mb</div>
            </el-upload>
            <div>竣工验收计划扫描件</div>
            <el-upload
                    class="upload-demo"
                    ref="upload2"
                    action="https://www.baidu.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload1">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpdf文件，且不超过5Mb</div>
            </el-upload>

            <el-form-item label="计划上传时间" required>
                <el-col >
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <!--表格-->
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="date"
                        label="序号"
                        >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="年度"
                        >
                </el-table-column>
                <el-table-column
                        prop="province"
                        label="扫描件"
                        >
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="上报时间"
                        >
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="操作"
                        >
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    import {getUnitListPage} from "api/api";


    export default {
        data() {
            return {
                fileList: [],
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }],
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                options: [
                    {
                        value: "kaigong",
                        label: "开工情况"
                    },
                    {
                        value: "huishen",
                        label: "施工会审"
                    },
                    {
                        value: "design",
                        label: "设计交底"
                    },
                    {
                        value: "change",
                        label: "设计变更"
                    },
                    {
                        value: "shishi",
                        label: "实施进度"
                    }

                ],
                indexDel:0,
                indexEdit:0,
                unit: [],
                listLoading: false,
                sels: [] ,//列表选中列
                filters: {
                    type: "kaigong"
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
        },
        mounted: function () {
            this.getUnits();
        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            submitUpload1() {
                this.$refs.upload1.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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

        }
    }
  </script>