import { GameEngine } from "@/engine/game-engine";

export default {
  namespaced: true,
  state: {
    engine: new GameEngine(),
  },
  getters: {
    getGameEngine: (state) => state.engine,
    getPlayer: (state) => state.engine.player,
    getPlayerCards: (state) => state.engine.player.cards,
  },
}
