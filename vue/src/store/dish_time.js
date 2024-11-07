import dish_time from '@/data/dish_time_data'

export default {
  namespaced: true,
  state: {
    dish_time: JSON.parse(localStorage.getItem("dish_time")) ?? dish_time
  },
  getters: {
    getDishTime: (state) => state.dish_time,
    getDishTimeById: (state) => (id) => state.dish_time.find(i => i.id === id),
    getDishTimeName: (state) => (id) => state.dish_time.find(i => i.id === id).name
  },
  mutations: {
    SET_DISH_TIME: (state, payload) => {
      state.dish_time = payload
    },
    ADD_DISH_TIME: (state, payload) => {
      state.dish_time.push(payload)
      localStorage.setItem('dish_time', JSON.stringify(state.dish_time))
    }
  },
  actions: {
    loadDishTime: (context, payload = null) => {
      context.commit('SET_DISH_TIME', payload)
    },
    addDishTime: (context, payload) => {
      context.commit('ADD_DISH_TIME', payload)
    }
  }
}