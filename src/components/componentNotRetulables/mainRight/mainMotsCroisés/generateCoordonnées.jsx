export const generateWordCoordinates = (words) => {
    const grid = [];
    let currentX = 0;
    let currentY = 0;



  
    words.forEach((word, index) => {
      let direction = index % 2 === 0 ? 'horizontal' : 'vertical'; // Alternating direction
      let wordCoords = [];
  
      for (let i = 0; i < word.length; i++) {
        if (direction === 'horizontal') {
          wordCoords.push({ lettre: word[i], x: currentX + i, y: currentY });
        } else {
          wordCoords.push({ lettre: word[i], x: currentX, y: currentY + i });
        }
      }
  
      grid.push({ name: word, cellule: wordCoords });
  
      // Update starting point for the next word
      if (direction === 'horizontal') {
        currentY += 2; // move down for next word
      } else {
        currentX += 2; // move right for next word
      }
    });
  
    return grid;
  };
//import { calculateGridSize } from "./calculGrillesLength";
// export const   generateWordCoordinates = (words) => {
//     const gridSize = calculateGridSize(words);
//     const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
  
//     words.forEach((word) => {
//       const isHorizontal = Math.random() > 0.5;
//       let x, y;
  
//       do {
//         x = Math.floor(Math.random() * gridSize);
//         y = Math.floor(Math.random() * gridSize);
//       } while (!canPlaceWord(grid, word, x, y, isHorizontal));
  
//       placeWord(grid, word, x, y, isHorizontal);
//     });
  
//     return grid;
//   };
  
//   const canPlaceWord = (grid, word, x, y, isHorizontal) => {
//     if (isHorizontal) {
//       if (x + word.length > grid.length) return false;
//       for (let i = 0; i < word.length; i++) {
//         if (grid[y][x + i] !== '') return false;
//       }
//     } else {
//       if (y + word.length > grid.length) return false;
//       for (let i = 0; i < word.length; i++) {
//         if (grid[y + i][x] !== '') return false;
//       }
//     }
//     return true;
//   };
  
//   const placeWord = (grid, word, x, y, isHorizontal) => {
//     if (isHorizontal) {
//       for (let i = 0; i < word.length; i++) {
//         grid[y][x + i] = word[i];
//       }
//     } else {
//       for (let i = 0; i < word.length; i++) {
//         grid[y + i][x] = word[i];
//       }
//     }
//   };
  
  
  