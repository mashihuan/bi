<template>
  <div class="table">
    <div class="header">
      <div class="title">表格</div>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        stripe
      >
        <el-table-column
          prop="date"
          label="日期"
        />
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  margin-bottom: 20px;
  background: #fff;
  font-size: 14px;
  .header {
    padding: 15px;
    .title {
      padding-left: 5px;
      border-left: 3px solid #40a9fe;
      font-weight: bold;
    }
  }
  .content {
    padding: 15px 0;
    border-top: 1px solid #E5F2FB;
    background: #fff;
  }
}
</style>
