<template>
  <div class="game-page">
    <StartScreen>
      <h2>Level {{ levelNumber }}</h2>
      <GameGrid />
    </StartScreen>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import GameGrid from "../parts/GameGrid.vue";
import StartScreen from "../parts/PageBackground.vue";

export default {
  name: 'GamePage',
  components: {
    GameGrid,
    StartScreen,
  },
  props: {
    levelNumber: {
      type: Number,
      required: true,
    },
    isCustom: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  mounted() {
    this.loadLevel({levelNumber: this.levelNumber, isCustom: this.isCustom});
  },
  methods: {
    ...mapActions('game', ['loadLevel'])
  }
};
</script>

<style scoped lang="less">
.game-page {
}
</style>
