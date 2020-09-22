<template>
  <div class="bar">
    <el-page-header :content="id ? '编辑' : '新增'+'空间'" @back="$router.back()" />
    <div class="btn-group">
      <el-button type="success" size="mini" :disabled="!list.length" @click="handlePreview">预览</el-button>
      <el-button type="primary" size="mini" :disabled="!list.length && !id" @click="handleSave">发布</el-button>
      <el-dialog
        title="保存"
        :center="true"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-form
          ref="saveForm"
          label-position="left"
          label-width="80px"
          :rules="saveRules"
          :model="saveInfo"
        >
          <el-form-item label="标题" prop="name">
            <el-input v-model="saveInfo.name" />
          </el-form-item>
          <el-form-item label="是否展示" prop="isShow">
            <el-switch v-model="saveInfo.isShow" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="confirmSave">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  save
} from '@/api/space'

export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    id: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      saveInfo: {
        name: '',
        isShow: true,
        content: ''
      },
      saveRules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blure' }
        ]
      }
    }
  },
  methods: {
    handlePreview() {
      this.$router.push({
        path: '/space/preview',
        query: {
          layout: JSON.stringify(this.list)
        }
      })
    },
    handleSave() {
      this.saveInfo.name = this.name
      this.dialogVisible = true
    },
    // 发布成功时清空图表的数据, 门户端发送请求，获取最新数据
    delContentData(list) {
      list.forEach(item => {
        if (item.cols) {
          this.delContentData(item.cols)
        }
        if (item.children) {
          this.delContentData(item.children)
        }
        if (item.config) {
          item.config.chartData = [] // 清空图表数据
          item.config.chartX = [] // 清空x轴数据
        }
      })
      return list
    },
    // 确认发布
    async confirmSave() {
      this.$refs.saveForm.validate(async valid => {
        if (valid) {
          this.saveInfo.content = JSON.stringify(this.delContentData(this.list))
          console.log(this.list)
          const res = await save({
            data: {
              ...this.saveInfo,
              id: this.id,
              isShow: this.saveInfo.isShow ? '1' : '0'
            }
          })
          if (res.return_code === 20000) {
            this.$message({
              type: 'success',
              message: '发布成功'
            })
            this.dialogVisible = false
            this.$router.push('/space')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50PX;
  padding: 0 20PX;
  background: #fff;
  box-shadow: 0 1PX 4PX rgba(0,21,41,.08)
}
</style>
