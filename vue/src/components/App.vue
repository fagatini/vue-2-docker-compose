<template>
  <div class="app">
    <div class="search-wrapper">
      <img src="../assets/cooking_logo.png">
      <input 
        v-model="search" 
        class="search-input" 
        type="text" 
        placeholder="искать на cooking"
        @keyup.enter="() => findByName()" />

      <!-- <button class="search-button" @click="() => findByName()">Найти</button> -->
    </div>
    <span v-if="showDetails">
      <DetailSearch />
    </span>

    <nav class="top-nav">
      <RouterLink :to="{ name: ROUTES.HOME }">Главная</RouterLink> |
      <RouterLink :to="{ name: ROUTES.ALL_RECIPES }">Все рецепты</RouterLink> |
      <RouterLink :to="{ name: ROUTES.ALL_INGREDIENTS }">Все ингредиенты</RouterLink> |
    </nav>

    <div class="app__body"> 
      <nav class="left-nav"></nav>
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

export default {
  computed: {
    ROUTES() {
      return ROUTES
    }
  },
  data() {
    return {
      search: null,
      showDetails: false
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

.app {
  width: 100%;
  height: 100vh;

  &__body {
    display: flex;
    justify-content: center;
    min-height: 750px;
    margin: 12px 35px;
  }
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ECECEC;
  margin: 0;
}

.top-nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
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

.left-nav {
  min-width: 250px;
  min-height: 300px;
  max-height: fit-content;
  background-color: white;
  border-radius: 70px;
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

  &-container {
    display: flex;
    flex-direction: column;
    border-radius: 5px 5px 0 0;
    align-items: center;
  }
}
</style>
