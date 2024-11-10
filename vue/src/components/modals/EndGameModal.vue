<template>
  <ModalComponent>
    <div class="endgame-container">
      <h1>
        {{ this.getText }}
      </h1>
      <button class="restart-button" @click="() => restart()">
        Restart
      </button>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/parts/Modal";
import { mapGetters } from 'vuex';
import { Winners } from '@/engine/constants';

export default {
  name: "EndGameModal",
  components: {
    ModalComponent
  },
  props: {
    params: Object
  },
  methods: {
    restart () {
      this.$emit('close');
      return this.getGameEngine.restart();
    }
  },
  computed: {
    winner() {
      return this.getGameEngine.getWinner();
    },
    getText() {
      if (this.winner === Winners.PLAYER) {
        return 'You won';
      } else {
        return 'You lost';
      }
    },
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  }
}
</script>

<style scoped>
.endgame-container {
  height: 60vh;
  width: 60vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.restart-button {
  height: 64px;
  width: 128px;
  border: none;
  border-radius: 4px;
  background-color: burlywood;

  &:hover {
    background-color: bisque;
  }
}
</style>
