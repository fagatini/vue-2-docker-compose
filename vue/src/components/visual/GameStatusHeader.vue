<template>
  <div class="status-header">
    <div class="status-header__content">
      <div class="status-header__content__group">
        <GameScores class="status-header__content__group__scores" />
        <h1 class="status-header__content__group__game-status">
          {{ getTurn == statePlayer ? 'Ваш ход' : 'Ход бота' }}
        </h1>
      </div>
      <svg 
        class="status-header__content__restart-icon" 
        viewBox="0 0 32 32" 
        @click="() => restartGame()"
      >
        <path
          d="M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z">
        </path>
      </svg>
    </div>
  </div>
</template>

<script>
import { TurnStates } from '@/core/constants';
import GameScores from './GameScores.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "GameStatus",
  components: {
    GameScores
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getTurn',
    ]),
    statePlayer() {
      return TurnStates.PLAYER
    }
  },
  methods: {
    ...mapActions('gameEngine', [
      'startNewGame'
    ]),
    restartGame() {
      this.startNewGame()
      this.show = false
    }
  }
}

</script>

<style lang="less" scoped>
.status-header {
  background-color: #1A936F;
  border: solid 1px #216652;
  padding: 15px 15px;

  &__content {
    max-width: 1010px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    justify-items: center;
    margin: auto;

    &__group {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;

      &__scores {
        justify-self: left;
        font-size: 32px;
      }

      &__game-status {
        text-align: center;
        font-size: 40px;
        white-space: nowrap;
      }
    }

    &__restart-icon {
      width: 32px;
      height: 32px;
      justify-self: right;
      fill: #EFF1F4;
      transform: scale(-1, 1);
      cursor: pointer;
    }
  }
}

@media(max-width: 800px) {
  .status-header {
    &__content {
      max-width: 800px;
      display: block;
      position: relative;

      &__group {
        display: flex;
        flex-direction: column-reverse;
        text-align: center;
      }

      &__restart-icon {
        position: absolute;
        top: 12px;
        right: 12px;
      }
    }
  }
}

@media(max-width: 560px) {
  .status-header {
    &__content {
      max-width: 560px;

      &__group {
        &__scores {
          font-size: 24px;
        }

        &__game-status {
          font-size: 28px;
        }
      }

      &__restart-icon {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
