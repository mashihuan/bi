import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/archiveservice/v1/archive/archiveMethod/page',
    method: 'post',
    data
  })
}

export function list(data) {
  return request({
    url: '/archiveservice/v1/archive/archiveMethod/list',
    method: 'post',
    data
  })
}

export function get(data) {
  return request({
    url: '/archiveservice/v1/archive/archiveMethod/get',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/archiveservice/v1/archive/archiveMethod/save',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/archiveservice/v1/archive/archiveMethod/delete',
    method: 'post',
    data
  })
}

// 发布服务
export function publish(data) {
  return request({
    url: '/archiveservice/v1/archive/archiveMethod/publish',
    method: 'post',
    data
  })
}
