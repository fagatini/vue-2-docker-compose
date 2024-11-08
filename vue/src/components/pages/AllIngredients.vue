<template>
  <div class="all-ingredients">
    <nav>
      <RouterLink :to="{ name: ROUTES.CREATE_INGREDIENT }">Добавить новый ингредиент</RouterLink>
    </nav>
    <RouterView />
    <h2>Страница со всеми ингредиентами</h2>
    <div class="all-ingredients__container">
      <IngredientComponent 
        v-for="ingredient in ingredients" 
        :key="ingredient.id" 
        :ingredient="ingredient" />
    </div>
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
  align-items: center;

  &__container {
    width: 900px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    flex-direction: row;
    margin-left: 180px;
  }
}
</style>
