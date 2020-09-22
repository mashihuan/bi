<template>
  <div class="chart-wrapper">
    <div
      class="chart-inner"
      :style="{height: innerHeight}"
    >
      <h4 class="title">
        {{ config.title }}
      </h4>
      <div ref="myChart" class="myChart" :style="{height: chartHeight}" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import axios from 'axios'

export default {
  mixins: [resize],
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
      chart: null
    }
  },
  watch: {
    config: {
      deep: true,
      handler(val) {
        this.initChart(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    async initChart() {
      this.chart = echarts.init(this.$refs.myChart)
      if (!this.config.geoJson) {
        this.chart.showLoading()
        const { data } = await axios.get('http://mashihuan.com:3002/map?adcode=100000_full')
        this.config.geoJson = data
        this.chart.hideLoading()
      }
      echarts.registerMap('china', this.config.geoJson)
      this.setOptions()
      this.chart.on('click', this.handleMapClick)
    },
    async handleMapClick(e) {
      if (this.config.drill) { // 下钻
        this.chart.showLoading()
        const { data } = await axios.get(`http://mashihuan.com:3002/map?adcode=${e.data.adcode}_full`)
        this.config.geoJson = data
        this.chart.hideLoading()
      } else {
        // TODO:
      }
    },
    convertData() {
      const arr = []
      this.config.geoJson.features.forEach(item => {
        arr.push({
          name: item.properties.name,
          adcode: item.properties.adcode,
          value: 0
        })
      })
      return arr
    },
    setOptions() {
      this.chart.setOption({
        visualMap: {
          show: this.config.visualMap,
          left: 'left',
          bottom: 'bottom',
          max: 1000,
          textStyle: {
            color: '#fff'
          },
          inRange: {
            color: ['#F4E9E7', '#F12B07']
          },
          text: ['高', '低']
        },
        geo: {
          map: 'china',
          show: true,
          roam: true,
          // zoom: 1.4,
          // top: 40,
          // aspectScale: 0.9,
          // boundingCoords: [0, 0],
          label: {
            normal: {
              show: true
            }
          },
          emphasis: {
            itemStyle: {
              areaColor: '#0a2dae',
              color: '#070B1F'
            },
            label: {
              normal: {
                show: true
              }
            }
          }
        },
        series: {
          type: 'map',
          map: 'china',
          name: this.config.title,
          geoIndex: 0,
          data: this.convertData()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/chart.scss';
</style>
