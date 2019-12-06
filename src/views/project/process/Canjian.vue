<template>
<div>

<div>设计单位及人员</div> 
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
<hr>

<div>监理单位及人员</div> 
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
<hr>

<div>施工单位及人员</div> 
<el-upload
  class="upload-demo"
  ref="upload3"
  action="https://www.baidu.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload1">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpdf文件，且不超过5Mb</div>
</el-upload>
<hr>

<div>建设单位及人员</div> 
<el-upload
  class="upload-demo"
  ref="upload3"
  action="https://www.baidu.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload1">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpdf文件，且不超过5Mb</div>
</el-upload>
<hr>
<div>运行管理单位及人员</div> 
<el-upload
  class="upload-demo"
  ref="upload3"
  action="https://www.baidu.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload1">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpdf文件，且不超过5Mb</div>
</el-upload>
</div>
</template>

<script>
  export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      submitUpload1() {
        this.$refs.upload1.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>