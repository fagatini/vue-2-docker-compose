<template>
  <div class="recipes">
    <RouterLink :to="{ name: ROUTES.HOME }" class="nav-main">Главная</RouterLink>
    <div class="search-title">
      <h2 class="search-title__search">Результаты поиска</h2>
      <span class="search-title__found">рецептов найдено: {{ getFoundCount() }}</span>
    </div>
    <div class="filter-tags">
      <p v-if="dish_category" class="selected">{{ getDishCategoryName(dish_category) }}</p>
      <p v-if="dish_time" class="selected">{{ getDishTimeName(dish_time) }}</p>
      <p v-if="dish_cuisine" class="selected">{{ getDishCuisineName(dish_cuisine) }}</p>

      <p class="filter-tags__group">
        <span v-for="(include, indx) in includeIngredients" :key="'in' + indx" class="selected">
          {{ getIngredientName(include) }}
        </span>
      </p>
      <p class="filter-tags__group">
        <span v-for="(exclude, indx) in excludeIngredients" :key="'ex' + indx" class="selected selected--exclude">
          {{ getIngredientName(exclude) }}
        </span>
      </p>
    </div>

    <span v-if="filter().length > 0">
      <div class="recipes-container">
        <RecipeComponent v-for="recipe in filtered" :key="recipe.id" :recipe="recipe" />
        <RouterView />
      </div>
    </span>
    <span v-else class="not-found">Результаты не найдены</span>
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
      filtered: []
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
    },
    getFoundCount() {
      return this.filtered.length
    }
  }
}
</script>

<style lang="less">
.filter-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__group {
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0;
  }
}

.search-title {
  margin: 30px 0;

  &__search {
    display: inline;
    margin-right: 8px;
  }

  &__found {
    color: #878787;
    font-weight: bold;
    font-size: 15px;
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 0.2px;
  }
}

.not-found {
  margin: 30px 0;
}
</style>
