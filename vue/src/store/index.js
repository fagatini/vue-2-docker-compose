import detail_search from './detail_search'
import dish_categories from './dish_categories'
import dish_cuisine from './dish_cuisine'
import dish_time from './dish_time'
import dishes from './dishes'
import ingredients from './ingredients'
import recipes from './recipes'
import users from './users'
import comments from './comments'

export default{
  namespaced: true,
  modules: {
    recipes,
    ingredients,
    dishes,
    dish_categories,
    dish_time,
    dish_cuisine,
    detail_search,
    comments,
    users
  }
}
