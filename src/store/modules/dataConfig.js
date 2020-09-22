import { get } from '@/api/dataServe'

const state = () => ({
  serveDetail: {}
})

const actions = {
  async getServeDetail({ commit }, para) {
    await get(para).then(res => {
      commit('SERVE_DETAIL', res.data)
    })
  }
}

const mutations = {
  SERVE_DETAIL(state, detail) {
    state.serveDetail = detail
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
