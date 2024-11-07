<template>
  <div class="search-result">

    <div v-if="isSearchByName">
      <SearchResultByName/>
    </div>

    <div v-else>
      <SearchResultByFilters/>
    </div>
  </div>
</template>

<script>
import SearchResultByName from '../parts/SearchResultByName.vue'
import SearchResultByFilters from '../parts/SearchResultByFilters.vue';

export default {
  name: 'SearchResultPage',
  components: {
    SearchResultByName,
    SearchResultByFilters
  },
  computed: {
    isSearchByName() {
      return this.$route.query.search != null
    }
  }
}
</script>

<style lang="less" scoped></style>
