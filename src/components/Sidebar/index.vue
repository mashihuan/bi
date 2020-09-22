<template>
  <el-scrollbar>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="item of menus" :key="item.name" :name="item.name">
        <template slot="title">
          <div class="header-left">
            <i class="el-icon-plus" />
            <span>{{ item.name }}</span>
          </div>
          <!-- <el-tooltip :content="item.tip" placement="right-start">
            <i class="el-icon-question" />
          </el-tooltip> -->
        </template>
        <draggable
          v-model="item.list"
          class="sidebar"
          handle=".move"
          :group="{name: 'common', pull: 'clone', put: false}"
          :sort="false"
          :clone="handleDragClone"
          :move="handleDragForbidMove"
        >
          <div v-for="iten of item.list" :key="iten.name" class="sidebar-item">
            <div class="top">
              {{ iten.name }}
              <el-tag type="info" size="mini" class="move">
                <i class="el-icon-rank" />拖动
              </el-tag>
            </div>
          </div>
        </draggable>
      </el-collapse-item>
    </el-collapse>
  </el-scrollbar>
</template>

<script>
import Draggable from 'vuedraggable'

import * as config from '@/components/Chart/config'
import { deepClone } from '@/utils'

export default {
  components: {
    Draggable
  },
  data() {
    return {
      activeNames: '布局',
      menus: [
        // 若想增加一列布局，直接增加一项配置即可
        // name需以短横线分割，深拷贝时设置cols
        {
          name: '布局',
          tip: '栅格布局，默认24列',
          list: [
            { name: '24', type: '24', cpnName: 'Row' },
            { name: '12-12', type: '12_12', cpnName: 'Row' },
            { name: '10-14', type: '10_14', cpnName: 'Row' },
            { name: '6-12-6', type: '6_12_6', cpnName: 'Row' },
            { name: '8-8-8', type: '8_8_8', cpnName: 'Row' }
          ]
        },
        // config为图表默认数据，放在一起便于管理
        {
          name: '图表',
          tip: '图表展示组件',
          list: [
            { name: '折线图', type: 'line', cpnName: 'LineChart',
              config: config.lineConfig
            },
            { name: '柱状图', type: 'bar', cpnName: 'BarChart',
              config: config.barConfig
            },
            { name: '饼图', type: 'pie', cpnName: 'PieChart',
              config: config.pieConfig
            },
            { name: '平面地理图', type: 'map', cpnName: 'MapChart',
              config: config.mapConfig
            },
            { name: '关系图', type: 'graph', cpnName: 'GraphChart',
              config: config.graphConfig
            },
            { name: '3D地理图', type: '3dmap', cpnName: 'Map3DChart',
              config: config.map3DConfig
            }
          ]
        },
        {
          name: '展示',
          tip: '数据展示组件',
          list: [
            { name: '链接', type: 'link', cpnName: 'Link',
              config: config.linkConfig
            },
            { name: '数据展示', type: 'Statistic', cpnName: 'Statistic',
              config: config.statisticConfig
            },
            { name: '搜索框', type: 'Search', cpnName: 'Search',
              config: config.searchConfig
            },
            { name: '列表', type: 'List', cpnName: 'List',
              config: config.listConfig
            },
            { name: '表格', type: 'Table', cpnName: 'Table',
              config: config.tableConfig
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 保证图表只能放入row内
    handleDragForbidMove(evt) {
      if (evt.to.className === 'row-wrapper' && !evt.draggedContext.element.cols) {
        return false
      }
      return true
    },
    // 部分内容需深拷贝，组件不需深拷贝、会内存溢出
    handleDragClone(item) {
      // 为row添加cols
      if (item.cpnName === 'Row') {
        const cols = []
        item.name.split('-').forEach(val => {
          cols.push({ col: Number(val), children: [] })
        })
        item.cols = cols
      }
      return deepClone(item)
    },
    handleChange(val) {
      this.activeNames = val
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep.el-scrollbar {
  width: 100%;
  height: 100%;
  background: #304156;
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .el-collapse {
    border: none;
    .el-collapse-item__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      font-size: 14px;
      .header-left {
        display: flex;
        align-items: center;
        i {
          margin-right: 10px;
          font-weight: bold;
        }
      }
    }
    .el-collapse-item__content {
      padding-bottom: 0;
      background: #1F2D3D;
    }
    .el-collapse-item__header, .el-collapse-item__wrap {
      border: none;
      background: none;
      color: #fff;
    }
    /* .el-collapse-item__arrow {
      display: none;
    } */
    text-align: center;
    color: #fff;
    background: none;
    .sidebar-item {
      position: relative;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;;
        padding: 15PX;
        font-size: 14PX;
        color: #fff;
        .move {
          cursor: pointer;
        }
      }
    }
  }
}

</style>
