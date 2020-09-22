<template>
  <div class="list">
    <div class="header">
      <div class="title">综合信息</div>
      <!-- <div>展开更多</div> -->
    </div>
    <div class="content">
      <div class="inner">
        <div v-for="item of config.list" :key="item.label" class="item">
          <span class="label">{{ item.label }}</span>
          <span class="value">{{ item.value }}</span>
        </div>
      </div>
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

<style lang="scss" scoped>
.list {
  margin-bottom: 20px;
  font-size: 14px;
  background: #fff;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    .title {
      padding-left: 5px;
      border-left: 3px solid #40a9fe;
      font-weight: bold;
    }
  }
  .content {
    padding: 15px 0;
    border-top: 1px solid #E5F2FB;
    .inner {
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      .item {
        display: flex;
        width: 50%;
        padding: 10px 20px;
        background: #F9FAFE;
        .label {
          position: relative;
          flex-shrink: 0;
          padding-left: 10px;
          margin-right: 20px;
          /* border-left: 2px solid #40a9fe; */
          font-weight: bold;
          color: #3C4058;
          &:before {
            position: absolute;
            left: 0;
            top: 1PX;
            width: 2px;
            height: 14px;
            content: '';
            background: #40a9fe;
          }
        }
        .value {
          color: #6A6E94;
          word-break: break-all;
        }
      }
    }
  }
}
</style>
