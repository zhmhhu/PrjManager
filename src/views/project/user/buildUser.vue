<template>
    <div>
        <div class="title-info">数据来自宁波市水利建设市场信用信息报送系统，此处仅供查看 
          <span><el-button type="primary" size="mini" @click.stop="exportExcel">导出Excel</el-button></span>
          </div>
       <!-- <div><span>请选择单位类型：</span>
            <el-select v-model="filters.type" placeholder="请选择" v-on:change="getUnits">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>-->
        <!--列表-->
        <el-table :data="unit" class="units-table" highlight-current-row v-loading="listLoading" @row-click="clickShow"
                  @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection"  >
            </el-table-column>
            <el-table-column type="index" >
            </el-table-column>
            <el-table-column prop="companyname_ch" label="单位名称"  sortable>
            </el-table-column>
            <el-table-column prop="companytypename" label="单位类型"  sortable>
            </el-table-column>
            <el-table-column prop="legalrepresentative" label="法定代表人" width="120"  sortable>
            </el-table-column>
            <el-table-column prop="registration" label="注册类型" width="100" sortable>
            </el-table-column>
            <el-table-column prop="businessrange_ch" label="单位地址"  sortable>
            </el-table-column>
            <el-table-column prop="contantmobilenumber" label="联系电话" width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click.stop="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--查看表格弹出框-->
        <el-dialog title="详细信息" :visible.sync="dialogVisible" width="60%">
            <el-table :data="dialogData" border max-height="460" style="width: 96%;">
                <el-table-column property="name" label="信息">
                </el-table-column>
                <el-table-column property="data" label="结果">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false" >确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑表格弹出框-->
        <el-dialog title="详细信息" :visible.sync="textareaVisible" width="60%">
            <el-table :data=" dialogData"  border max-height="460" style="width: 96%;">
                <el-table-column property="name" label="信息" >
                </el-table-column>
                <el-table-column property="data" label="结果">
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
        <el-dialog title="是否确认删除" :visible.sync="deleteVisible" width="30%" >
            <span slot="footer" class="dialog-footer">
              <el-button @click="deleteVisible = false">取 消</el-button>
              <el-button type="primary" @click="deleteVisible = false;confirmDel()">确 定</el-button>
           </span>
        </el-dialog>

    </div>
</template>


<script>
import { getUnitListPage } from "api/api";


export default {
  data() {
    return {
      deleteVisible: false, //是否弹窗
      dialogVisible: false, //是否弹窗——查看表格
      textareaVisible: false, //是否弹窗——可编辑表格
      //弹窗展示信息
      dialogData: [],
      indexDel: 0,
      indexEdit: 0,
      unit: [],
      listLoading: false,
      sels: [], //列表选中列
      page: "1"
    };
  },

  mounted: function() {
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
        type: "build"
      };
      this.listLoading = true;
      getUnitListPage(para).then(res => {
        this.total = res.total;
        this.unit = res.data;
        this.listLoading = false;
      });
    },
    //点击某一行展示具体信息——弹出框
    clickShow: function(row, event, column) {
      let arr=[];
      for (let i in row ){
          let item ={};
          item.name=i;
          item.data=row[i];
          arr.push(item)
      }
      this.dialogData = arr;
      this.dialogVisible = true;
    },
    //确认删除
    confirmDel: function() {
      this.unit.splice(this.indexDel, 1);
      //此处从数据库删除信息
      console.log("已删除");
      this.$message({
        message: "删除成功",
        type: "success"
      });
    },
    //删除
    handleDel: function(index, row) {
      this.indexDel = index;
      this.deleteVisible = true;
      console.log("准备删除第" + this.indexDel + "行数据");
    },
    //确认保存
    confirmEdit: function() {
      //此处往数据库保存信息
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    //编辑
    handleEdit: function(index, row) {
      this.indexEdit = index;
      this.textareaVisible = true;

      console.log("准备编辑第" + this.indexEdit + "行数据");
    },
    //全选单选多选
    selsChange: function(sels) {
      this.sels = sels;
    },
    exportExcel:function(){
      import('@/utils/Export2Excel').then(excel => {
          const tHeader = ['单位名称', '单位类型', '法定代表人', '注册类型', '单位地址','联系电话']
          const filterVal = ['companyname_ch', 'companytypename', 'legalrepresentative', 'registration', 'businessrange_ch','contantmobilenumber']
        // const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.unit)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list',
          autoWidth: true, //非必填
            bookType: 'xlsx' //非必填
        })
    })
    },
        formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        // if (j === 'timestamp') {
        //   return parseTime(v[j])
        // } else {
          return v[j]
        // }
      }))
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