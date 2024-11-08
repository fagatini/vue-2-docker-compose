<template>
  <div class="search-by-details">
    <div class="search-by-details__details">

      <div class="search-by-details__details__detail">
        <label class="filter-label">Категория блюда</label>
        <CustomSelect :options="dishCategories" :selected-default="'Любая'" v-model="category"/>
      </div>

      <div class="search-by-details__details__detail">
        <label class="filter-label">Время приёма пищи</label>
        <CustomSelect :options="dishTime" :selected-default="'Любое'" v-model="time"/>
      </div>

      <div class="search-by-details__details__detail">
        <label class="filter-label">Национальная кухня</label>
        <CustomSelect :options="dishCuisine" :selected-default="'Любая'" v-model="cuisine"/>
      </div>

      <div class="search-by-details__details__detail">
        <HomeDetailDropdown :include-list="includeList" :exclude-list="excludeList"/>
      </div>

      <div class="search-by-details__search-button" >
        <button 
        class="color-button" 
        :class="{'color-button--active': buttonActive}"
        @click="() => findByFilters()"
        >
          Подобрать рецепты
        </button>
      </div>
    </div>
    
    
  </div>
</template>

<script>
import router from '@/router';
import { ROUTES } from '@/router/routes';
import { mapGetters } from 'vuex';
import HomeDetailDropdown from './HomeDetailDropdown.vue';
import CustomSelect from '../customComponents/CustomSelect.vue'

export default {
  name: "DetailSearch",
  data() {
    return {
      category: null,
      time: null,
      cuisine: null,
      includeList: [],
      excludeList: [],
      buttonActive: false
    }
  },
  components: {
    CustomSelect,
    HomeDetailDropdown
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    ...mapGetters('dish_categories', {
      dishCategories: 'getDishCategories'
    }),
    ...mapGetters('dish_time', {
      dishTime: 'getDishTime'
    }),
    ...mapGetters('dish_cuisine', {
      dishCuisine: 'getDishCuisine'
    }),
    filterPicked() {
      return this.category || this.time || this.cuisine || this.includeList.length || this.excludeList.length
    }
  },
  methods: {
    findByFilters() {
      if(this.buttonActive) {
        router.push({
          name: ROUTES.SEARCH_RESULT,
          query: { 
            dish_category: this.category, 
            dish_time: this.time,
            dish_cuisine: this.cuisine,
            include: this.includeList, 
            exclude: this.excludeList 
          }
        })
      }
    }
  },
  watch: {
    filterPicked(newFlag) {
      this.buttonActive = newFlag
    }
  }
}
</script>

<style lang="less" scoped>
.search-by-details {
  width: -webkit-fill-available;
  position: relative;
  margin: 0 60px;
  background-color: white;
  height: fit-content;
  padding: 30px 200px;
  border-radius: 0px 0px 70px 70px;

  &__details {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: auto;

    &__detail {
      display: flex;
      flex-direction: column;
      min-width: 200px;
      max-width: 250px;
      width: -webkit-fill-available;
      margin: 0 10px;
    }
  }
}

.color-button {
  background-color: #ECECEC;
  width: max-content;
  border: none;
  border-radius: 100px;
  padding: 15px 32px;
  font-weight: bold;
  color: #7D7D7D;
  font-size: 14px;
  margin: 0 15px;

  &--active {
    background-color: rgb(230, 205, 255);
    color: rgb(88, 63, 112);
  }
}
</style>
