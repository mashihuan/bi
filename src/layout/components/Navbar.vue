<template>
  <el-row class="navbar" type="flex" justify="space-between">
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <span>{{ '欢迎您，' + name }}</span>
      <el-button type="primary" plain size="mini" @click.native="logout">退出</el-button>
    </div>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import { IS_SSO, LOGOUT_URL } from '@/utils/config.js'
import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb
    // Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      if (IS_SSO) {
        removeToken() // must remove  token  first
        resetRouter()
        this.$store.commit('user/RESET_STATE')
        window.location.replace(LOGOUT_URL)
      } else {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-button {
  width: 48px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  border: 1px solid rgba(77, 115, 244, 1);
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(77, 115, 244, 1);
  margin-top: 20px;
  margin-left: 20px;
}
.navbar {
  display: flex;
  align-items: center;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 20px 0px rgba(229, 233, 243, 1);

  .hamburger-container {
    height: 100%;
    // float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      // background: rgba(0, 0, 0, 0.025);
      background: red;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .avatar-button {
    cursor: pointer;
  }

  .right-menu {
    margin-right: 60px;
    span {
      font-size: 14px;
      margin-right: 30px;
    }
  }
}
</style>
