<template>
  <RouterLink class="ingredient" :to="{ name: ROUTES.RECIPE, params: { id:ingredient.ingredient_id } }">
    <img class="ingredient__image" :src="ingredient.cover"/>
    <div class="ingredient__name">
      {{ ingredient.name }}
    </div>
  </RouterLink>
</template>
  
<script>
import { ROUTES } from '@/router/routes';

export default {
  name: "IngredientComponent",
  props: {
    ingredient: Object
  },
  computed: {
    ROUTES() {
      return ROUTES
    }
  }
}
</script>
  
<style lang="less" scoped>
.ingredient {
  width: fit-content;
  height: fit-content;
  padding: 8px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;

  &__image {
    width: 205px;
    height: 205px;
    background-position: center;
    border-radius: inherit;
    border: 1px solid #f5f5f5;
    object-fit: cover;
  }
    
  &__name {
    display: block;
    font-size: 15px;
    margin-top: 4px;
    margin-bottom: 10px;
    text-align: center;
  }

  &:hover {
    background-color: #f5f5f5;
  }
}
</style>
  