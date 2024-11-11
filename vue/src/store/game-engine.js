import { getGameEngineSingleton } from '@/engine/game-engine';

export default {
  namespaced: true,
  state: {
    engine: getGameEngineSingleton(),
  },
  getters: {
    getGameEngine: (state) => state.engine,
    getPlayer: (state) => state.engine.player,
    getPlayerCards: (state) => state.engine.player.cards,
  },
}
