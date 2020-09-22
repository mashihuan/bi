<template>
  <div class="tag-group">
    <!-- <el-tag v-if="item.cols" type="warning" size="small" class="align">
      <el-dropdown>
        <span class="el-dropdown-link">
          对齐<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="iten of aligns"
            :key="iten.label"
            :style="{color: item.align === iten.value ? '#66B1FF': ''}"
            @click.native="item.align=iten.value"
          >
            {{ iten.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-tag> -->

    <el-tag v-if="!item.cols" type="warning" size="small" class="edit" @click="handleEditClick">
      <i class="el-icon-edit-outline" />编辑
    </el-tag>
    <el-tag type="info" size="small" class="move">
      <i class="el-icon-rank" />拖动
    </el-tag>
    <el-tag type="danger" size="small" class="remove" @click="handleRemoveClick">
      <i class="el-icon-circle-close" />删除
    </el-tag>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    },
    colIndex: {
      type: Number,
      default: 0
    },
    showEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      align: 'left',
      aligns: [
        { label: '居左', value: 'flex-start' },
        { label: '居中', value: 'center' },
        { label: '居右', value: 'flex-end' }
      ]
    }
  },
  methods: {
    handleRemoveClick() {
      this.$emit('handleRemoveClick', { index: this.index, colIndex: this.colIndex })
    },
    handleEditClick() {
      this.$emit('handleEditClick', { index: this.index, colIndex: this.colIndex })
    }
  }
}
</script>

<style lang="scss">
.tag-group {
  position: absolute;
  top: 5PX;
  right: 5PX;
  z-index: 1;
  ::v-deep.el-dropdown {
    font-size: 12px;
  }
  .el-tag {
    margin-left: 20px;
    opacity: 0.6;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
    i {
      font-size: 16PX;
    }
  }
}
</style>
