<template>
  <div v-if="ingredient" class="ingredient">
    <RouterLink :to="{ name: ROUTES.HOME }" class="nav-main">Главная</RouterLink>

    <div class="ingredient-header">
      <h2>{{ ingredient.name }}</h2>
      <p>{{ ingredient.description }}</p>
      <p>{{ ingredient.measure_units}}</p>
    </div>

    <div class="ingredient-card">
      <img
          class="ingredient-card__pic"
          v-bind:src="ingredient.cover"
          v-bind:alt="ingredient.name"
      >
    </div>

  </div>

  <h2 v-else> Указанный ингредиент отсутствует :c</h2>
</template>

<script>
import { mapGetters } from 'vuex';
import { ROUTES } from '@/router/routes';

export default {
  name: 'IngredientPage',
  props: {
    id: Number
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    ingredient() {
      return this.getIngredientById(this.id) || null
    },
    ...mapGetters('ingredients', [
      'getIngredientById'
    ]),
  }
}
</script>

<style lang="less" scoped>
.ingredient {
  text-align: left;
}

.ingredient-card {
  width: 100%;
  display: inline-flex;

  &__pic {
    width: 255px;
    height: 255px;
    border-radius: 4%;
    object-fit: cover;
  }

  &__description {
    margin: 0px 7px 0px 7px;
    padding: 0px 10px 0px 20px;
  }
}

.portions {
  display: flex;
  max-width: 170px;
  min-width: 160px;
  justify-content: space-between;
}

.recount-element {
  display: inline-flex;
  align-items: center;

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    font-size: 20px;
    font-weight: 600;
    background-color: white;
    border: solid 2px black;
    border-radius: 100%;
  }

  &__output {
    display: block;
    margin: 0px 5px 0px 5px;
    width: 45px;
    height: 30px;
    background-color: #ececec;
    border-radius: 6px;
    text-align: center;
    line-height: 30px;
    font-weight: 600;
  }
}

.ingredient-steps {
  width: 100%;
  display: grid;
  margin-bottom: 1%;
}

.step-card {
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;

  &__pic {
    width: 310px;
    height: 310px;
    border-radius: 4%;
    object-fit: cover;
  }

  &__text {
    margin: 0px 7px 0px 7px;
    padding: 0px 10px 0px 20px;
  }
}
</style>
