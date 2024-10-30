<template>
  <div class="app">
    <nav>
      <RouterLink :to="{ name: ROUTES.CATALOG }"> Каталог </RouterLink> |
      <RouterLink :to="{ name: ROUTES.FAVORITES }"> Избранное </RouterLink> |
      <RouterLink :to="{ name: ROUTES.CART }"> Корзина </RouterLink> |
    </nav>
    <RouterView />
  </div> 
</template>

<script>
  import { RouteNames } from '../router/routes'

  export default {
    computed: {
      ROUTES () {
        return RouteNames
      }
    }
  }

</script>

<style lang="less">
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap");

body {
  background-color: @cBaseOne;
  margin: 0;
  padding: 0;

  * {
    box-sizing: border-box;
  }
}

h1, h2, h3, h4, h5, p {
  font-family: @ffOne;
  margin: 0;
}
</style>
