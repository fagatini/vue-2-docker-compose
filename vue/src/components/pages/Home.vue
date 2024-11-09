<template>
  <div class="home">
    <div class="recommendation-section">
      <div class="recommendation-section__title">
        {{ TAGS.KIDS }}
      </div>
      <div class="recommendation-section__content">
        <RecommendationComponent 
        v-for="recipe in recipesByTags(TAGS.KIDS)" 
        :key="recipe.id"
        :recipe="recipe"
        />
      </div>
    </div>
    <div class="recommendation-section">
      <div class="recommendation-section__title">
        {{ TAGS.DAILY_RECIPE }}
      </div>
      <div class="recommendation-section__content">
        <RecommendationComponent 
        v-for="recipe in recipesByTags(TAGS.DAILY_RECIPE)" 
        :key="recipe.id"
        :recipe="recipe"
        />
      </div>
    </div>
  </div>
</template>

<script>

import RecommendationComponent from '../parts/RecommendationComponent.vue';
import { mapActions, mapGetters } from 'vuex';
import { TAGS } from '../../core/tags';

export default {
  name: 'HomePage',
  components: {
    RecommendationComponent
  },
  mounted() {
    this.showDetails
  },
  computed: {
    TAGS() {
      return TAGS
    },
    ...mapGetters('recipes', {
      recipes: 'getRecipesByTags'
    }),
    ...mapActions('detail_search', [
      'showDetails'
    ])
  },
  methods: {
    recipesByTags(tags) {
      return this.recipes(tags);
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
}

.recommendation-section {
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  &__title {
    font-size: 24px;
    font-weight: bold;
  }

  &__content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 15px 10px;
  }
}
</style>
