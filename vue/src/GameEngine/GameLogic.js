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
        case 3: // field
          newGrid[newRow][newCol] = 8;
          newFlowerCells[i] = { row: newRow, col: newCol };
          break;

        case 4: // Shadow
          deleteIndices.push(i);
          break;

        case 7: // Pot
          newGrid[newRow][newCol] = 9;
          newFlowerCells[i] = { row: newRow, col: newCol };
          break;

        case 8: // Flower-field
        case 9: // Flower-pot
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

    for (let i = deleteIndices.length - 1; i >= 0; i--) {
      newFlowerCells.splice(deleteIndices[i], 1);
    }

    flowerCells.forEach(({ row, col }) => {
      if (
        !newFlowerCells.some((cell) => cell.row === row && cell.col === col)
      ) {
        newGrid[row][col] = grid[row][col] === 8 ? 3 : 7;
      }
    });

    return { newGrid, newFlowerCells };
  },

  calculateFlowerGrowDirections(grid, flowerCells) {
    let directions = [0, 0, 0, 0];
    
    flowerCells.forEach(flower => {
      const {row: i, col: j} = flower;
      let sunCounter = 0
      if ((grid[i + 1][j] === 5 ? ++sunCounter : 1) && grid[i + 1][j] === 6) {
        directions[0]++;
      }
      if ((grid[i - 1][j] === 5 ? ++sunCounter : 1) && grid[i - 1][j] === 6) {
        directions[1]++;
      }
      if ((grid[i][j + 1] === 5 ? ++sunCounter: 1) && grid[i][j + 1] === 6) {
        directions[2]++;
      }
      if ((grid[i][j - 1] === 5 ? ++sunCounter : 1) && grid[i][j - 1] === 6) {
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
            case 3: // field
              newGrid[newRow][newCol] = 8;
              newFlowerCells.push({ row: newRow, col: newCol });
              expanded = true;
              break;

            case 7: // Pot
              newGrid[newRow][newCol] = 9;
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
    return !grid.some(i => i.some(j => j === 7));
  }
};

export default gameLogic;
