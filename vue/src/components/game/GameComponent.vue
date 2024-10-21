<template>
  <div class="game-container">
    <EnemyHand :number-of-cards="10" />
    <PlayerHand :number-of-cards="10" />
  </div>
</template>

<script>
import PlayerHand from './PlayerHand.vue';
import EnemyHand from './EnemyHand.vue';

export default {
  name: 'GameComponent',
  components: {
    PlayerHand,
    EnemyHand
  }
};
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
