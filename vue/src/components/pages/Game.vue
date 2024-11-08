<template>
  <div class="game-page">
    <h2>Level {{ levelNumber }}</h2>
    <GameGrid />
    <KeyboardController @key-action="handleKeyAction" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GameGrid from "../parts/GameGrid.vue";
import KeyboardController from "../parts/KeyboardController.vue";

export default {
  name: "GamePage",
  components: {
    GameGrid,
    KeyboardController,
  },
  props: {
    levelNumber: {
      type: Number,
      required: true,
    },
    isCustom: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mounted() {
    this.loadLevel({ levelNumber: this.levelNumber, isCustom: this.isCustom });
  },
  methods: {
    ...mapActions("game", ["loadLevel", "moveFlower", "expandFlower"]),

    handleKeyAction(action) {
      switch (action) {
        case "move-up":
          this.moveFlower([-1, 0]);
          break;

        case "move-down":
          this.moveFlower([1, 0]);
          break;

        case "move-left":
          this.moveFlower([0, -1]);
          break;

        case "move-right":
          this.moveFlower([0, 1]);
          break;

        case "action-space":
          this.expandFlower();
          break;

        default:
          break;
      }
      console.log(action);
    },
  },
};
</script>

<style scoped lang="less">
.game-page {
}
</style>
