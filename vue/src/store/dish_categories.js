import dish_categories from '@/data/dish_categories_data'

export default {
  namespaced: true,
  state: {
    dish_categories: JSON.parse(localStorage.getItem("dish_categories")) ?? dish_categories
  },
  getters: {
    getDishCategories: (state) => state.dish_categories,
    getDishCategoryById: (state) => (id) => state.dish_categories.find(i => i.id === id)
  },
  mutations: {
    SET_DISH_CATEGORIES: (state, payload) => {
      state.dish_categories = payload
    },
    ADD_DISH_CATEGORY: (state, payload) => {
      state.dish_categories.push(payload)
      localStorage.setItem('dish_categories', JSON.stringify(state.dish_categories))
    }
  },
  actions: {
    loadDishCategories: (context, payload = null) => {
      context.commit('SET_DISH_CATEGORIES', payload)
    },
    addDishCategory: (context, payload) => {
      context.commit('ADD_DISH_CATEGORY', payload)
    }
  }
}