<template>
  <div>
    <PlayerHand :number-of-cards="4" opponent/>
    <GameDesk/>
    <PlayerHand :number-of-cards="4"/>
  </div>
</template>

<script>
import GameDesk from '@/components/game/Desk.vue';
import PlayerHand from '@/components/game/PlayerHand.vue';  // Обновим импорт

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
    flipCardState() {
      this.isFaceDown = !this.isFaceDown;
    }
  }
};
</script>
