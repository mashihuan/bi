<template>
  <el-container>
    <el-container>
      <el-aside>
        <sidebar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  name: 'Layout',
  components: {
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  background: #F2F6F9;
  .el-header {
    display: flex;
    align-items: center;
  }
  .el-main{
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
</style>
