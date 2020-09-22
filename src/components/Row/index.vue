<template>
  <el-row :gutter="20">
    <el-col
      v-for="(col,ind) of cols"
      :key="ind"
      :md="col.col"
    >
      <draggable
        v-model="col.children"
        class="content"
        handle=".move"
        :group="{name: 'common'}"
        :move="handleDragForbidMove"
        @change="setUniqueId"
      >
        <div
          v-for="(item,index) of col.children"
          :key="item.uniqueId"
          style="position:relative"
        >
          <handle-btn
            :index="index"
            :col-index="ind"
            :item="item"
            @handleRemoveClick="handleChartRemoveClick"
            @handleEditClick="handleEditClick"
          />
          <component
            :is="item.cpnName"
            v-if="item.config"
            :config="item.config"
            @handleMapClick="handleMapClick"
          />
          <!-- 递归，支持row嵌套 -->
          <RowComponent v-if="item.cols" :cols="item.cols" />
          <!-- 图表config -->
          <el-drawer
            title="编辑"
            :visible.sync="drawer"
            :with-header="false"
          >
            <config-drawer :item="configInfo" />
          </el-drawer>
        </div>
      </draggable>
    </el-col>
  </el-row>
</template>

<script>
import Draggable from 'vuedraggable'
import HandleBtn from '@/components/HandleBtn'
import ConfigDrawer from '@/components/ConfigDrawer'

export default {
  name: 'RowComponent',
  components: {
    Draggable,
    HandleBtn,
    ConfigDrawer
  },
  props: {
    cols: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      drawer: false,
      configInfo: {}
    }
  },
  methods: {
    handleMapClick(param) {
      this.$emit('handleMapClick', param)
    },
    // 编辑操作
    handleEditClick({ index, colIndex }) {
      this.drawer = true
      const item = this.cols[colIndex].children[index]
      // item.config.charts = this.$store.state.space.charts
      this.configInfo = item
    },
    // 移除图表
    handleChartRemoveClick({ index, colIndex }) {
      const temp = this.cols[colIndex].children[index]
      if (temp.config) {
        const charts = this.$store.state.space.charts
        const index = charts.findIndex(val => val.uniqueId === temp.uniqueId)
        charts.splice(index, 1)
        this.$store.commit('space/SAVE_CHARTS', charts)
      } else {
        this.deleteCharts(temp)
      }
      this.cols[colIndex].children.splice(index, 1)
    },
    deleteCharts(target) {
      const charts = this.$store.state.space.charts
      const arr = target.cols || target.children
      arr.forEach(item => {
        if (item.cols) {
          this.deleteCharts(item)
        }
        if (item.children) {
          this.deleteCharts(item)
        }
        if (item.config) {
          charts.forEach((val, index) => {
            if (val.uniqueId === item.uniqueId) {
              charts.splice(index, 1)
              this.$store.commit('space/SAVE_CHARTS', charts)
            }
          })
        }
      })
    },
    // 保证图表只能放入row内
    handleDragForbidMove(evt) {
      if (evt.to.className === 'row-wrapper' && !evt.draggedContext.element.cols) {
        return false
      }
      return true
    },
    // 设置唯一id，否则排序有bug
    setUniqueId(evt) {
      if (evt.added) {
        evt.added.element.uniqueId = Date.now()
        const charts = this.$store.state.space.charts
        if (evt.added.element.config && evt.added.element.config.associateMap) {
          charts.push({
            name: '',
            uniqueId: evt.added.element.uniqueId,
            params: [],
            title: evt.added.element.config.title
          })
          this.$store.commit('space/SAVE_CHARTS', charts)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/row.scss';
::v-deep.el-drawer__wrapper .el-drawer {
  width: 30% !important;
}
@media screen and(max-width: 768px) {
  ::v-deep.el-drawer__wrapper .el-drawer {
    width: 80% !important;
  }
}
</style>
