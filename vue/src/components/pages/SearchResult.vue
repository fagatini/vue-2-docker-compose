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
import SearchResultByName from '../parts/SearchResultByName.vue';
import SearchResultByFilters from '../parts/SearchResultByFilters.vue';
import { mapActions } from 'vuex';

export default {
  name: 'SearchResultPage',
  components: {
    SearchResultByName,
    SearchResultByFilters
  },
  computed: {
    ...mapActions('detail_search', [
      'hideDetails'
    ]),
    isSearchByName() {
      return this.$route.query.search != null
    }
  },
  mounted() {
    this.hideDetails
  }
}
</script>

<style lang="less" scoped></style>
