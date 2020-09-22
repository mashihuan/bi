<template>
  <div class="preview">
    <Recursion :list="list" @handleMapClick="handleMapClick" />
  </div>
</template>

<script>
import Recursion from './components/recursion'
import { getLayoutInfo } from '@/api/space'

export default {
  components: {
    Recursion
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.initLayout()
  },
  methods: {
    // 从url中解析布局信息
    initLayout() {
      this.list = JSON.parse(this.$route.query.layout)
    },
    // 处理地图点击事件
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
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  min-height: 100%;
  padding: 20px 7%;
  background: #F2F6F9;
}
</style>
