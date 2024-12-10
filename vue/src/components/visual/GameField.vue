<template>
  <div class="game-field">
    <PlayerHand :cards="getBotCards" :is-bot="true"/>
    <ActiveBoard :cards="getCardsOnBoard"/>
    <PlayerHand :cards="getPlayerCards"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlayerHand from './PlayerHand.vue';
import ActiveBoard from './ActiveBoard.vue';

export default {
  name: "GameField",
  components: {
    PlayerHand,
    ActiveBoard
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getPlayerCards',
      'getBotCards',
      'getCardsOnBoard',
    ])
  },
}
</script>

<style lang="less" scoped>
.game-field {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
