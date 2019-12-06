<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:90%;min-width:800px;">	
		<el-row>
		   <el-col :span="12">
			<el-form-item label-width="100px"  label="项目名称：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		   </el-col>
		   <el-col :span="12">
			<el-form-item label-width="100px" label="项目类型：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		   </el-col>
        </el-row>
		<el-row>
		   <el-col :span="12">
			<el-form-item label-width="100px" label="项目归属：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		   </el-col>
		   <el-col :span="12">
			<el-form-item label-width="100px"  label="详细地址：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		   </el-col>
        </el-row>


	<el-row>
		   <el-col :span="8">
			<el-form-item label-width="100px"  label="工程规模：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		   </el-col>
		   <el-col :span="8">
			<el-form-item label-width="100px"  label="项目编码：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		   </el-col>
		   <el-col :span="8">
			<el-form-item label-width="140px" label="批复总投资(万元)：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		   </el-col>
        </el-row>
		<el-form-item label="项目周期">
			<el-col :span="11">
				<el-date-picker type="date" placeholder="开始时间" v-model="form.date1" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
				<el-date-picker type="date" placeholder="结束时间" v-model="form.date2" style="width: 100%;"></el-date-picker>
			</el-col>
		</el-form-item>

        <el-form-item label="项目类型">
			<el-select v-model="form.department" placeholder="请选择项目类型">
				<el-option label="类型一" value="keshi1"></el-option>
				<el-option label="类型二" value="keshi2"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="实施方式">
			<el-checkbox-group v-model="form.type">
				<el-checkbox label="法人责任制" name="type"></el-checkbox>
				<el-checkbox label="招标投标制" name="type"></el-checkbox>
				<el-checkbox label="建设监理制" name="type"></el-checkbox>
				<el-checkbox label="施工项目管理制" name="type"></el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="项目等级">
			<el-radio-group v-model="form.resource">
				<el-radio label="省级"></el-radio>
				<el-radio label="市级"></el-radio>
				<el-radio label="县区级"></el-radio>
				<el-radio label="县区级以下"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="建设内容">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        add: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>