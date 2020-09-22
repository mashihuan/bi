<template>
  <el-row>
    <el-col :xs="2" :span="4">
      <img class="logo" src="@/assets/img/logo.png" alt="">
    </el-col>
    <el-col :span="15">
      <ul class="menu">
        <li class="menu-item"
            v-for="(item,index) of menus"
            :key="item.name"
            :class="{active: active === index}"
            @click="handleParsePageInfoFromUrl(item, index)">
          {{item.name}}
        </li>
      </ul>
    </el-col>
    <el-col :xs="6" :span="5" class="user">
      {{'您好，超级管理员'}}
      <el-button size="mini" type="primary">退出</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'PreviewHeader',
  data() {
    return {
      active: 0,
      menus: [
        {name: '数据大盘', url: ''},
        {name: '个人画像', url: ''},
        {name: '法人画像', url: ''},
      ]
    }
  },
  methods: {
    handleParsePageInfoFromUrl(item, index) {
      this.active = index
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
  align-items: center;
  min-width: 960PX;
  height: 100%;
  padding-left: 7%;
  padding-right: 7%;
  .logo {
    display: block;
    width: 40PX;
  }
  .menu {
    display: flex;
    align-items: center;
    .menu-item {
      padding: 8PX 15PX;
      margin-right: 20PX;
      border-radius: 3PX;
      color: #CDCED5;
      cursor: pointer;
      &.active {
        background: #53576E;
        color: #fff;
      }
    }
  }
  .user {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #fff;
    .el-button {
      margin-left: 20PX;
    }
  }
}
</style>
