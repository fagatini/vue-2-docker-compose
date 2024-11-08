<template>
  <div class="app">
    <div class="search-wrapper">
      <RouterLink :to="{ name: ROUTES.HOME }"><img src="../assets/cooking_logo.png"></RouterLink>
      <input 
        v-model="search" 
        class="search-input" 
        type="text" 
        placeholder="искать на cooking"
        @keyup.enter="() => findByName()" />
    </div>

    <div v-if="showDetails" class="details-to-show--show">
      <DetailSearch />
    </div>

    <div class="app__body" :class="{'details-to-show--show': showDetails, 'details-to-show--hide': !showDetails}"> 
      <nav class="nav">
        <div class="nav__content">
          <div class="nav-base__container">
            <div class="nav-base__container__content" 
              v-for="(baseLink, ROUTE, i) in LINKS" 
              :key="i">
              <img class="nav-base__container__content__icon" src="../assets/nav_icon.png">
              <RouterLink class="nav-base__container__content__link" 
              :to="{ name: ROUTE }"
              >
                {{baseLink}}
              </RouterLink> 
            </div>
          </div>
          <div class="nav-category__container">
            <div class="nav-category__container__content" 
              v-for="(dish_category, i) in dish_categories" 
              :key="i">
              <img class="nav-category__container__content__icon" src="../assets/nav_icon.png">
              <RouterLink class="nav-category__container__content__link" 
              :to="{ name: ROUTES.SEARCH_RESULT, query: { dish_category: dish_category.id} }"
              >
                {{ dish_category.name }}
              </RouterLink> 
            </div>
          </div>
        </div>
      </nav>
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { ROUTES } from '@/router/routes';
import DetailSearch from './parts/HomeDetailSearch.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ROUTES() {
      return ROUTES
    },
    ...mapGetters('detail_search', {
      showDetails: 'getDetailsFlag'
    }),
    ...mapGetters('dish_categories', {
      dish_categories: 'getDishCategories'
    }),
    LINKS() {
      return {
        [ROUTES.HOME]: 'Главная',
        [ROUTES.ALL_RECIPES]: 'Все рецепты',
        [ROUTES.ALL_INGREDIENTS]: 'Все ингредиенты'
      }
  }
  },
  data() {
    return {
      search: null
    }
  },
  components: {
    DetailSearch
  },
  methods: {
    findByName() {
      if(this.search) {
        router.push({ name: ROUTES.SEARCH_RESULT, query: { search: this.search } })
      }
      this.search = null
    },
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.app {
  width: 100%;
  height: 100vh;

  &__body {
    display: flex;
    justify-content: center;
    min-height: 100%;
    margin: 12px 35px;
  }
}

body {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #39333f;
  background-color: #ECECEC;
  margin: 0;
}

.search-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  background-color: white;
  width: auto;
  height: -moz-fit-content;
  height: fit-content;
  padding: 3px 200px 3px 80px;
  border-bottom: 1px solid #ECECEC;
  z-index: 1;
}

.search-input {
  padding: 12px 30px 12px 60px;
  color: rgba(0, 0, 0, 0.7);
  transition: 0.15s all ease-in-out;
  background: #ECECEC;
  line-height: 22px;
  font-size: 14pt;
  min-width: 500px;
  max-width: 1200px;
  border-radius: 30px;
  border: none;
  margin: 10px 80px;
  width: -webkit-fill-available;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    font-size: 18px;
    color: rgba(0, 0, 0, .50);
    font-weight: 100;
  }
}

.search-button {
  background-color: #9bdfc0;
  border: 1px solid #82b9a0;
  border-radius: .5rem;
  box-sizing: border-box;
  color: #111827;
  font-family: "Inter var", ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: .875rem;
  font-weight: 600;
  line-height: 1rem;
  padding: .75rem 1rem;
  text-align: center;
  text-decoration: none #D1D5DB solid;
  text-decoration-thickness: auto;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: max-content;

  &:hover {
    background-color: #7dc7a6;
  }

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  &:focus-visible {
    box-shadow: none;
  }
}

.nav {
  min-width: 250px;
  min-height: 100%;
  background-color: white;
  border-radius: 70px;

  &__content {
    display: flex;
    flex-direction: column;
    padding: 10px;
    text-align: start;
  }
}

.nav-base {
  margin-bottom: 15px;

  &__container{
    width: 200px;
    height: 120px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-top: 50px;
    border-bottom: 2px solid;

    &__content {
      width: 200px;
      display: flex;
      margin-top: 10px;
      align-items: center;

      &__icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }

      &__link {
        text-decoration: none;
        font-size: 20px;
      }
    }
  }
}

.nav-category {
  margin-bottom: 15px;

  &__container {
    width: 200px;
    height: 120px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    &__content {
      width: 220px;
      display: flex;
      margin-top: 20px;
      align-items: center;

      &__icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }

      &__link {
        text-decoration: none;
        font-size: 20px;
      }
    }
  }
}

.content {
  display: flex;
  background-color: white;
  min-width: 700px;
  max-width: 1000px;
  width: -webkit-fill-available;
  margin-left: 12px;
  border-radius: 70px;
  padding: 70px 8%;
  justify-content: flex-start;
  text-align: left;
}

.recipes {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: -webkit-fill-available;

  &-container {
    display: flex;
    flex-direction: column;
    border-radius: 5px 5px 0 0;
    align-items: center;
  }
}

.details-to-show--show {
    animation: 0.3s show ease;
    position: relative; 
}

.details-to-show--hide {
  animation: 0.5s hide ease;
  position: relative;
}

@keyframes show  {
  from { top: -100px; }
  to { top: 0px; }
}

@keyframes hide  {
  from { top: 100px; }
  to { top: 0px; }
}

.nav-main {
  text-decoration: none;
  color: #49454F;
  font-size: 14px;
}
</style>
