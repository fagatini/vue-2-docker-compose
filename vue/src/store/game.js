import Vue from "vue";
import gameStorage from "@/GameEngine/gameStorage";
import mapValidator from "@/GameEngine/GridValidationFunctions";
import gameLogic from "@/GameEngine/GameLogic";

export default {
  namespaced: true,
  state: {
    grid: [],
    flowerCells: [],
    selectedGrid: [],
    cellTypes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    currentLevel: null,
    isCustomLevel: false,
    validationResults: {
      flower: "",
      wall: "",
      ground: "",
    },
    hasLost: false,
    hasWon: false
  },
  getters: {
    getGrid: (state) => state.grid,
    gridRows: (state) => state.grid.length,
    gridColumns: (state) => state.grid[0].length,
    selectedGrid: (state) => state.selectedGrid,
    cellTypes: (state) => state.cellTypes,
    currentLevel: (state) => state.currentLevel,
    isCustomLevel: (state) => state.isCustomLevel,
    getValidationResults: (state) => state.validationResults,
    getHasLost: (state) => state.hasLost,
    getHasWon: (state) => state.hasWon
  },
  mutations: {
    setGrid(state, grid) {
      state.grid = grid;
    },
    setFlowerCells(state, flowerCells) {
      state.flowerCells = flowerCells;
    },
    setSelectedGrid(state, selectedGrid) {
      state.selectedGrid = selectedGrid;
    },
    setCurrentLevel(state, { levelNumber, isCustom }) {
      state.currentLevel = levelNumber;
      state.isCustomLevel = isCustom;
    },
    updateCell(state, { row, col, cellType }) {
      state.grid[row][col] = cellType;
    },
    toggleSelectedCell(state, { row, col }) {
      Vue.set(state.selectedGrid[row], col, !state.selectedGrid[row][col]);
    },
    setGridSize(state, { rows, columns }) {
      const defaultCellType = 3;
      if (state.grid.length < rows) {
        for (let i = state.grid.length; i < rows; i++) {
          state.grid.push(new Array(columns).fill(defaultCellType));
          state.selectedGrid.push(new Array(columns).fill(false));
        }
      } else if (state.grid.length > rows) {
        state.grid = state.grid.slice(0, rows);
        state.selectedGrid = state.selectedGrid.slice(0, rows);
      }

      state.grid = state.grid.map((row) => {
        if (row.length < columns) {
          return [
            ...row,
            ...new Array(columns - row.length).fill(defaultCellType),
          ];
        } else if (row.length > columns) {
          return row.slice(0, columns);
        }
        return row;
      });

      state.selectedGrid = state.selectedGrid.map((row) => {
        if (row.length < columns) {
          return [...row, ...new Array(columns - row.length).fill(false)];
        } else if (row.length > columns) {
          return row.slice(0, columns);
        }
        return row;
      });
    },
    win(state, hasWon) {
      state.hasWon = hasWon;
    },
    lose(state, hasLost) {
      state.hasLost = hasLost;
    },
    reset(state) {
      state.hasLost = false;
      state.hasWon = false;
      state.grid = []
      state.flowerCells = []
      state.selectedGrid = []
      state.currentLevel = null;
    }
  },
  actions: {
    loadLevel({ state, commit }, payload) {
      commit("reset");
      const { levelNumber, isCustom } = payload;
      const levelData = gameStorage.loadLevel(levelNumber, isCustom);
      if (levelData) {
        commit("setGrid", levelData);
        validateGrid(state);
        commit("setFlowerCells", determineFlowerCells(state.grid));
        commit(
          "setSelectedGrid",
          levelData.map((row) => row.map(() => false))
        );
        commit("setCurrentLevel", { levelNumber, isCustom });
      } else {
        console.error("Level not found");
      }
    },
    saveCustomLevel({ state }, levelNumber) {
      gameStorage.saveCustomLevel(state.grid, levelNumber);
    },
    saveLevelToFile({ state }, fileName = "level.json") {
      gameStorage.saveLevelToFile(state.grid, fileName);
    },
    loadLevelFromFile({ commit }, file) {
      gameStorage
        .loadLevelFromFile(file)
        .then((levelData) => {
          commit("setGrid", levelData);
          commit(
            "setSelectedGrid",
            levelData.map((row) => row.map(() => false))
          );
          commit("setCurrentLevel", {
            levelNumber: gameStorage.getNumberOfLevels(true),
            isCustom: true,
          });
        })
        .catch((error) => console.error(error));
    },
    updateCell({ state, commit }, payload) {
      commit("updateCell", payload);
      validateGrid(state);
    },
    toggleSelectedCell({ commit }, payload) {
      commit("toggleSelectedCell", payload);
    },
    setGridSize({ state, commit }, payload) {
      commit("setGridSize", payload);
      validateGrid(state);
    },
    moveFlower({ state, commit }, direction) {
      const result = gameLogic.moveFlower(
        state.grid,
        state.flowerCells,
        direction
      );

      if (result) {
        commit("setGrid", result.newGrid);
        commit("setFlowerCells", result.newFlowerCells);
      }
    },
    expandFlower({ state, commit }) {
      const result = gameLogic.expandFlower(state.grid, state.flowerCells);

      if (result) {
        commit("setGrid", result.newGrid);
        commit("setFlowerCells", result.newFlowerCells);
      }
    },
    win({ commit }) {
      commit("win", true);
    },
    lose({ commit }) {
      commit("lose", true);
    }
  },
};

const validateGrid = (state) => {
  const flowerValidation = mapValidator.validateFlower(state.grid);
  const wallValidation = mapValidator.validateWall(state.grid);
  const groundValidation = mapValidator.validatePot(state.grid);
  state.validationResults = {
    flower: flowerValidation,
    wall: wallValidation,
    ground: groundValidation,
  };
};

const determineFlowerCells = (grid) => {
  const flowerCells = [];
  const flowerValueList = [8, 9];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (flowerValueList.includes(grid[row][col])) {
        flowerCells.push({ row, col });
      }
    }
  }

  return flowerCells;
};
