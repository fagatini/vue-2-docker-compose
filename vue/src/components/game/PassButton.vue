<template>
  <button
      :class="['pass-button', { 'pass-button__activated': this.activated }]"
      @click="() => pass()"
      :disabled="this.disabled"
  >Pass</button>
</template>

<script>
import { mapGetters } from 'vuex';
import { TurnStates } from '@/engine/constants';

export default {
  name: 'PassButton',
  computed: {
    disabled() {
      return this.getGameEngine.currentTurn !== TurnStates.PLAYER;
    },
    activated() {
      return this.getGameEngine.player.passed;
    },
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  },
  methods: {
    pass() {
      this.getGameEngine.endPlayerTurn(true);
    }
  },
}
</script>

<style scoped lang="less">
.pass-button {
  height: 64px;
  width: 80px;
  background-color: rgb(204, 204, 204);
  border: none;
  border-radius: 4px;
  margin-right: 8px;

  &__activated {
    background-color: rgb(159, 241, 148);
  }
}
</style>
