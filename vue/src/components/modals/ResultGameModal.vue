<template>
    <ModalComponent>
      <div class="result-modal">
        <h2 class="result-text">
          Результат игры
        </h2>
        <p class="winner">
          {{ getResultMessage }}
        </p>
        <button class="restart-button" @click="() => restartGame()">
          Начать заново
        </button>
      </div>
    </ModalComponent>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { WinnerStates } from "@/core/constants";
import ModalComponent from "@/components/parts/Modal";

export default {
  name: "ResultGameModal",
  components: {
    ModalComponent,
  },
  props: {
    params: Object
  },

  computed: {
    ...mapGetters('gameEngine', [
      'getWinner'
    ]),
    getResultMessage() {
      let resultObj = {}
      resultObj[WinnerStates.PLAYER_WINS] = 'Вы выиграли!';
      resultObj[WinnerStates.BOT_WINS] = 'Противник выиграл!';
      resultObj[WinnerStates.DRAW] = 'Ничья!';

      return resultObj[this.getWinner];
    },
  },

  methods: {
    ...mapActions('gameEngine', [
      'startNewGame'
    ]),
    
    restartGame() {
      this.startNewGame();
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.result-modal {
  background-color: #c6dabf;
  border: solid 2px #216652;
  border-radius: 8px;
  padding: 15px;
  min-width: 420px;
  max-width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
}

.result-text {
  font-weight: 400;
  font-style: normal;
  color: #000000;
  margin: 0;
}

.winner {
  font-family: "Neucha", cursive;
}

.restart-button {
  padding: 10px 15px;
  background-color: #f3e9d2;
  border: solid 2px #999488;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  font-family: "Neucha", cursive;
}
</style>
