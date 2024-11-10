<template>
  <div class="recipes">
    <RouterLink :to="{ name: ROUTES.HOME }" class="nav-main">Главная</RouterLink>
    <div class="search-title">
      <h2 class="search-title__search">Результаты поиска</h2>
      <span class="search-title__found">рецептов найдено: {{ foundCount }}</span>
    </div>
    <div class="filter-tags">
      <p v-if="dish_category" class="selected">{{ categoryName }}</p>
      <p v-if="dish_time" class="selected">{{ timeName }}</p>
      <p v-if="dish_cuisine" class="selected">{{ cuisineName }}</p>

      <p class="filter-tags__group">
        <span 
          v-for="(include, indx) in includeNames" 
          :key="'in' + indx" 
          class="selected"
        >
          {{ include }}
        </span>
      </p>
      <p class="filter-tags__group">
        <span 
          v-for="(exclude, indx) in excludeNames" 
          :key="'ex' + indx" 
          class="selected selected--exclude"
        >
          {{ exclude }}
        </span>
      </p>
    </div>

    <span v-if="foundCount > 0">
      <div v-for="recipe in filtered" :key="recipe.id" class="recipes-container">
        <RecipeComponent :recipe="recipe" />
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
  components: {
    RecipeComponent
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    dish_category() {
      return Number(this.$route.query.dish_category) || null
    },
    dish_time() {
      return Number(this.$route.query.dish_time) || null
    },
    dish_cuisine() {
      return Number(this.$route.query.dish_cuisine) || null
    },
    includeIngredients() {
      return this.toNumArray(this.$route.query.include || [])
    },
    excludeIngredients() {
      return this.toNumArray(this.$route.query.exclude || [])  
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
    categoryName() {
      return this.getDishCategoryName(this.dish_category)
    },
    timeName() {
      return this.getDishTimeName(this.dish_time)
    },
    cuisineName() {
      return this.getDishCuisineName(this.dish_cuisine)
    },
    includeNames() {
      return this.includeIngredients.map( ingredient =>
        this.getIngredientName(ingredient)
      )
    },
    excludeNames() {
      return this.excludeIngredients.map( ingredient =>
        this.getIngredientName(ingredient)
      )
    },
    filtered() {
      return this.filterRecipes()
    },
    foundCount() {
      return this.filtered.length || 0
    }
  },
  methods: {
    filterRecipes() {
      let recipesWithCategory = this.dish_category ? this.getRecipesByCategoryId(this.dish_category) : this.getRecipes
      let recipesWithTime = this.dish_time ? this.getRecipesByTimeId(this.dish_time) : this.getRecipes
      let recipesWithCuisine = this.dish_cuisine ? this.getRecipesByCuisineId(this.dish_cuisine) : this.getRecipes

      let recipesByIngredients = this.getRecipesByIngredientsOrAll({
        includeList: this.includeIngredients,
        excludeList: this.excludeIngredients
      })

      let filtered = this.getRecipes.filter(value =>
        recipesWithCategory.includes(value) &&
        recipesWithTime.includes(value) &&
        recipesWithCuisine.includes(value) &&
        recipesByIngredients.includes(value)
      )
      return filtered
    },
    toNumArray(ingredients) {
      if(typeof ingredients == 'string') {
        ingredients = Array.from([Number(ingredients)])
      } else {
        ingredients = ingredients.map(ingredient =>
          Number(ingredient)
        )
      }
      return ingredients
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
