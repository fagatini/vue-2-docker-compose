import dish_categories from './dish_categories'
import dish_cuisine from './dish_cuisine'
import dish_time from './dish_time'
import dishes from './dishes'
import ingredients from './ingredients'
import recipes from './recipes'

export default{
  namespaced: true,
  modules: {
    recipes,
    ingredients,
    dishes,
    dish_categories,
    dish_time,
    dish_cuisine
  }
}
