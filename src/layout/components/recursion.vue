<template>
  <div>
    <el-row
      v-for="row of list"
      :key="row.uniqueId"
      :gutter="20"
      :style="{justifyContent:row.align}"
    >
      <el-col
        v-for="(col,index) of row.cols"
        :key="index"
        :md="col.col"
      >
        <div
          v-for="chart of col.children"
          :key="chart.uniqueId"
        >
          <div v-if="chart.cols">
            <!-- 递归组件，支持row嵌套 -->
            <Preview :list="col.children" />
          </div>
          <component
            :is="chart.cpnName"
            v-else
            :cols="chart.cols"
            :config="chart.config"
            @handleMapClick="handleMapClick"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Preview',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleMapClick(param) {
      this.$emit('handleMapClick', param)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
