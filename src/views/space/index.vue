<template>
  <div class="app-container">
    <section>
      <!--工具条-->
      <el-row
        :span="24"
        class="toolbar"
        type="flex"
        justify="space-between"
        style="padding-bottom: 0px"
      >
        <el-col :span="6">
          <el-input v-model="filters.name" placeholder="">
            <el-button slot="append" icon="el-icon-search" @click="getspaces" />
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-document-add"
                @click="handleAdd"
              >新增空间</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <!--列表-->
      <el-table
        v-loading="listLoading"
        :data="spaces"
        :default-expand-all="true"
        row-key="id"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" min-width="10%" />
        <el-table-column prop="name" label="名称" min-width="20%" />
        <el-table-column prop="path" label="路径" min-width="15%" />
        <el-table-column prop="isShow" label="是否展示" min-width="15%" />
        <!-- <el-table-column prop="content" label="内容" min-width="10%" /> -->
        <el-table-column label="操作" min-width="20%">
          <template slot-scope="scope">
            <el-button
              type="primary"
              round
              plain
              size="mini"
              @click="handleCheck(scope.$index, scope.row)"
            >查看</el-button>
            <el-button
              type="danger"
              round
              plain
              size="mini"
              @click="handleDel(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              type="success"
              round
              plain
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 分页 -->
    <section class="pagination-wrap">
      <el-row class="pagination">
        <el-pagination
          background
          :current-page.sync="currentPage"
          :page-size="per_page"
          :pager-count="5"
          next-text="下一页"
          layout="total, pager, next"
          :hide-on-single-page="true"
          :total="totalPage"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </section>
  </div>
</template>

<script>
import {
  page,
  del
} from '@/api/space'

export default {
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      filters: {
        name: ''
      },
      listLoading: false,
      spaces: [],
      currentPage: 1,
      per_page: 10,
      totalPage: 0
    }
  },
  mounted() {
    this.getspaces()
  },
  methods: {
    // 切换页码
    handleCurrentChange(val) {
      this.getspaces()
    },
    // 获取空间列表
    getspaces() {
      const para = {
        data: { name: this.filters.name },
        page: this.currentPage,
        per_page: this.per_page
      }
      this.listLoading = true
      page(para).then(res => {
        this.spaces = res.data
        this.totalPage = res.request.limit
        this.listLoading = false
      })
    },
    // 删除
    handleDel: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          const para = { data: { id: row.id }}
          del(para).then(res => {
            this.listLoading = false
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getspaces()
          })
        })
        .catch(() => {})
    },
    // 显示查看页面
    handleCheck(index, row) {
      this.$router.push({
        path: '/space/preview',
        query: {
          layout: row.content
        }
      })
    },
    // 显示编辑界面
    handleEdit: function(index, row) {
      this.$router.push({
        path: '/space/layout',
        query: {
          layout: row.content,
          id: row.id,
          name: row.name
        }
      })
    },
    // 显示新增界面
    handleAdd: function() {
      this.$router.push('/space/layout')
    }
  }
}
</script>

<style scoped lang="scss">
.pagination-wrap {
  height: 60px;
}
.pagination {
  position: absolute;
  right: 0;
  bottom: 20px;
}
</style>
