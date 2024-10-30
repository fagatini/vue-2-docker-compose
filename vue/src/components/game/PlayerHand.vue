<template>
  <div class="hand-container">
    <div :class="this.opponent ? 'hand-opponent': 'hand-player'">
      <div
          class="hand__card"
          v-for="(card, index) in this.cards"
          :key="index"
          :style="index === 1 ? {'margin-left': '0'} : {}"
      >
        <GameCard
            :type=card.type
            :score=card.score
            :key="index"
            :face-down="opponent"
            :enlarged="!opponent"
            :index="index"
            :on-drop="onCardDrop"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from '@/components/game/GameCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'PlayerHand',
  components: { GameCard },
  props: {
    opponent: {
      type: Boolean,
      required: false,
      default: false,
    },
    onCardDrop: {
      type: Function,
      default: null,
    }
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
    cards() {
      return this.opponent ?
          this.getGameEngine.opponent.cards :
          this.getGameEngine.player.cards
    }
  }
};
</script>

<style scoped lang="less">
.hand {
  display: flex;
  position: absolute;
  z-index: 666;
  width: 70vw;
  margin: auto;
  justify-content: center;

  &__card {
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: black;
  }

  &-player:extend(.hand) {
    bottom: -20px;
    height: 20vh;
  }

  &-opponent:extend(.hand) {
    top: -25px;
    height: 15vh;
  }
}

.hand-container {
  display: flex;
  justify-content: center;
}
</style>
