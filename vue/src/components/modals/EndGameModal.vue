<template>
  <ModalComponent>
    <div>
      {{ this.getText }}
    </div>
    <button @click="() => restart">
      Close
    </button>
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
      // TODO: restart game
    }
  },
  computed: {
    getWinner() {
      return this.getGameEngine.getWinner();
    },
    getText() {
      if (this.getWinner() === Winners.PLAYER) {
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

</style>
