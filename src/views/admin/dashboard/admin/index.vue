<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

    <el-row style="background:#fff;padding: 0;margin-bottom:5px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>
<el-row :gutter="0">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table></transaction-table>
      </el-col>
      </el-row>
    <el-row :gutter="0">
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart></raddar-chart>
        </div>
      </el-col> -->
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart></bar-chart>
        </div>
      </el-col>
    </el-row>
<el-row :gutter="0"> 
      <el-col :span="12">
        <todo-list></todo-list>
      </el-col>
      <el-col :span="12">
        <notify-list></notify-list>
      </el-col>
</el-row> 
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup.vue'
import LineChart from './components/LineChart.vue'
import RaddarChart from './components/RaddarChart.vue'
import PieChart from './components/PieChart.vue'
import BarChart from './components/BarChart.vue'
import TransactionTable from './components/TransactionTable.vue'
import TodoList from './components/TodoList/index.vue'
import NotifyList from './components/Notify/index.vue'
// import BoxCard from './components/BoxCard.vue'

//首页统计数据
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165,106,158,56],
    actualData: [120, 82, 91, 154, 162, 140, 145,100, 120,48]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140,120, 144,63],
    actualData: [180, 160, 151, 106, 145, 150, 130,138, 142,52]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100,138, 142,32],
    actualData: [120, 90, 100, 138, 142, 130, 130,120, 144,29]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160,100, 120,152],
    actualData: [120, 82, 91, 154, 162, 140, 130,120, 104,101]
  }
}

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    NotifyList
    // BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
