<template>
  <RouterLink :to="{ name: ROUTES.RECIPE, params: { id: recipe.id } }" class="recipe">
    <div class="recipe__image">
      <img :src="recipe.cover" />
    </div>
    <div class="recipe__content">
      <div class="recipe__content__name">
        {{ recipe.name }}
      </div>
      <div class="recipe__content__description">
        {{ recipe.description }}
      </div>
      <div class="recipe__content__ingredients">
        <span> Продукты: </span>
        {{ makeIngredientsList(recipe.ingredients) }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import { ROUTES } from '@/router/routes';
import { mapGetters } from 'vuex';

export default {
  name: "RecipeComponent",
  props: {
    recipe: Object
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    ...mapGetters('ingredients', [
      'getIngredientById'
    ])
  },
  methods: {
    getIngredientName(id) {
      return this.getIngredientById(id).name
    },
    makeIngredientsList(ingredients) {
      let ingredientsString = ""

      ingredients.forEach(ingredient => {
        ingredientsString += `${this.getIngredientName(ingredient.ingredient_id).toLowerCase()}, `
      })
      ingredientsString = ingredientsString.slice(0, ingredientsString.lastIndexOf(',')) + '.'

      return ingredientsString
    }
  },
}
</script>

<style lang="less" scoped>
.recipe {
  margin-top: 20px;
  display: flex;
  width: 760px;
  height: 200px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;

  &__image {
    min-width: 240px;
    height: inherit;
    background-position: center;
    border-radius: 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
  }

  &__content {
    width: -webkit-fill-available;
    display: flex;
    flex-direction: column;
    padding: 15px 25px;
    text-align: start;

    &__name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    &__description {
      font-size: 15px;
      margin-bottom: 10px;
      height: 50px;
    }

    &__ingredients {
      font-size: 15px;
      color: #878787;
    }
  }

  &:hover {
    background-color: #F5F5F5;
  }
}
</style>
