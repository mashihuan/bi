<template>
  <div class="nav">
      <router-link class="logo" to="/">BI</router-link>
      <div class="nav-right">
        <el-menu :default-active="activeIndex"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true"
                @select="handleSelect">
          <el-submenu index="/">
            <template slot="title">应用空间</template>
            <el-menu-item index="/">空间管理</el-menu-item>
            <el-menu-item index="/catalog">目录管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="/third">第三方空间</el-menu-item>
        </el-menu>
        <p class="user">超级管理员<el-button size="mini">退出</el-button></p>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '/'
    }
  },
  methods: {
    handleSelect(index, indexPath) {

    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 470PX;
  height: 100%;
  padding: 0 20PX;
  background: #545c64;
  color: #fff;
  overflow-x: auto;
  .logo {
    font-size: 22PX;
    font-weight: bold;
    color: #fff;
  }
  .nav-right {
    display: flex;
    align-items: center;
    .user {
      margin-left: 20px;
      .el-button {
        margin-left: 10PX;
      }
    }
  }
  ::v-deep.el-menu {
    .el-submenu__title i {
      color: #fff;
    }
  }
}
</style>
