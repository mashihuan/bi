import request from '@/utils/request'

// 获取用户列表
export function page(data) {
  return request({
    url: '/systemservice/v1/sys/user/page',
    method: 'post',
    data
  })
}

// 获取用户详情
export function get(data) {
  return request({
    url: '/systemservice/v1/sys/user/get',
    method: 'post',
    data
  })
}

// 获取部门列表
export function orgList(data) {
  return request({
    url: '/systemservice/v1/sys/organization/list',
    method: 'post',
    data
  })
}

// 获取角色列表
export function roleList(data) {
  return request({
    url: '/systemservice/v1/sys/role/list',
    method: 'post',
    data
  })
}

// 获取类型列表
export function typeList(data) {
  return request({
    url: '/systemservice/v1/sys/dict/list',
    method: 'post',
    data
  })
}

// 提交编辑
export function save(data) {
  return request({
    url: '/systemservice/v1/sys/user/save',
    method: 'post',
    data
  })
}

// 删除用户
export function del(data) {
  return request({
    url: '/systemservice/v1/sys/user/delete',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/systemservice/v1/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(sessionToken) {
  return request({
    url: '/systemservice/v1/sys/getUserFromSessionToken',
    method: 'get',
    params: { sessionToken }
  })
}

export function logout(sessionToken) {
  return request({
    url: '/systemservice/v1/sys/logout',
    method: 'post',
    data: { sessionToken: sessionToken }
  })
}
