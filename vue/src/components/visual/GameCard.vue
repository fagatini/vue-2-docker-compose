<template>
  <div 
    class="card" 
    :class="{ 'card--face-down': faceDown, 'card--active': !faceDown && !onBoard }"
    @click="() => makeMove()"
  >
    <div 
      v-if="!faceDown" 
      class="card__content" 
      :class="{ 'card__content--small': !onBoard }"
    >
      <span class="card__content__rank--top">
        {{ card.rank }}
      </span>

      <span class="card__content__name">
        {{ card.name }}
      </span>

      <span class="card__content__rank--bottom">
        {{ card.rank }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "GameCard",
  props: {
    card: {
      type: Object,
      default: null,
      required: true
    },
    faceDown: {
      type: Boolean,
      default: false,
      required: false
    },
    onBoard: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getTurn'
    ])
  },
  methods: {
    ...mapActions('gameEngine', [
      'makePlayerMove'
    ]),
    makeMove() {
      if (!this.faceDown && !this.onBoard && this.getTurn) {        
        this.makePlayerMove(this.card.id)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  height: 100%;
  min-height: 158px;
  max-height: 420px;
  aspect-ratio: 2 / 3; // соотношение сторон 2:3
  background-color: #F3E9D2;
  border: solid 2px #999488;
  border-radius: 12px;
  box-sizing: border-box;

  &__content {
    height: inherit;
    padding: 8%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: "Neucha", cursive;
    font-size: 36px;
    color: #17211E;

    &__name {
      text-align: center;
    }

    &__rank--bottom {
      text-align: right;
    }

    &--small {
      font-size: 24px;
    }
  }

  &--active {
    margin-right: -13px;
    margin-top: 4px;

    &:hover {
      z-index: 3;
      min-height: 170px;
      max-height: 435px;
      margin-top: -8px;
      cursor: pointer;
    }
  }

  &--face-down {
    min-height: 85px;
    background-color: #DA667B;
    border: solid 2px #804651;
    border-radius: 8px;
    margin-right: 5px;
  }
}

@media(max-width: 1015px) {
  .card {
    min-height: 133px;
    max-height: 380px;
    border-radius: 8px;

    &__content {
      font-size: 28px;

      &--small {
        font-size: 20px;
      }
    }

    &--active {
      margin-right: -11px;

      &:hover {
        min-height: 130px;
        max-height: 380px;
      }
    }

    &--face-down {
      min-height: 75px;
      border-radius: 6px;
      margin-right: -9px;
    }
  }
}

@media(max-width: 560px) {
  .card {
    min-height: 96px;
    max-height: 210px;

    &__content {
      font-size: 20px;

      &--small {
        font-size: 15px;
      }
    }

    &--active {
      margin-bottom: -32px;

      &:hover {
        min-height: 100px;
        max-height: 350px;
      }
    }

    &--face-down {
      min-height: 52px;
      margin-right: -11px;
      margin-bottom: -32px;
    }
  }
}
</style>
