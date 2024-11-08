<template>
  <div>
  </div>
</template>

<script>
import { KeyboardEvents } from '../../GameEngine/GameEvents';

export default {
  name: 'KeyboardController',
  created() {
    window.addEventListener('keyup', this.handleKeyPress);
  },
  destroyed() {
    window.removeEventListener('keyup', this.handleKeyPress);
  },
  methods: {
    handleKeyPress(event) {
      console.log(event.key)
      const keyEventMap = {
        'arrowup': KeyboardEvents.MOVE_UP,
        'arrowdown': KeyboardEvents.MOVE_DOWN,
        'arrowleft': KeyboardEvents.MOVE_LEFT,
        'arrowright': KeyboardEvents.MOVE_RIGHT,
        'w': KeyboardEvents.MOVE_UP,
        's': KeyboardEvents.MOVE_DOWN,
        'a': KeyboardEvents.MOVE_LEFT,
        'd': KeyboardEvents.MOVE_RIGHT,
        ' ': KeyboardEvents.ACTION_SPACE,
        'r': KeyboardEvents.RESTART_LEVEL,
        'escape': KeyboardEvents.RETURN_TO_MENU
      };
      
      const action = keyEventMap[event.key.toLowerCase()];
      if (action) {
        this.$emit('key-action', action);
      }
    }
  }
};
</script>