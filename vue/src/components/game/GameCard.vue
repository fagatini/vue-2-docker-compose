<template>
    <div
      :class="['game-card', { faceDown }, { enlarged }, { dragged: this.dragInfo.dragged }]"
      @mousedown="startDrag"
      ref="draggableCard"
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
    },
    data() {
      return {
        dragInfo: {
          x: null,
          y: null,
          deltaX: 0,
          deltaY: 0,
          dragged: false,
        }
      }
    },
    methods: {
      startDrag(event) {
        if (!this.enlarged) {
          return;
        }

        event.preventDefault();
        const parentBounds = event.currentTarget.parentNode.parentNode.getBoundingClientRect();
        const targetBounds = event.currentTarget.getBoundingClientRect();
        this.$refs.draggableCard.style.top = `${targetBounds.top - parentBounds.top}px`;
        this.$refs.draggableCard.style.left = `${targetBounds.left - parentBounds.left}px`;
        this.dragInfo.x = event.clientX;
        this.dragInfo.y = event.clientY;
        document.onmousemove = this.processDrag;
        document.onmouseup = this.stopDrag;
        this.$refs.draggableCard.style.position = 'absolute';
        this.dragInfo.dragged = true;
      },
      processDrag(event) {
        event.preventDefault();
        this.dragInfo.deltaX = this.dragInfo.x - event.clientX;
        this.dragInfo.deltaY = this.dragInfo.y - event.clientY;
        this.dragInfo.x = event.clientX;
        this.dragInfo.y = event.clientY;
        this.$refs.draggableCard.style.top = `${this.$refs.draggableCard.offsetTop - this.dragInfo.deltaY}px`;
        this.$refs.draggableCard.style.left = `${this.$refs.draggableCard.offsetLeft - this.dragInfo.deltaX}px`;
      },
      stopDrag() {
        this.$refs.draggableCard.style.position = 'relative';
        document.onmousemove = null;
        document.onmouseup = null;
        this.$refs.draggableCard.style.top = `0px`;
        this.$refs.draggableCard.style.left = `0px`;
        this.dragInfo.dragged = false;
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

  .dragged {
    z-index: 777;
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
