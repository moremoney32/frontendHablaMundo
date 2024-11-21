export const resetGrid = (gridSize) => {
    return Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
  };
  