<template>
    <div
      :class="['game-card', { faceDown }, { enlarged }]"
    >
      <div v-if="!faceDown">
        <h3>{{ type }}</h3>
        <p>Score: {{ score }}</p>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'GameCard',
    props: {
      score: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      faceDown: {
        type: Boolean,
        default: false
      },
      enlarged: {
        type: Boolean,
        default: false,
      }
    }
  };
</script>

<style scoped lang="less">
  .game-card {
    cursor: move;
    user-select: none;
    width: 100px;
    height: 150px;
    border: 1px solid black;
    text-align: center;
    transition: transform 0.5s, background-color 0.3s, box-shadow 0.3s;

    &.enlarged {
      width: 150px;
      height: 225px;
    }
  }

  .game-card:hover {
    border-color: gold;
    background-color: yellow;
    box-shadow: 0 0 15px 5px rgba(255, 223, 0, 0.8);
  }

  .game-card.faceDown {
    background-color: gray;
  }
</style>
