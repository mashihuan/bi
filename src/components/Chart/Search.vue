<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    @select="handleSelect"
  >
    <i
      slot="append"
      class="el-icon-search"
    />
  </el-autocomplete>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [],
      state: ''
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect() {

    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.el-autocomplete {
  width: 100%;
  .el-input-group__append {
    background: #304156;
    color: #fff;
  }
}
</style>
