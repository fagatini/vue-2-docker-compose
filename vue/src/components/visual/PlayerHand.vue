<template>
  <div class="player">
    <div class="player__cards">
      <GameCard 
        v-for="(card, i) in cards" 
        :key="i" 
        :card="card" 
        :face-down="isBot" 
      />
    </div>
  </div>

</template>

<script>
import GameCard from './GameCard.vue';

export default {
  name: "PlayerHand",
  components: {
    GameCard
  },
  props: {
    cards: {
      type: Array,
      default: () => []
    },
    isBot: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.player {
  background-color: #88D498;
  border: solid 1px #216652;
  padding: 10px 25px;
  box-sizing: border-box;

  &__cards {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 1010px;
    margin: auto;
  }
}

@media(max-width: 560px) {
  .player {
    padding: 10px 15px;

    &__cards {
      margin-bottom: 32px;
    }
  }
}
</style>
