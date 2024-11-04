import enemyStore from "./enemy";
import { selectRandomPattern } from "@/components/common/helpers";

export default {
  namespaced: true,
  state: {
    player: {
      maxHealth: 60,
      health: 60,
      status: [],
    },
    currentEnemies: [],
  },
  getters: {
    getPlayer: (state) => state.player,
    getEnemies: (state) => state.currentEnemies,
  },
  mutations: {
    addEnemyById: (state, payload) => {
      const base = enemyStore.state.enemies[payload];
      state.currentEnemies = [
        ...state.currentEnemies,
          {
            base: base,
            health: base.maxHealth,
            status: [],
            currentPattern: selectRandomPattern(base.actionPatterns),
          },
      ];
    },

    clearEnemies: (state) => {
      state.currentEnemies = [];
    },

    applyEnemyDamage: (state, payload) => {
      const target = state.currentEnemies.find((enemy) => enemy == payload);
      target.health -= 12;
    }
  },
  actions: {
    addEnemyById: ({ commit }, payload) => {
      commit("addEnemyById", payload);
    },
    clearEnemies: ({ commit }) => {
      commit("clearEnemies");
    },
    applyEnemyDamage: ({ commit }, payload) => {
      commit("applyEnemyDamage", payload);
    },
  },
};
