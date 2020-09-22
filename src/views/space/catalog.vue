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
            <el-button slot="append" icon="el-icon-search" @click="getMenus" />
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-document-add"
                @click="handleAdd"
              >新增目录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <!--列表-->
      <el-table
        v-loading="listLoading"
        :data="catalogs"
        :default-expand-all="true"
        row-key="id"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" min-width="10%" />
        <el-table-column prop="name" label="名称" min-width="20%" />
        <el-table-column prop="path" label="路径" min-width="15%" />
        <el-table-column prop="isShow" label="是否展示" min-width="15%" />
        <el-table-column prop="content" label="内容" min-width="10%" />
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
      <!--编辑界面-->
      <el-dialog
        center
        width="30%"
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :show-close="false"
      >
        <el-form
          ref="editForm"
          label-position="right"
          size="small"
          :model="editForm"
          label-width="80px"
          :rules="editFormRules"
        >
          <el-form-item label="目录名称" prop="name" auto-complete="off">
            <el-input v-model="editForm.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="功能路径" prop="path">
            <el-select
              v-model="editForm.path"
              placeholder="功能路径"
              style="width:100%"
            >
              <el-option
                v-for="item in spaces"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否展示" prop="isShow">
            <el-switch v-model="editForm.isShow" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            size="small"
            @click.native="dialogFormVisible = false"
          >取消</el-button>
          <el-button
            v-if="dialogStatus == 'create'"
            type="primary"
            size="small"
            @click="updateData"
          >提交</el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            @click="updateData"
          >提交</el-button>
        </div>
      </el-dialog>
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
  menuPage,
  menuDel,
  list,
  menuSave,
  get
} from '@/api/space'

export default {
  data() {
    return {
      dialogStatus: '',
      textMap: {
        update: '编辑目录',
        create: '新增目录'
      },
      dialogFormVisible: false,
      filters: {
        name: ''
      },
      listLoading: false,
      catalogs: [],
      spaces: [],
      currentPage: 1,
      per_page: 10,
      totalPage: 0,
      editFormRules: {
        path: [
          { required: true, message: '请选择功能路径', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入目录名称', trigger: 'blur' }]
      },
      // 编辑界面数据
      editForm: {
        id: null,
        name: '',
        path: '',
        isShow: true,
        sort: 0
      }
    }
  },
  mounted() {
    this.getMenus()
    this.getSpaces()
  },
  methods: {
    // 切换页码
    handleCurrentChange(val) {
      this.getMenus()
    },
    // 获取目录列表
    getMenus() {
      const para = {
        data: { name: this.filters.name },
        page: this.currentPage,
        per_page: this.per_page
      }
      this.listLoading = true
      menuPage(para).then(res => {
        this.catalogs = res.data
        this.totalPage = res.request.limit
        this.listLoading = false
      })
    },
    async getSpaces() {
      const res = await list({})
      this.spaces = res.data
    },
    // 删除
    handleDel: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          const para = { data: { id: row.id }}
          menuDel(para).then(res => {
            this.listLoading = false
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getMenus()
          })
        })
        .catch(() => {})
    },
    // 显示查看页面
    handleCheck(index, row) {
      this.$router.push(`/space/catalog/detail?id=${row.id}`)
    },
    // 显示编辑界面
    handleEdit: function(index, row) {
      this.dialogStatus = 'update'
      this.editForm.id = row.id
      this.editForm.isNewRecord = false
      const para = {
        data: {
          id: row.id
        }
      }
      get(para).then(res => {
        this.editForm = Object.assign({}, res.data)
        this.editForm.isShow = this.editForm.isShow > 0
      })
      this.dialogFormVisible = true
    },
    // 显示新增界面
    handleAdd: function() {
      this.dialogStatus = 'create'
      if (this.$refs['editForm']) {
        this.$refs['editForm'].resetFields()
      }
      this.editForm.isNewRecord = true
      this.dialogFormVisible = true
    },
    // 编辑
    updateData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          const para = {
            data: {
              ...this.editForm,
              isShow: this.editForm.isShow ? 1 : 0,
              functionId: Date.now()
            }
          }
          menuSave(para).then(res => {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$refs['editForm'].resetFields()
            this.dialogFormVisible = false
            this.getMenus()
          })
        }
      })
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
