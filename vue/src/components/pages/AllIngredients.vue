<template>
  <div class="all-ingredients">
    <RouterLink :to="{ name: ROUTES.HOME }" class="nav-main">Главная</RouterLink>
    <RouterView />
    <h2>Ингредиенты</h2>
    <div class="all-ingredients__container">
      <IngredientComponent 
        v-for="ingredient in ingredients" 
        :key="ingredient.id" 
        :ingredient="ingredient"
      />
    </div>
    <RouterLink :to="{ name: ROUTES.CREATE_INGREDIENT }" class="floating-button">+</RouterLink>
  </div>
</template>

<script>
import { ROUTES } from '@/router/routes';
import { mapActions, mapGetters } from 'vuex';
import IngredientComponent from '../parts/IngredientComponent.vue';

export default {
  name: 'AllIngredientsPage',
  components: {
    IngredientComponent
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    ...mapActions('detail_search', [
      'hideDetails'
    ]),
    ...mapGetters('ingredients', {
      ingredients: 'getIngredients'
    })
  },
  mounted() {
    this.hideDetails
  }
}
</script>

<style lang="less" scoped>
.all-ingredients {
  display: flex;
  flex-direction: column;

  &__container {
    width: inherit;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    flex-direction: row;
  }
}
</style>
