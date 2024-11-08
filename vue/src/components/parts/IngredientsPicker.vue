<template>
  <div class="search-block">
    <div class="search-block__item">
      <label class="filter-label">Включить ингредиенты</label>
      <SearchList 
      :full-list="getIngredients"
      :exclude-list="alreadyPickedList" 
      :placeholder="'+ Ингредиент'"
      @enter="(v) => include(v)"/>

      <div v-if="formedIncludeList.length > 0">
        <span v-for="(included_ingredient, indx) in formedIncludeList" 
          :key="indx" 
          class="selected" 
          @click="() => popFromIncluded(included_ingredient, indx)"
        >
          {{ getIngredientName(included_ingredient).toLowerCase() }}
        </span>
      </div>
    </div>

    <div class="search-block__item">
      <label class="filter-label">Исключить ингредиенты</label>
      <SearchList 
      :full-list="getIngredients"
      :exclude-list="alreadyPickedList" 
      :placeholder="'- Ингредиент'"
      @enter="(v) => exclude(v)"/>

      <div v-if="formedExcludeList.length > 0">
        <span v-for="(excluded_ingredient, indx) in formedExcludeList" 
          :key="indx" 
          class="selected selected--exclude" 
          @click="() => popFromExcluded(excluded_ingredient, indx)"
        >
          {{ getIngredientName(excluded_ingredient).toLowerCase() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchList from '../customComponents/SearchList.vue';

export default {
  name: "IngredientsPicker",
  data() {
    return {
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
    },
    popFromIncluded(ingredient, indx) {
      this.formedIncludeList.splice(indx, 1)
      this.alreadyPickedList = this.alreadyPickedList.filter(el => el != ingredient)
    },
    popFromExcluded(ingredient, indx) {
      this.formedExcludeList.splice(indx, 1)
      this.alreadyPickedList = this.alreadyPickedList.filter(el => el != ingredient)
    }
  }
}
</script>

<style lang="less">
.search-block {
    display: flex;
    justify-content: space-around;
}

.selected {
  display: inline-block;
  border-radius: 100px;
  background-color: #ECECEC;
  padding: 10px 20px;
  font-size: 12px;
  margin: 2px;
  cursor: pointer;

  &--exclude {
    background-color: #ffc8d7;
  }
}
</style>
