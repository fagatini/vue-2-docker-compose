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
        <div @click="() => showDropdown()" class="form">Ингредиенты</div>
        <div v-if="isShowDropdown">
          <div class="dropdown">
            <IngredientsPicker :include-list="includeList" :exclude-list="excludeList"/>
            <button class="dropdown__button" @click="() => showDropdown()">Принять</button>
          </div>
        </div>
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
import IngredientsPicker from './IngredientsPicker.vue';
import CustomSelect from '../customComponents/CustomSelect.vue'

export default {
  name: "DetailSearch",
  data() {
    return {
      isShowDropdown: false,
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
    IngredientsPicker
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
    showDropdown() {
      this.isShowDropdown = !this.isShowDropdown
    },
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

<style lang="less">
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

.filter-label {
  font-size: 14px;
  text-align: left;
  padding-bottom: 5px;
}

.form {
  position: relative;
  border-radius: 8px;
  border: 1px solid #ECECEC;
  background-color: white;
  padding: 8px 24px;
  line-height: 17px;
  font-size: 14px;
  color: #343434;
  height: fit-content;
  width: -webkit-fill-available;
  appearance: none;
  outline: none;
  text-align: left;
  cursor: pointer;

  &::after {
    position: absolute;
    content: "";
    right: 1.5rem;
    pointer-events: none;
    border-left: 0.3rem solid transparent;
    border-right: 0.3rem solid transparent;
    border-top: 0.3rem solid black;
    top: 45%;
  }
  
  &:focus {
    border: 2px solid #dfdfdf;
    border-radius: 8px;
  }
}

.dropdown {
  display: block;
  position: absolute;
  background-color: white;
  width: 500px;
  height: fit-content;
  z-index: 1;
  margin-top: 3px;
  border: 1px solid #ECECEC;
  border-radius: 8px;
  padding: 20px;

  &__button {
    border: 1px solid #d1d1d1;
    border-radius: 8px;
    padding: 10px 70px;
    margin-top: 15px;
    cursor: pointer;
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
    cursor: pointer;
  }
}
</style>
