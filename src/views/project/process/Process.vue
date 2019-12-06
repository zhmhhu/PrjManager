<template>
    <div>
    <el-button   @click="next" plain>{{nextBtnName}}</el-button>
     <el-button  v-if="seen" @click="back" plain>{{backBtnName}}</el-button>
    <el-steps :active="active">
        <el-step title="质监申请"  @click.native="on_click('Shenqing')"  description="由张三完成最后审核" ></el-step>
        <el-step title="监督计划"  @click.native="on_click('Jihua')"  description="由李四完成最后审核"></el-step>
        <el-step title="项目划分"  @click.native="on_click('Huafen')"   description="由张永进完成最后审核"></el-step>
        <el-step title="项目开工"  @click.native="on_click('Kaigong')"  description="此项工作未开始"></el-step>
        <el-step title="质量评定"  @click.native="on_click('Pingding')"  description="此项工作未开始"></el-step>
        <el-step title="质监报告"  @click.native="on_click('Baogao')"  description="此项工作未开始"></el-step>
    </el-steps>
<hr>
    	<!--命名视图，根据currentStep属性动态改变-->
         <component :is="currentStep"></component>
    </div>
</template>
<script>
import Shenqing from "./Shenqing.vue";
import Jihua from "./Jihua.vue";
const Huafen = { template: "<div>项目划分</div>" };
const Kaigong = { template: "<div>项目开工</div>" };
const Pingding = { template: "<div>质量评定</div>" };
const Baogao = { template: "<div>质监报告</div>" };
export default {
  components: { Shenqing, Jihua, Huafen, Kaigong, Pingding, Baogao },
  data() {
    return {
      nextBtnName: "下一步",
      backBtnName: "上一步",
      active: 0,
      seen: false,
      currentStep: "Shenqing"
    };
  },
  methods: {
    next() {
      this.seen = true;
      if (this.active++ > 4) {
        this.active = 0;
      }
      if (this.active === 5) {
        this.nextBtnName = "返回";
        this.seen = false;
      }
      if (this.active === 0) {
        this.nextBtnName = "下一步";
        this.seen = false;
      }
    },
    back() {
      if (this.active-- < 1) {
        this.active = 0;
      }
      if (this.active === 0) {
        this.active = 0;
        this.seen = false;
      }
    },
    on_click(e) {
      this.currentStep = e;
    }
  }
};
</script>
<style>
.el-button {
  margin: 10px 0;
}
</style>