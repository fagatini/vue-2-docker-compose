<template>
  <div class="pagination-container">
    <button
      @click="() => setFirstPage()"
      class="pagination-container__first-button"
    >
      В начало 
    </button>

    <button v-for="page in paginatedPages" :key="page"
      @click="() => changePage(page)"
      class="pagination-container__page-button"
      :class="{active: currentPage === page }"
    >
      {{ page }}
    </button>

    <button
      @click="() => setLastPage()"
      class="pagination-container__last-button"
    >
      В конец
    </button>
  </div>
</template>


<script>
import { ROUTES } from '@/router/routes';
import { mapGetters } from 'vuex';

export default {
  name: "PaginationComponent",
  props: {
    items: Array,
    maxVisiblePages: Number,
    maxItemsPerPage: Number
  },
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    maxPossiblePages() {
      return Math.ceil(this.items.length / this.maxItemsPerPage)
    },
    paginatedPages() {
      const pageNumbers = []
      const pageDifferenceBySides = Math.floor(this.maxVisiblePages / 2)
      const firstVisiblePage = this.currentPage <= pageDifferenceBySides ? 1 : this.currentPage - pageDifferenceBySides
      const lastVisiblePage = this.currentPage <= pageDifferenceBySides 
        ? this.maxVisiblePages 
        : this.currentPage + pageDifferenceBySides

      for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
        if(i > 0 && i <= this.maxPossiblePages){
          pageNumbers.push(i)
        }
      }

      return pageNumbers
    },
    ...mapGetters('ingredients', [
      'getIngredientById'
    ])
  },
  methods: {
    changePage(page) {
      this.currentPage = page
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      this.$emit('changePage',page)
    },
    setFirstPage() {
      this.currentPage = 1
      this.$emit('changePage',1)
    },
    setLastPage() {
      this.currentPage = this.maxPossiblePages
      this.$emit('changePage',this.maxPossiblePages)
    }
  },
}
</script>

<style lang="less" scoped>
.pagination-container {
  margin-top: 30px;
  align-self: center;
  
  &__first-button,
  &__last-button {
    border: none;
    background: none;
    font-size: 15px;
    font-family: inherit;
    font-weight: bold;
    border-radius: 100px;
    padding: 8px 20px;
    color: inherit;
    cursor: pointer;

    &:hover {
      background-color: #F5F5F5;
    }
  }

  &__page-button {
    align-items: center;
    border: none;
    border-radius: 100px;
    background: none;
    font-size: 16px;
    width: 36px;
    height: 36px;
    margin: 0 2px;
    color: inherit;
    cursor: pointer;

    &:hover {
      background-color: #F5F5F5;
    }

    &.active {
      background-color: #ECECEC;
    }
  }
}
</style>
