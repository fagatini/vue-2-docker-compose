<template>
  <div class="home">
    <!-- <DetailSearch />
    <div class="content"></div> -->
  </div>
</template>

<script>
// import DetailSearch from '../parts/HomeDetailSearch.vue';
import { mapActions } from 'vuex'


export default {
  name: 'HomePage',
  // components: {
  //   DetailSearch
  // }
  mounted() {
    this.showDetails
  },
  computed: {
    ...mapActions('detail_search', [
      'showDetails'
    ])
  }

}
</script>

<style lang="less" scoped>
</style>