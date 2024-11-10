import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/pages/Home.vue'
import RecipePage from '@/components/pages/Recipe.vue'
import AllRecipesPage from '@/components/pages/AllRecipes.vue'
import IngredientPage from "@/components/pages/Ingredient.vue";
import AllIngredientsPage from '@/components/pages/AllIngredients.vue'
import CreateRecipePage from '@/components/pages/CreateRecipe.vue'
import CreateIngredientPage from '@/components/pages/CreateIngredient.vue'
import SearchResultPage from '@/components/pages/SearchResult.vue'

import { ROUTES } from './routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: ROUTES.HOME,
    component: HomePage
  },
  {
    path: '/all-recipes/:id',
    name: ROUTES.RECIPE,
    component: RecipePage,
    props: (route: any) => ({
      id: Number(route.params.id) || undefined
    })
  },
  {
    path: '/all-recipes',
    name: ROUTES.ALL_RECIPES,
    component: AllRecipesPage
  },
  {
    path: '/all-ingredients',
    name: ROUTES.ALL_INGREDIENTS,
    component: AllIngredientsPage
  },
  {
    path: '/all-ingredients/:id',
    name: ROUTES.INGREDIENT,
    component: IngredientPage,
    props: (route: any) => ({
      id: Number(route.params.id) || undefined
    })
  },
  {
    path: '/create-recipe',
    name: ROUTES.CREATE_RECIPE,
    component: CreateRecipePage
  },
  {
    path: '/create-ingredient',
    name: ROUTES.CREATE_INGREDIENT,
    component: CreateIngredientPage
  },
  {
    path: '/search',
    name: ROUTES.SEARCH_RESULT,
    component: SearchResultPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
