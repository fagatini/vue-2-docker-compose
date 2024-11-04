import enemyAction from "@/components/common/enemyAction";

export default {
  namespaced: true,
  state: {
    enemies: [
      {
        name: "Die Of Doom",
        image: require("../assets/enemies/DieOfDoom.png"),
        rarity: 3,
        maxHealth: 24,
        actionPatterns: [
          {
            probability: 1,
            pattern: [
              {
                type: enemyAction.ATTACK,
                values: [0],
                randomRange: 2,
              },
            ]
          },
          {
            probability: 1,
            pattern: [
              {
                type: enemyAction.DEFEND,
                values: [0],
                randomRange: 0,
              },
            ],
          },
        ], //patterns
      },
      {
        name: "",
        image: "",
        rarity: 0,
        maxHealth: 0,
        actionPatterns: [
          {
            probability: 1,
            pattern: [
              {
                type: enemyAction.ATTACK,
                values: [0],
                randomRange: 2,
              },
            ]
          },
          {
            probability: 1,
            pattern: [
              {
                type: enemyAction.DEFEND,
                values: [0],
                randomRange: 0,
              },
            ],
          },
        ], //patterns
      },
    ],
  },
  getters: {
    getEnemies: (state) => state.enemies,
    getEnemyById: (state) => (id) => state.enemies[id],
  },
};
