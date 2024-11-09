<template>
  <div class="score-container">
    <div :class="opponentDivClasses"></div>
    <div :class="playerDivClasses"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { endGameModal } from '@/mixins/modals';

export default {
  name: 'GameScore',
  mixins: [endGameModal],
  computed: {
    opponentHasPoint() {
      return !!this.getGameEngine.opponent.gameScore;
    },
    playerHasPoint() {
      return !!this.getGameEngine.player.gameScore;
    },
    opponentDivClasses() {
      return ['score-container__indicator', this.opponentHasPoint ? 'score-container__indicator__active' : ''];
    },
    playerDivClasses() {
      return ['score-container__indicator', this.playerHasPoint ? 'score-container__indicator__active' : ''];
    },
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  },
  updated() {
    const winner = this.getGameEngine.getWinner();

    if (winner) {
      this.openEndGameModal();
    }
  }
}
</script>

<style scoped lang="less">
.score-container {
  height: 64px;
  width: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  &__indicator {
    height: 16px;
    width: 48px;

    &__active {
      background-color: green;
    }
  }
}
</style>
