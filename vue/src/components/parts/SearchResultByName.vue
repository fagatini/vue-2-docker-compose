<template>
  <div class="search-result__seach-by-name">
    <RouterLink :to="{ name: ROUTES.HOME }" class="nav-main">Главная</RouterLink>

    <div class="search-title">
      <h2 class="search-title__search">{{ firstCapital(search) }}</h2>
      <span class="search-title__found">рецептов найдено: {{ getFoundCount() }}</span>
    </div>
    

    <IngredientsPicker :include-list="includeList" :exclude-list="excludeList"/>

    <div class="recipes" v-for="(recipe, indx) in filtered" :key="indx">
      <RecipeComponent :key="recipe.id" :recipe="recipe" />
      <RouterView />
    </div>
      
    <h2 v-if="!found">Нет совпадений</h2>
  </div>
</template>

<script>
import { ROUTES } from '@/router/routes'
import { mapGetters } from 'vuex'
import RecipeComponent from './RecipeComponent.vue';
import IngredientsPicker from './IngredientsPicker.vue';

export default {
  name: 'SearchResultByName',
  data() {
    return {
      found: false,
      includeList: [],
      excludeList: []
    }
  },
  components: {
    RecipeComponent,
    IngredientsPicker
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    search() {
      return this.$route.query.search
    },
    ...mapGetters('recipes', [
      'getRecipes',
      'getRecipesByIngredientsOrAll'
    ]),
    recipesByIngredients() {
      return this.getRecipesByIngredientsOrAll({
        includeList: this.includeList,
        excludeList: this.excludeList
      })
    },
    recipesIncludeSearch() {
      return this.getRecipes.filter( recipe => 
        recipe.name.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    filtered() {
      return this.recipesIncludeSearch.filter( recipe =>
        this.recipesByIngredients.includes(recipe)
      )
    }
  },
  methods: {
    foundTrue() {
      this.found = true
    },
    firstCapital(name) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
    getFoundCount() {
      let foundCount = this.filtered.length
      this.found = foundCount != 0
      return foundCount
    }
  }
}
</script>

<style lang="less" scoped>
.search-block {
  justify-content: flex-start;
}
</style>
