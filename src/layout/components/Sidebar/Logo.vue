<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link v-if="false" key="collapse" class="sidebar-logo-link" to="/">
        <div v-if="logo" class="sidebar__logo__box">
          <img :src="logo" class="sidebar-logo">
        </div>
        <div v-else class="sidebar__title__box">
          <h1 class="sidebar-title">{{ title }}</h1>
        </div>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    // collapse: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      title: '数字空间',
      logo: require('../../../assets/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebar__logo__box {
  background: url('../../../assets/logo.png')
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 240px;
  line-height: 40px;
  background: #282F40;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 88px;
      height: 99px;
      vertical-align: middle;
      margin: 0 auto;
      margin-top: 36.8px;
      display: block;
      background: url('')
    }

    & .sidebar-title {
      margin-top: 27px;
      display: inline-block;
      font-size: 25px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
