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

  calculateFlowerGrowDirections(grid) {
    const directions = [0, 0, 0, 0];
    const flowerValueList = [8, 9];

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 6) {
          if (i > 0 && flowerValueList.includes(grid[i - 1][j])) {
            directions[0]++; // up
          }
          if (i < grid.length - 1 && flowerValueList.includes(grid[i + 1][j])) {
            directions[1]++; // down
          }
          if (j > 0 && flowerValueList.includes(grid[i][j - 1])) {
            directions[2]++; // left
          }
          if (
            j < grid[i].length - 1 &&
            flowerValueList.includes(grid[i][j + 1])
          ) {
            directions[3]++; // right
          }
        }
      }
    }

    return directions;
  },

  expandFlower(grid, flowerCells) {
    const newGrid = grid.map((row) => [...row]);
    const newFlowerCells = [...flowerCells];
    const directions = this.calculateFlowerGrowDirections(grid);
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
};

export default gameLogic;
