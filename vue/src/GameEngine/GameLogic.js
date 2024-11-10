import { CellTypes } from "./CellTypes";

const gameLogic = {
  moveFlower(grid, flowerCells, direction) {
    const newGrid = grid.map((row) => [...row]);
    const newFlowerCells = [...flowerCells];
    const deleteIndices = [];

    let moveSuccessful = true;

    for (let i = 0; i < flowerCells.length; i++) {
      const { row, col } = flowerCells[i];
      const newRow = row + direction[0];
      const newCol = col + direction[1];

      if (
        newRow < 0 ||
        newRow >= grid.length ||
        newCol < 0 ||
        newCol >= grid[0].length
      ) {
        moveSuccessful = false;
        break;
      }

      const cellType = grid[newRow][newCol];

      switch (cellType) {
        case CellTypes.FIELD:
          newGrid[newRow][newCol] = CellTypes.FLOWER_FIELD;
          newFlowerCells[i] = { row: newRow, col: newCol };
          break;

        case CellTypes.SHADOW:
          deleteIndices.push(i);
          break;

        case CellTypes.POT:
          newGrid[newRow][newCol] = CellTypes.FLOWER_POT;
          newFlowerCells[i] = { row: newRow, col: newCol };
          break;

        case CellTypes.FLOWER_FIELD:
        case CellTypes.FLOWER_POT:
          newFlowerCells[i] = { row: newRow, col: newCol };
          break;

        default:
          moveSuccessful = false;
          break;
      }
    }

    if (!moveSuccessful) {
      return null;
    }

    deleteIndices.reverse().forEach(index => newFlowerCells.splice(index, 1));

    flowerCells.forEach(({ row, col }) => {
      if (
        !newFlowerCells.some((cell) => cell.row === row && cell.col === col)
      ) {
        newGrid[row][col] = grid[row][col] === CellTypes.FLOWER_FIELD ? CellTypes.FIELD : CellTypes.POT;
      }
    });

    return { newGrid, newFlowerCells };
  },

  calculateFlowerGrowDirections(grid, flowerCells) {
    let directions = [0, 0, 0, 0];
    
    flowerCells.forEach(flower => {
      const {row: i, col: j} = flower;
      let sunCounter = 0
      if ((grid[i + 1][j] === CellTypes.SUN ? ++sunCounter : 1) && grid[i + 1][j] === CellTypes.WATER) {
        directions[0]++;
      }
      if ((grid[i - 1][j] === CellTypes.SUN ? ++sunCounter : 1) && grid[i - 1][j] === CellTypes.WATER) {
        directions[1]++;
      }
      if ((grid[i][j + 1] === CellTypes.SUN ? ++sunCounter: 1) && grid[i][j + 1] === CellTypes.WATER) {
        directions[2]++;
      }
      if ((grid[i][j - 1] === CellTypes.SUN ? ++sunCounter : 1) && grid[i][j - 1] === CellTypes.WATER) {
        directions[3]++;
      }
      directions = directions.map(i => i + sunCounter);
    });

    return directions;
  },

  expandFlower(grid, flowerCells) {
    const newGrid = grid.map((row) => [...row]);
    const newFlowerCells = [...flowerCells];
    const directions = this.calculateFlowerGrowDirections(grid, flowerCells);
    let expanded = false;

    const directionOffsets = [
      { di: -1, dj: 0, max: directions[0] }, // up
      { di: 1, dj: 0, max: directions[1] }, // down
      { di: 0, dj: -1, max: directions[2] }, // left
      { di: 0, dj: 1, max: directions[3] }, // right
    ];

    for (const { row, col } of flowerCells) {
      for (const { di, dj, max } of directionOffsets) {
        for (let step = 1; step <= max; step++) {
          const newRow = row + di * step;
          const newCol = col + dj * step;

          if (
            newRow < 0 ||
            newRow >= grid.length ||
            newCol < 0 ||
            newCol >= grid[0].length
          ) {
            break;
          }

          const cellType = grid[newRow][newCol];

          switch (cellType) {
            case CellTypes.FIELD:
              newGrid[newRow][newCol] = CellTypes.FLOWER_FIELD;
              newFlowerCells.push({ row: newRow, col: newCol });
              expanded = true;
              break;

            case CellTypes.POT:
              newGrid[newRow][newCol] = CellTypes.FLOWER_POT;
              newFlowerCells.push({ row: newRow, col: newCol });
              expanded = true;
              break;

            default:
              break;
          }
        }
      }
    }

    return expanded ? { newGrid, newFlowerCells } : null;
  },

  hasWon(grid) {
    return !grid.some(i => i.some(j => j === CellTypes.POT));
  }
};

export default gameLogic;
