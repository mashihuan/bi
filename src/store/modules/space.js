const state = {
  charts: []
}

const mutations = {
  SAVE_CHARTS(state, charts) {
    state.charts = charts
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
