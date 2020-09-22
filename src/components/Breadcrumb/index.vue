<template>
  <el-breadcrumb id="breadcrumb" class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span
          v-if="item.redirect==='noRedirect'||index==levelList.length-1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      )
      this.levelList = matched.filter(
        (item, index) => index !== 0 && item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  margin-left: 20px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;

  .no-redirect {
    cursor: text;
    color: #212735;
  }
}
#breadcrumb span, #breadcrumb a, /deep/.el-breadcrumb__separator {
  font-weight: bold !important;
}
/deep/.el-breadcrumb__separator {
  color: #212735;
}
</style>
