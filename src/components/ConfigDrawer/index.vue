<template>
  <div class="wrapper">
    <el-form label-position="left" label-width="120px" :model="item.config">
      <el-form-item v-if="item.config.title !== undefined" label="标题">
        <el-input v-model="item.config.title" />
      </el-form-item>
      <el-form-item v-if="item.config.height !== undefined" label="高度">
        <el-input v-model="item.config.height" type="number" />
      </el-form-item>
      <el-form-item v-if="item.config.dataSourceId !== undefined" label="数据源">
        <el-select
          v-model="item.config.dataSourceId"
          placeholder="请选择数据源"
          @change="onChangeServers"
        >
          <el-option
            v-for="iten of servers"
            :key="iten.id"
            :label="iten.name"
            :value="iten.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="item.config.smooth !== undefined" label="平滑曲线">
        <el-switch v-model="item.config.smooth" />
      </el-form-item>
      <el-form-item v-if="item.config.stack !== undefined" label="堆叠">
        <el-switch v-model="item.config.stack" />
      </el-form-item>
      <el-form-item v-if="item.config.horizontal !== undefined" label="横向柱图">
        <el-switch v-model="item.config.horizontal" />
      </el-form-item>
      <el-form-item v-if="item.config.roseType !== undefined" label="南丁格尔">
        <el-switch v-model="item.config.roseType" />
      </el-form-item>
      <el-form-item v-if="item.config.radius1 !== undefined" label="内圈半径(0-100)">
        <el-input v-model="item.config.radius1" type="number" />
      </el-form-item>
      <el-form-item v-if="item.config.radius2 !== undefined" label="外圈半径(0-100)">
        <el-input v-model="item.config.radius2" type="number" />
      </el-form-item>
      <el-form-item v-if="item.config.visualMap !== undefined" label="视觉映射">
        <el-switch v-model="item.config.visualMap" />
      </el-form-item>
      <el-form-item v-if="item.config.drill !== undefined" label="下钻">
        <el-switch v-model="item.config.drill" />
      </el-form-item>
    </el-form>
    <!-- 关联图表字段 -->
    <div v-if="item.type === '3dmap' && !hasParams">
      <h3 style="text-align:center;font-size:14px">关联图表字段</h3>
      <div v-for="(iten,index) of charts" :key="iten.uniqueId">
        <el-form label-position="left" label-width="120px">
          <el-form-item
            v-if="iten.params.length"
            class="associate"
            :label="iten.title"
          >
            <el-select
              v-model="iten.name"
              placeholder="要关联的字段"
              clearable
              @change="onChangeParams(index, $event)"
            >
              <el-option
                v-for="iteo of iten.params"
                :key="iteo.name"
                :label="iteo.label"
                :value="iteo.name"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { serverList, serverParam, serverDetail } from '@/api/space'

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      servers: [],
      name: ''
    }
  },
  computed: {
    ...mapState('space', ['charts']),
    hasParams() {
      return this.charts.every(item => item.params.length === 0)
    }
  },
  mounted() {
    this.servers = []
    this.getServerList()
  },
  methods: {
    // 获取数据源
    async getServerList() {
      const res = await serverList({
        data: {
          displayType: this.item.config.displayType
        }
      })
      this.servers = res.data
    },
    // 获取所需参数
    async onChangeServers(id) {
      const res = await serverParam({
        data: {
          id,
          queryType: 'METHOD'
        }
      })
      this.item.config.params = res.data.inputParams
      this.item.config.dataSourceId = id
      this.setChartsValue('params', res.data.inputParams)
      this.getServerDetail(id)
    },
    // 获取数据详情
    async getServerDetail(id) {
      const res = await serverDetail({
        data: {
          id,
          queryType: 'METHOD'
        }
      })
      if (res.data.data.chartData) {
        this.item.config.chartData = res.data.data.chartData
      }
      if (res.data.data.chartX) {
        this.item.config.chartX = res.data.data.chartX
      }
      this.item.config.title = res.data.title
      this.setChartsValue('title', res.data.title)
      this.setChartsValue('name', '')
    },
    onChangeParams(index, val) {
      const newCharts = [...this.charts]
      newCharts[index].name = val
      this.$store.commit('space/SAVE_CHARTS', newCharts)
      this.item.config.charts = newCharts
    },
    // 给charts赋值
    setChartsValue(param, value) {
      const index = this.charts.findIndex(val => val.uniqueId === this.item.uniqueId)
      const newCharts = [...this.charts]
      newCharts[index][param] = value
      this.$store.commit('space/SAVE_CHARTS', newCharts)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 40PX;
  .el-select {
    width: 100%;
  }
  .associate {
    ul, li {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span {
        flex-shrink: 0;
        padding-right: 10px;
        width: 100px;
        line-height: 1.15;
      }
    }
  }
}
</style>
