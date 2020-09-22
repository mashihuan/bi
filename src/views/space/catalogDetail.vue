<template>
  <div class="app-container">
    <h3 class="title">详情信息</h3>
    <el-row :gutter="20">
      <el-col :span="3">ID:</el-col>
      <el-col :span="19">{{ catalogDetail.id }}</el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">目录名称:</el-col>
      <el-col :span="19">{{ catalogDetail.name }}</el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">功能路径:</el-col>
      <el-col :span="19">{{ catalogDetail.path }}</el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">是否展示:</el-col>
      <el-col :span="19">{{ catalogDetail.isShow ? '是' : '否' }}</el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">排序:</el-col>
      <el-col :span="19">{{ catalogDetail.sort }}</el-col>
    </el-row>

    <!-- 返回按钮 -->
    <el-button type="primary" size="mini" plain @click="handleBack">返回</el-button>
  </div>
</template>

<script>
import { menuDetail } from '../../api/space'

export default {
  data() {
    return {
      catalogDetail: {}
    }
  },
  mounted() {
    this.getCatalogDetail()
  },
  methods: {
    // 获取目录详情
    getCatalogDetail() {
      const para = {
        data: { id: this.$route.query.id - 0 }
      }
      this.listLoading = true
      menuDetail(para).then(res => {
        this.catalogDetail = res.data
        this.listLoading = false
      })
    },
    // 点击返回按钮
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  padding-left: 20px;
  margin: 0 -20px 20px -20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #D3DBE7;
  font-size: 17px;
  font-weight: normal;
}
.el-row {
  margin-bottom: 20px !important;
  .el-col {
    font-size: 14px;
  }
  & .el-col:nth-of-type(1) {
    color: #212735;
  }
  & .el-col:nth-of-type(2) {
    color: #444D63;
  }
}
</style>

