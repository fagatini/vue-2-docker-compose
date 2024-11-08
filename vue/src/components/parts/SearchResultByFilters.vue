<template>
  <div class="search-result__search-by-ingredients">
    <h2>Результаты поиска</h2>
    <p v-if="dish_category">Категория: {{ getDishCategoryName(dish_category) }}</p>
    <p v-if="dish_time">Время приёма: {{ getDishTimeName(dish_time) }}</p>
    <p v-if="dish_cuisine">Кухня: {{ getDishCuisineName(dish_cuisine) }}</p>

    <p v-if="includeIngredients.length > 0">Включить: |
      <span v-for="(plus, indx) in includeIngredients" :key="indx">
        {{ getIngredientName(plus) }} |
      </span>
    </p>
    <p v-if="excludeIngredients.length > 0">Исключить: |
      <span v-for="(minus, indx) in excludeIngredients" :key="indx">
        {{ getIngredientName(minus) }} |
      </span>
    </p>

    <span v-if="filter().length > 0">
      <div class="recipes-container">
        <RecipeComponent v-for="recipe in filtered" :key="recipe.id" :recipe="recipe" />
        <RouterView />
      </div>
    </span>
    <span v-else>Результаты не найдены</span>
  </div>
</template>

<script>
import { ROUTES } from '@/router/routes'
import { mapGetters } from 'vuex'
import RecipeComponent from './RecipeComponent.vue';

export default {
  name: 'SearchResultPage',
  data() {
    return {
      filtered: [],
      filteredRecipes: []
    }
  },
  components: {
    RecipeComponent
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    dish_category() {
      return this.$route.query.dish_category
    },
    dish_time() {
      return this.$route.query.dish_time
    },
    dish_cuisine() {
      return this.$route.query.dish_cuisine
    },
    includeIngredients() {
      return this.$route.query.include || []
    },
    excludeIngredients() {
      return this.$route.query.exclude || []  
    },
    ...mapGetters('recipes', [
      'getRecipes',
      'getRecipesByIngredientsOrAll',
      'getRecipesByCategoryId',
      'getRecipesByTimeId',
      'getRecipesByCuisineId'
    ]),
    ...mapGetters('ingredients', [
      'getIngredientName'
    ]),
    ...mapGetters('dish_categories', [
      'getDishCategoryName'
    ]),
    ...mapGetters('dish_time', [
      'getDishTimeName'
    ]),
    ...mapGetters('dish_cuisine', [
      'getDishCuisineName'
    ]),
  },
  methods: {
    filter() {
      let recipesWithCategory = this.dish_category ? this.getRecipesByCategoryId(this.dish_category) : this.getRecipes
      let recipesWithTime = this.dish_time ? this.getRecipesByTimeId(this.dish_time) : this.getRecipes
      let recipesWithCuisine = this.dish_cuisine ? this.getRecipesByCuisineId(this.dish_cuisine) : this.getRecipes
      
      let recipesByIngredients = this.getRecipesByIngredientsOrAll({
        includeList: this.includeIngredients,
        excludeList: this.excludeIngredients
      })

      this.filtered = this.getRecipes.filter(value =>
        recipesWithCategory.includes(value) &&
        recipesWithTime.includes(value) && 
        recipesWithCuisine.includes(value) && 
        recipesByIngredients.includes(value)
      )
      return this.filtered
    }
  }
}
</script>

<style lang="less" scoped></style>
