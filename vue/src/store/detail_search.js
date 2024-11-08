export default {
  namespaced: true,
  state: {
    showDetails: false
  },
  getters: {
    getDetailsFlag: (state) => state.showDetails
  },
  mutations: {
    SET_DETAILS_FLAG: (state, payload) => {
      state.showDetails = payload
    },
    SHOW_DETAILS: (state) => {
      state.showDetails = true
    },
    HIDE_DETAILS: (state) => {
      state.showDetails = false
    }
  },
  actions: {
    setDetailsFlag: (context, payload = null) => {
      context.commit('SET_DETAILS_FLAG', payload)
    },
    showDetails: (context) => {
      context.commit('SHOW_DETAILS')
    },
    hideDetails: (context) => {
      context.commit('HIDE_DETAILS')
    }
  }
}