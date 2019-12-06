<template>
  <el-table :data="users" style="width: 100%;padding-top: 15px;line-height: 15px;">
      <el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column prop="prjname" label="项目名" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="price" label="投资额" width="100" sortable>
			</el-table-column>
			<el-table-column prop="name" label="项目法人" width="120" sortable>
			</el-table-column>
      <el-table-column prop="birth" label="开始时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="状态" width="120" sortable>
			</el-table-column> 



    <!-- <el-table-column label="在建工程" show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.order_no}}
      </template>
    </el-table-column>
    <el-table-column label="投资额" width="195" align="center">
      <template slot-scope="scope">
        ¥{{scope.row.price | toThousandslsFilter}}
      </template>
    </el-table-column>
    <el-table-column label="项目法人" width="195" align="center">
      <template slot-scope="scope">
        ¥{{scope.row.price | toThousandslsFilter}}
      </template>
    </el-table-column>
      <el-table-column label="项目开始时间" width="195" align="center">
      <template slot-scope="scope">
        ¥{{scope.row.price | toThousandslsFilter}}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter"> {{scope.row.status}}</el-tag>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
// import { fetchList } from '@/api/transaction'
import { getPrjListPage } from 'api/api.js';


export default {
  data() {
    return {
      users: [],
      total: 0,
      page:1
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  mounted() {
			this.getUsers();
	},
  methods: {
    //获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: ''
				};
			getPrjListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users.slice(0, 5);
				});
			},
  }
}
</script>
<style scoped>
.el-table .cell{
  line-height: 15px;
}
</style>
