<template>
  <div>
  </div>
</template>

<script>
import { KeyboardEvents } from '../../GameEngine/GameEvents';

export default {
  name: 'KeyboardController',
  mounted() {
    window.addEventListener('keyup', this.handleKeyPress);
  },
  beforeUnmount() {
    window.removeEventListener('keyup', this.handleKeyPress);
  },
  methods: {
    handleKeyPress(event) {
      const keyEventMap = {
        'arrowup': KeyboardEvents.MOVE_UP,
        'arrowdown': KeyboardEvents.MOVE_DOWN,
        'arrowleft': KeyboardEvents.MOVE_LEFT,
        'arrowright': KeyboardEvents.MOVE_RIGHT,
        'w': KeyboardEvents.MOVE_UP,
        's': KeyboardEvents.MOVE_DOWN,
        'a': KeyboardEvents.MOVE_LEFT,
        'd': KeyboardEvents.MOVE_RIGHT,
        ' ': KeyboardEvents.ACTION_SPACE
      };
      
      const action = keyEventMap[event.key.toLowerCase()];
      if (action) {
        this.$emit('key-action', action);
      }
    }
  }
};
</script>