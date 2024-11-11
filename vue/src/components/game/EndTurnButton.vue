<template>
  <button class="end-button" @click="endTurn" :disabled="disabled">End Turn</button>
</template>

<script>
import { mapGetters } from 'vuex';
import { TurnStates } from '@/engine/constants';

export default {
  name: 'EndTurnButton',
  computed: {
    disabled() {
      return this.getGameEngine.currentTurn !== TurnStates.PLAYER;
    },
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  },
  methods: {
    endTurn() {
      this.getGameEngine.endPlayerTurn();
    }
  },
}
</script>

<style scoped lang="less">
.end-button {
  height: 64px;
  width: 80px;
  background-color: rgb(204, 204, 204);
  border: none;
  border-radius: 4px;
}
</style>
