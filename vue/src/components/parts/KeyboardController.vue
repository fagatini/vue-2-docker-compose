<template>
<div class="keyboard-controller">
</div>
</template>

<script>
import { KeyboardEvents } from "../../GameEngine/GameEvents";
import Hammer from "hammerjs";

export default {
  name: "KeyboardController",
  created() {
    window.addEventListener("keyup", this.handleKeyPress);
  },
  mounted() {
  const element = this.$el;
  this.hammer = new Hammer(element);
  this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

  this.hammer.on("swipeup", () => this.emitAction(KeyboardEvents.MOVE_UP));
  this.hammer.on("swipedown", () => this.emitAction(KeyboardEvents.MOVE_DOWN));
  this.hammer.on("swipeleft", () => this.emitAction(KeyboardEvents.MOVE_LEFT));
  this.hammer.on("swiperight", () => this.emitAction(KeyboardEvents.MOVE_RIGHT));

  this.hammer.on("tap", () => this.emitAction(KeyboardEvents.ACTION_SPACE));
  this.hammer.on("doubletap", () => this.emitAction(KeyboardEvents.RESTART_LEVEL));
  this.hammer.on("press", () => this.emitAction(KeyboardEvents.RETURN_TO_MENU));
},
  beforeDestroy() {
    window.removeEventListener("keyup", this.handleKeyPress);

    if (this.hammer) {
      this.hammer.off("swipeup swipedown swipeleft swiperight tap doubletap press");
      this.hammer.destroy();
    }
  },
  methods: {
    handleKeyPress(event) {
      const keyEventMap = {
        arrowup: KeyboardEvents.MOVE_UP,
        arrowdown: KeyboardEvents.MOVE_DOWN,
        arrowleft: KeyboardEvents.MOVE_LEFT,
        arrowright: KeyboardEvents.MOVE_RIGHT,
        w: KeyboardEvents.MOVE_UP,
        s: KeyboardEvents.MOVE_DOWN,
        a: KeyboardEvents.MOVE_LEFT,
        d: KeyboardEvents.MOVE_RIGHT,
        " ": KeyboardEvents.ACTION_SPACE,
        r: KeyboardEvents.RESTART_LEVEL,
        escape: KeyboardEvents.RETURN_TO_MENU,
      };

      const action = keyEventMap[event.key.toLowerCase()];
      if (action) {
        this.emitAction(action);
      }
    },
    emitAction(action) {
      this.$emit("key-action", action);
    },
  },
};
</script>

<style scoped lang="less">
.keyboard-controller {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>