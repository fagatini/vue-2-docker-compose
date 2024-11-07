import recipes from '@/data/recipes_data'

export default {
  namespaced: true,
  state: {
    recipes: JSON.parse(localStorage.getItem("recipes")) ?? recipes
  },
  getters: {
    getRecipes: (state) => state.recipes,
    getRecipeById: (state) => (id) => state.recipes.find(i => i.id === id),
    getRecipesByIngredientsOrAll: (state) => ({includeList, excludeList}) => {
      let result = state.recipes
      
      if (includeList.length > 0) {
        result = result.filter(recipe => {
          return (recipe.ingredients.map(ingredient =>
            includeList.includes(ingredient.ingredient_id)))
            .reduce(
              (acc, curr) => acc || curr
            )
        })
      }

      if (excludeList.length > 0) {
        result = result.filter(recipe => {
          return (recipe.ingredients.map(ingredient =>
            !excludeList.includes(ingredient.ingredient_id)))
            .reduce(
              (acc, curr) => acc && curr
            )
        })
      }

      return result
    },
    getRecipesByCategoryId: (state) => (category_id) => state.recipes.filter(recipe => 
      recipe.dish_category_id === category_id
    ),
    getRecipesByTimeId: (state) => (time_id) => state.recipes.filter(recipe => 
      recipe.dish_time_id === time_id
    ),
    getRecipesByCuisineId: (state) => (cuisine_id) => state.recipes.filter(recipe => 
      recipe.dish_cuisine_id === cuisine_id
    )
  },
  mutations: {
    SET_RECIPES: (state, payload) => {
      state.recipes = payload
      localStorage.setItem('recipes', JSON.stringify(state.recipes))
    },
    ADD_RECIPE: (state, payload) => {
      state.recipes.push(payload)
      localStorage.setItem('recipes', JSON.stringify(state.recipes))
    }
  },
  actions: {
    loadRecipes: (context, payload) => {
      context.commit('SET_RECIPES', payload)
    },
    addRecipe: (context, payload) => {
      context.commit('ADD_RECIPE', payload)
    }
  }
}