<template>
  <div class="statistic">
    <div
      class="left"
      :style="{backgroundColor: config.background, color: config.fontColor}"
    >在业</div>
    <div class="right">
      <div class="title" :style="{borderColor: config.background}">当前全市正常运营企业数</div>
      <div class="num" :style="{color: config.background}">507420 <span>家</span> </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scope>
.statistic {
  display: flex;
  align-items: center;
  padding: 0.15625rem 0.083333rem;
  border: 1px solid #6399ff;
  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.333333rem;
    height: 0.333333rem;
    margin-right: 0.125rem;
    border-radius: 50%;
    background: #6399ff;
    font-size: 0.104167rem;
    font-weight: bold;
    letter-spacing: 2px;
    color: #fff;
  }
  .right {
    .title {
      padding-left: 5px;
      margin-bottom: 0.104167rem;
      border-left: 3px solid #6399ff;
      font-size: 0.083333rem;
    }
    .num {
      font-size: 0.145833rem;
      font-weight: bold;
      color: #6399ff;
      span {
        font-size: 14px;
        font-weight: noraml;
      }
    }
  }
}
</style>
