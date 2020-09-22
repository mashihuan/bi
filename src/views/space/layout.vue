<template>
  <div class="content">
    <Topbar :id="id" :name="name" :list="list" />
    <draggable
      v-model="list"
      class="row-wrapper"
      handle=".move"
      :group="{name: 'common'}"
      @change="setUniqueId"
    >
      <div
        v-for="(item,index) of list"
        :key="item.uniqueId"
        style="position:relative"
        :test="item.uniqueId"
      >
        <handle-btn
          :show-edit="false"
          :index="index"
          :item="item"
          @handleRemoveClick="handleRowRemoveClick"
        />

        <component
          :is="item.cpnName"
          :cols="item.cols"
          :list="list"
          :item="item"
          @handleMapClick="handleMapClick"
          @handleRowRemoveClick="handleRowRemoveClick"
        />
      </div>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Topbar from '@/components/Topbar'
import HandleBtn from '@/components/HandleBtn'
import { getLayoutInfo } from '@/api/space'

export default {
  components: {
    Draggable,
    Topbar,
    HandleBtn
  },
  data() {
    return {
      list: [],
      id: null,
      name: ''
    }
  },
  beforeRouteLeave(to, from, next) {
    next()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === '/space/index') {
        const id = vm.$route.query.id
        if (!id) {
          vm.list = []
        }
      }
    })
  },
  mounted() {
    const layout = this.$route.query.layout
    if (layout) {
      this.id = Number(this.$route.query.id)
      this.name = this.$route.query.name
      this.list = JSON.parse(layout)
      this.getSpaceData(this.list)
    }
  },
  activated() {
    this.name = ''
    const id = this.$route.query.id
    if (id) {
      this.id = Number(this.$route.query.id)
      this.name = this.$route.query.name
    }
  },
  methods: {
    // 地图点击事件
    handleMapClick({ name, charts }) {
      this.changeSpaceData(this.list, charts, name)
    },
    // 发送请求
    async changeSpaceData(layout, charts, name) {
      layout.forEach(item => {
        if (item.cols) {
          this.changeSpaceData(item.cols, charts, name)
        }
        if (item.children) {
          this.changeSpaceData(item.children, charts, name)
        }
        if (item.config && item.config.dataSourceId) {
          charts.forEach((chart, ind) => {
            if (chart.name && chart.uniqueId === item.uniqueId) {
              getLayoutInfo({
                data: {
                  id: item.config.dataSourceId,
                  queryType: 'METHOD',
                  [chart.name]: name
                }
              }).then(res => {
                if (res.data.data.chartData) {
                  item.config.chartData = res.data.data.chartData
                }
                if (res.data.data.chartX) {
                  item.config.chartX = res.data.data.chartX
                }
              })
            }
          })
        }
      })
    },
    // 移除row
    handleRowRemoveClick({ index }) {
      const temp = [...this.list]
      this.deleteCharts(temp)
      this.list.splice(index, 1)
    },
    deleteCharts(target) {
      const charts = this.$store.state.space.charts
      target.forEach(item => {
        if (item.cols) {
          this.deleteCharts(item.cols)
        }
        if (item.children) {
          this.deleteCharts(item.children)
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
    // 设置唯一id，否则排序有bug
    setUniqueId(evt) {
      if (evt.added) {
        evt.added.element.uniqueId = Date.now()
      }
    },
    // 重新编辑页面时，发送请求获取数据
    async getSpaceData(layout) {
      layout.forEach(item => {
        if (item.cols) {
          this.getSpaceData(item.cols)
        }
        if (item.children) {
          this.getSpaceData(item.children)
        }
        if (item.config && item.config.dataSourceId) {
          getLayoutInfo({
            data: {
              id: item.config.dataSourceId,
              queryType: 'METHOD'
            }
          }).then(res => {
            if (res.data.data.chartData) {
              item.config.chartData = res.data.data.chartData
            }
            if (res.data.data.chartX) {
              item.config.chartX = res.data.data.chartX
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-main, .el-header {
    padding: 0;
  }
  .el-aside {
    width: 200PX !important;
  }
}
@media screen and(max-width: 768px) {
  .el-container {
    .el-aside {
      width: auto !important;
    }
  }
}
.content {
  height: calc(100% - 50PX);
  .row-wrapper {
    min-height: 100%;
    padding: 20PX;
  }
}
</style>
