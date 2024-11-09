<template>
  <div>
    <PlayerHand opponent/>
    <GameDesk ref="playerDesk"/>
    <PlayerHand @onCardDrop="(id, x, y) => this.onCardDrop(id, x, y)"/>
    <ModalContainer />
  </div>
</template>

<script>
import GameDesk from '@/components/game/GameDesk.vue';
import PlayerHand from '@/components/game/PlayerHand.vue';
import { mapGetters } from 'vuex';
import ModalContainer from '@/components/parts/ModalContainer.vue';

export default {
  components: {
    ModalContainer,
    PlayerHand,
    GameDesk,
  },
  methods: {
    onCardDrop({ index: cardIndex, x, y }) {
      const engine = this.getGameEngine;
      const {left, right, top, bottom} = this.$refs.playerDesk.$refs.lines.getBoundingClientRect();
      if (x > left && x < right && y < bottom && y > top) {
        engine.playCard(cardIndex);
      }
    }
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  }
};
</script>
