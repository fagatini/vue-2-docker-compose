<template>
  <div class="hand-container">
    <div :class="this.opponent ? 'hand-opponent': 'hand-player'">
      <div class="hand__card" v-for="index in numberOfCards" :key="index" :style="index === 1 ? {'margin-left': '0'} : {}">
        <GameCard type="xd" :score=index :key="index" :face-down="opponent" :enlarged="!opponent"/>
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from '@/components/game/GameCard.vue';

export default {
  name: 'PlayerHand',
  components: { GameCard },
  props: {
    numberOfCards: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 10
    },
    opponent: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
};
</script>

<style scoped lang="less">
.hand {
  display: flex;
  position: absolute;
  z-index: 666;
  width: 40vw;
  margin: auto;
  justify-content: space-between;

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
