<template>
  <div class="recipes">
    <RouterLink :to="{ name: ROUTES.HOME }" class="nav-main">Главная</RouterLink>
    <div class="search-title">
      <h2 class="search-title__search">Все рецепты</h2>
      <span class="search-title__found">рецептов найдено: {{ getFoundCount() }}</span>
    </div>

    <div class="search-line">
      <input 
        v-model="search" 
        class="search-input" 
        type="text" 
        placeholder="искать на cooking"
        @keyup.enter="() => findByName()" />
      
      <button class="search-line__button" @click="() => findByName()">Найти</button>
    </div>

    <RouterView />
    <div class="recipes-container">
      <RecipeComponent 
        v-for="recipe in recipesToShow" 
        :key="recipe.id"
        :recipe="recipe"
      />
      <RouterView />
    </div>
    <PaginationComponent 
      :items="recipes" 
      :maxVisiblePages="5" 
      :maxItemsPerPage="this.maxItemsPerPage"
      @changePage="(page) => changePage(page)" 
    />

    <RouterLink :to="{ name: ROUTES.CREATE_RECIPE }" class="floating-button">+</RouterLink>
  </div>
</template>

<script>
import router from '@/router';
import { ROUTES } from '@/router/routes';
import { mapActions, mapGetters } from 'vuex';
import RecipeComponent from '../parts/RecipeComponent.vue';
import PaginationComponent from '../parts/PaginationComponent.vue';

export default {
  name: 'AllRecipesPage',
  components: {
    RecipeComponent,
    PaginationComponent
  },
  data() {
    return {
      maxItemsPerPage: 5,
      recipesOnPage: [],
      search: null
    }
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    ...mapActions('detail_search', [
      'hideDetails'
    ]),
    ...mapGetters('recipes', {
      recipes: 'getRecipes'
    }),
    recipesToShow() {
      return this.recipesOnPage.length > 0 ? this.recipesOnPage : this.recipes.slice(0, this.maxItemsPerPage)
    }
  },
  mounted() {
    this.hideDetails
  },
  methods: {
    changePage(page) {
      this.recipesOnPage = this.recipes.slice((page - 1) * this.maxItemsPerPage, page * this.maxItemsPerPage)
    },
    getRecipesForPage(page) {
      this.recipesToShow = this.recipes.slice((page - 1) * this.maxItemsPerPage, this.maxItemsPerPage)

      return this.recipesToShow
    },
    getFoundCount() {
      return this.recipes.length
    }, 
    findByName() {
      if(this.search) {
        router.push({ name: ROUTES.SEARCH_RESULT, query: { search: this.search } })
      }
      this.search = null
    }
  }
}
</script>

<style lang="less" scoped>
.search-line {
  display: flex;
  align-items: center;
  margin: 5px 0 25px;

  &__button {
    border: none;
    border-radius: 30px;
    padding: 12px 30px;
    line-height: 22px;
    background-color: #ececec;
    font-size: 16px;
    font-family: inherit;
  }
}
.search-input {
  margin: 0 8px 0 0;
}
</style>
