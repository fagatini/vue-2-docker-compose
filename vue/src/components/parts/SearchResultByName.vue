<template>
  <div class="search-result__seach-by-name">
    <RouterLink :to="{ name: ROUTES.HOME }">Главная</RouterLink>
    <h2>Результаты поиска по запросу {{ search }}</h2>
    <div class="recipes-container">
      <div class="recipes" v-for="(recipe, indx) in recipes" :key="indx">
        <span v-if="recipe.name.toLowerCase().includes(search.toLowerCase())">
          <RecipeComponent :key="recipe.id" :recipe="recipe" />
          <RouterView />
          {{ foundTrue() }}
        </span>
      </div>
    </div>
    <h2 v-if="!found">Нет совпадений</h2>
  </div>
</template>

<script>
import { ROUTES } from '@/router/routes'
import { mapGetters } from 'vuex'
import RecipeComponent from './RecipeComponent.vue';

export default {
  name: 'SearchResultByName',
  data() {
    return {
      found: false
    }
  },
  components: {
    RecipeComponent
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
    })
  },
  methods: {
    foundTrue() {
      this.found = true
    }
  }
}
</script>