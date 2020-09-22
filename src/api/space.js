import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/archiveservice/v1/archive/space/page',
    method: 'post',
    data
  })
}

export function list(data) {
  return request({
    url: '/archiveservice/v1/archive/space/list',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/archiveservice/v1/archive/space/delete',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/archiveservice/v1/archive/space/save',
    method: 'post',
    data
  })
}

export function menuPage(data) {
  return request({
    url: '/systemservice/v1/sys/menu/page',
    method: 'post',
    data
  })
}

export function menuDetail(data) {
  return request({
    url: '/systemservice/v1/sys/menu/get',
    method: 'post',
    data
  })
}

export function menuDel(data) {
  return request({
    url: '/systemservice/v1/sys/menu/delete',
    method: 'post',
    data
  })
}

export function menuSave(data) {
  return request({
    url: '/systemservice/v1/sys/menu/save',
    method: 'post',
    data
  })
}

export function get(data) {
  return request({
    url: '/systemservice/v1/sys/menu/get',
    method: 'post',
    data
  })
}

export function serverList(data) {
  return request({
    url: '/archiveservice/v1/archive/archiveMethod/list',
    method: 'post',
    data
  })
}

export function serverParam(data) {
  return request({
    url: '/archiveservice/v1/archive/archiveMethod/get',
    method: 'post',
    data
  })
}

export function serverDetail(data) {
  return request({
    url: '/archiveservice/v1/archive/query/detail',
    method: 'post',
    data
  })
}

export function getLayoutInfo(data) {
  return request({
    url: '/archiveservice/v1/archive/query/detail',
    method: 'POST',
    data
  })
}
