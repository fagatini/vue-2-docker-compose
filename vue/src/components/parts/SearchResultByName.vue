<template>
  <div class="search-result__seach-by-name">
    <RouterLink :to="{ name: ROUTES.HOME }">Главная</RouterLink>
    <h2>{{ firstCapital(search) }}</h2>
    <h3>рецептов найдено: {{ getFoundCount() }}</h3>

    <IngredientsPicker :include-list="includeList" :exclude-list="excludeList"/>

    <div class="recipes" v-for="(recipe, indx) in recipesInclude" :key="indx">
      <RecipeComponent :key="recipe.id" :recipe="recipe" />
      <RouterView />
    </div>
      
    <h2 v-if="getFoundCount() == 0">Нет совпадений</h2>
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
      excludeList: [],
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
    ...mapGetters('recipes', {
      recipes: 'getRecipes'
    }),
    recipesInclude() {
      return this.recipes.filter( recipe => 
        recipe.name.toLowerCase().includes(this.search.toLowerCase())
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
      return this.recipesInclude.length
    }
  }
}
</script>
