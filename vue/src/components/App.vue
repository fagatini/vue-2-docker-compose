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
          <RouterLink class="nav__container"
            :to="{ name: ROUTE }"
            v-for="(baseLink, ROUTE, i) in LINKS" 
            :key="i">
            <div class="nav__container__link">
              {{baseLink}}
            </div> 
          </RouterLink>
          <div class="nav__delimeter"></div>
          <RouterLink class="nav__container"
            :to="{ name: ROUTES.SEARCH_RESULT, query: { dish_category: dish_category.id} }"
            v-for="(dish_category, i) in dish_categories" 
            :key="i">
            <img class="nav__container__icon" :src="dish_category.img">
            <div class="nav__container__link">
              {{ dish_category.name }}
            </div> 
          </RouterLink>
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
        [ROUTES.ALL_INGREDIENTS]: 'Ингредиенты'
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
    }
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

.nav {
  width: 304px;
  height: fit-content;
  background-color: white;
  border-radius: 70px;

  &__content {
    width: max-content;
    padding: 60px 40px;
    text-align: start;
  }

  &__container{
    display: flex;
    margin: 2px 0;
    align-items: center;
    padding: 10px;
    text-decoration: none;
    color: inherit;

    &__icon {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 8px;
    }

    &__link {
      font-size: 16px;
    }

    &:hover {
      background-color: #ECECEC;
    }
  }

  &__delimeter {
    border-bottom: 1px solid #ECECEC;
  }
}

.content {
  display: flex;
  background-color: white;
  min-width: 700px;
  max-width: 1000px;
  width: -webkit-fill-available;
  margin-left: 12px;
  margin-bottom: 12px;
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
