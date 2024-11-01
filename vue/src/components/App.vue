<template>
  <div>
    <PlayerHand :number-of-cards="4" opponent/>
    <GameDesk ref="playerDesk"/>
    <PlayerHand :on-card-drop="(id, x, y) => this.onCardDrop(id, x, y)"/>
  </div>
</template>

<script>
import GameDesk from '@/components/game/GameDesk.vue';
import PlayerHand from '@/components/game/PlayerHand.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    PlayerHand,
    GameDesk,
  },
  data() {
    return {
      cardStrength: 5,
      cardType: 'Warrior',
      isHighlighted: false,
      isFaceDown: false
    };
  },
  methods: {
    onCardDrop(cardIndex, x, y) {
      const player = this.getPlayer;
      const {left, right, top, bottom} = this.$refs.playerDesk.$refs.lines.getBoundingClientRect();
      if (x > left && x < right && y < bottom && y > top) {
        player.playCard(cardIndex);
      }
    }
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getPlayer',
    ]),
  }
};
</script>
