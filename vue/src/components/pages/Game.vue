<template>
  <div class="game-page">
    <h2>Level {{ levelNumber }}</h2>
    <GameGrid />
    <KeyboardController @key-action="handleKeyAction"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import GameGrid from "../parts/GameGrid.vue";
import KeyboardController from '../parts/KeyboardController.vue';

export default {
  name: 'GamePage',
  components: {
    GameGrid,
    KeyboardController
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
    ...mapActions('game', ['loadLevel']),

    handleKeyAction(action) {
      console.log(action);
    }
  }
};
</script>

<style scoped lang="less">
.game-page {
}
</style>
