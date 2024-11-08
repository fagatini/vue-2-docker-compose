<template>
  <div>
    <div @click="() => showDropdown()" class="form">Ингредиенты</div>
    <div v-if="isShowDropdown">
      <div class="dropdown">
        <div class="dropdown__search-block">
          <div class="dropdown__search-block__item">
            <label class="filter-label">Включить ингредиенты</label>
            <SearchList 
            :full-list="getIngredients"
            :exclude-list="alreadyPickedList" 
            :placeholder="'+ Ингредиент'"
            @enter="(v) => include(v)"/>

            <div v-if="formedIncludeList.length > 0">
              <span v-for="(included_ingredient, indx) in formedIncludeList" :key="indx" class="selected">
                {{ getIngredientName(included_ingredient).toLowerCase() }}
              </span>
            </div>
          </div>

          <div class="dropdown__search-block__item">
            <label class="filter-label">Исключить ингредиенты</label>
            <SearchList 
            :full-list="getIngredients"
            :exclude-list="alreadyPickedList" 
            :placeholder="'- Ингредиент'"
            @enter="(v) => exclude(v)"/>

            <div v-if="formedExcludeList.length > 0">
              <span v-for="(excluded_ingredient, indx) in formedExcludeList" :key="indx" class="selected selected--exclude">
                {{ getIngredientName(excluded_ingredient).toLowerCase() }}
              </span>
            </div>
          </div>
        </div>

        <button class="dropdown__button" @click="() => showDropdown()">Принять</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchList from '../customComponents/SearchList.vue';

export default {
  name: "HomeDetailDropdown",
  data() {
    return {
      isShowDropdown: false,
      submited: false,
      alreadyPickedList: this.includeList.concat(this.excludeList),
      formedIncludeList: this.includeList,
      formedExcludeList: this.excludeList
    }
  },
  components: {
    SearchList
  },
  props: {
    includeList: {
      type: Array,
      default: () => ([])
    },
    excludeList: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    ...mapGetters('ingredients', [
      'getIngredients',
      'getIngredientName'
    ])
  },
  methods: {
    showDropdown() {
      this.isShowDropdown = !this.isShowDropdown
    },
    include(option) {
      if (option) {
        this.formedIncludeList.push(Number(option.id))
        this.alreadyPickedList.push(Number(option.id))
      }
    },
    exclude(option) {
      if (option) {
        this.formedExcludeList.push(Number(option.id))
        this.alreadyPickedList.push(Number(option.id))
      }
    }
  }
}
</script>

<style lang="less">
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

  &__search-block {
    display: flex;
    justify-content: space-around;
  }

  &__button {
    border: 1px solid #d1d1d1;
    border-radius: 8px;
    padding: 10px 70px;
    margin-top: 15px;
  }
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

.filter-label {
  font-size: 14px;
  text-align: left;
  padding-bottom: 5px;
}

.selected {
  display: inline-block;
  border-radius: 100px;
  background-color: #ECECEC;
  padding: 10px 20px;
  font-size: 12px;
  margin: 2px;

  &--exclude {
    background-color: #ffc8d7;
  }
}
</style>