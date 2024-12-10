<template>
  <div class="game">
    <GameStatus />
    <GameField />
  </div>
</template>

<script>
import GameField from "../visual/GameField.vue";
import GameStatus from "../visual/GameStatusHeader.vue";

export default {
  name: 'HomePage',
  components: {
    GameField,
    GameStatus
  }
}
</script>

<style lang="less" scoped>
.game {
  width: 100%;
  height: 100vh;
  min-width: 302px;
  min-height: 438px;
  display: flex;
  flex-direction: column;
}
</style>
