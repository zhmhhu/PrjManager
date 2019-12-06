
<template>
<div>		
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="项目名" prop="name">
					<el-input v-model="addForm.prjname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
				<el-form-item label="开始时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="负责人" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="addForm.phone" auto-complete="off"></el-input>
				</el-form-item>	
			</el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                nextBtnName:"下一步",
                backBtnName:"上一步",
                active: 0,
                seen:false,
				addForm: {
                    prjname: '',
                    addr:'',
					name: '',
					age: 0,
					birth: '',
					phone: ''
				},
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
            };
        }
    }

</script>