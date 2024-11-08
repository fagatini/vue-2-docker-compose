<template>
  <div class="search-result__search-by-ingredients">
    <RouterLink :to="{ name: ROUTES.HOME }" class="nav-main">Главная</RouterLink>
    <div class="search-title">
      <h2 class="search-title__search">Результаты поиска</h2>
      <span class="search-title__found">рецептов найдено: {{ getFoundCount() }}</span>
    </div>
    <div class="filter-tags">
      <p v-if="dish_category" class="selected" @click="() => popCategory()">{{ getDishCategoryName(dish_category) }}</p>
      <p v-if="dish_time" class="selected" @click="() => popTime()">{{ getDishTimeName(dish_time) }}</p>
      <p v-if="dish_cuisine" class="selected">{{ getDishCuisineName(dish_cuisine) }}</p>

      <p v-if="includeIngredients.length > 0" class="filter-tags__group">
        <span v-for="(plus, indx) in includeIngredients" :key="indx" class="selected">
          {{ getIngredientName(plus) }}
        </span>
      </p>
      <p v-if="excludeIngredients.length > 0" class="filter-tags__group">
        <span v-for="(minus, indx) in excludeIngredients" :key="indx" class="selected selected--exclude">
          {{ getIngredientName(minus) }}
        </span>
      </p>
    </div>

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
      category: null,
      time: null,
      // cuisine: this.dish_cuisine,
      // included: this.includeIngredients,
      // excluded: this.excludeIngredients,
      filtered: [],
      // filteredRecipes: []
    }
  },
  components: {
    RecipeComponent
  },
  mounted() {
    this.setParameters()
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
      return this.$route.query.include
    },
    excludeIngredients() {
      return this.$route.query.exclude
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
    },
    popCategory() {
      this.category = null
    },
    popTime() {
      this.time = null
    },
    setParameters() {
      this.category = this.$route.query.dish_category
      this.time = this.$route.query.dish_time
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
</style>
