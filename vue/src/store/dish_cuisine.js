import dish_cuisine from '@/data/dish_cuisine_data'

export default {
  namespaced: true,
  state: {
    dish_cuisine: JSON.parse(localStorage.getItem("dish_cuisine")) ?? dish_cuisine
  },
  getters: {
    getDishCuisine: (state) => state.dish_cuisine,
    getDishCuisineById: (state) => (id) => state.dish_cuisine.find(i => i.id === id)
  },
  mutations: {
    SET_DISH_CUISINE: (state, payload) => {
      state.dish_cuisine = payload
    },
    ADD_DISH_CUISINE: (state, payload) => {
      state.dish_cuisine.push(payload)
      localStorage.setItem('dish_cuisine', JSON.stringify(state.dish_cuisine))
    }
  },
  actions: {
    loadDishCuisine: (context, payload = null) => {
      context.commit('SET_DISH_CUISINE', payload)
    },
    addDishCuisine: (context, payload) => {
      context.commit('ADD_DISH_CUISINE', payload)
    }
  }
}