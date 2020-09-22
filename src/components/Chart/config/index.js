// 默认图表颜色
const colors = ['#4872FF', '#2FCFC4', '#40A9FE', '#FFC16C', '#3BA8FC', '#FF4D4F', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']

// 图表默认数据
// 折线图
export const lineConfig = {
  title: '折线图',
  height: 370,
  displayType: 'LINE_CHART',
  chartData: [
    { name: '在业', data: [130, 200, 160, 90, 90, 100, 140] },
    { name: '注销', data: [90, 160, 130, 40, 70, 110, 100] }
  ],
  chartX: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05'],
  associateMap: true,
  params: [],
  dataSourceId: null,
  smooth: false,
  cardinalNumber: null,
  colors: colors
}

// 柱状图
export const barConfig = {
  title: '柱状图',
  height: 370,
  displayType: 'BAR_CHART',
  chartData: [
    { name: '增加', data: [130, 200, 160, 90, 90, 100, 140] },
    { name: '减少', data: [90, 160, 130, 40, 70, 110, 100] }
  ],
  chartX: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05'],
  associateMap: true,
  params: [],
  dataSourceId: null,
  cardinalNumber: null,
  horizontal: false,
  colors: colors,
  stack: false
}

// 饼图
export const pieConfig = {
  title: '饼图',
  height: 370,
  displayType: 'PIE_CHART',
  chartData: [
    { value: 335, name: '第一产业(农业)' },
    { value: 310, name: '第二产业(工业)' },
    { value: 234, name: '第三产业(服务业)' }
  ],
  associateMap: true,
  params: [],
  dataSourceId: null,
  roseType: false,
  radius1: 0,
  radius2: 70,
  colors: colors
}

// 平面地理图
export const mapConfig = {
  title: '平面地理图',
  height: 370,
  geoJson: null,
  visualMap: false,
  drill: false // 是否下钻
}

// 关系图
export const graphConfig = {
  title: '关系图',
  height: 370,
  chartData: {}
}

// 3d地理图
export const map3DConfig = {
  title: '3D地理图',
  height: 370,
  chartData: [],
  charts: []
}

// 链接
export const linkConfig = {
  title: '链接'
}

// 数据展示
export const statisticConfig = {
  title: '数据展示'
}

// 搜索框
export const searchConfig = {

}

// 列表
export const listConfig = {
  list: [
    { label: '姓名', value: '张三' },
    { label: '性别', value: '男' },
    { label: '身份证', value: '320622196310102xxx' },
    { label: '职业', value: '程序员' },
    { label: '学历', value: '本科' },
    { label: '工作单位', value: '南通市' }
  ]
}

// 表格
export const tableConfig = {

}
