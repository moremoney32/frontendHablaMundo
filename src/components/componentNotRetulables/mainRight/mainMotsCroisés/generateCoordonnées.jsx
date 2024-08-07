 import { calculateGridSize } from "./calculGrillesLength";

// export const generateCrossword = (words) => {
//   const gridSize = calculateGridSize(words);
//   const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
//   const positions = [];

//   const canPlaceWord = (word, row, col, direction) => {
//     if (direction === 'horizontal') {
//         if (col + word.length > gridSize) return false;
//         for (let i = 0; i < word.length; i++) {
//             if (grid[row][col + i] && grid[row][col + i] !== word[i]) return false;
//         }
//     } else if (direction === 'vertical') {
//         if (row + word.length > gridSize) return false;
//         for (let i = 0; i < word.length; i++) {
//             if (grid[row + i][col] && grid[row + i][col] !== word[i]) return false;
//         }
//     }
//     return true;
// };

// const placeWord = (word, row, col, direction) => {
//     if (direction === 'horizontal') {
//         for (let i = 0; i < word.length; i++) {
//             grid[row][col + i] = word[i];
//         }
//     } else if (direction === 'vertical') {
//         for (let i = 0; i < word.length; i++) {
//             grid[row + i][col] = word[i];
//         }
//     }
//     positions.push({ word, row, col, direction });
// };

//   words.forEach(word => {
//       let placed = false;
//       for (let i = 0; i < gridSize && !placed; i++) {
//           for (let j = 0; j < gridSize && !placed; j++) {
//               const directions = ['horizontal', 'vertical'];
//               for (let direction of directions) {
//                   if (canPlaceWord(word, i, j, direction)) {
//                       placeWord(word, i, j, direction);
//                       placed = true;
//                       break;
//                   }
//               }
//           }
//       }
//   });

//   return { positions, gridSize };
// };
export const generateCrossword = (words) => {
   
    const gridSize = calculateGridSize(words);
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    const positions = [];
    const reste = []; // Tableau pour les mots trop longs
  
    // Filtrer les mots de plus de 12 caractères
    const filteredWords = words.filter(word => {
      if (word.length > 12) {
        reste.push(word); // Ajouter les mots trop longs au tableau reste
        return false; // Exclure ces mots du traitement
      }
      return true;
    });
  
    const canPlaceWord = (word, row, col, direction) => {
      if (direction === 'horizontal') {
          if (col + word.length > gridSize) return false;
          for (let i = 0; i < word.length; i++) {
              if (grid[row][col + i] && grid[row][col + i] !== word[i]) return false;
          }
      } else if (direction === 'vertical') {
          if (row + word.length > gridSize) return false;
          for (let i = 0; i < word.length; i++) {
              if (grid[row + i][col] && grid[row + i][col] !== word[i]) return false;
          }
      }
      return true;
    };
  
    const placeWord = (word, row, col, direction) => {
      if (direction === 'horizontal') {
          for (let i = 0; i < word.length; i++) {
              grid[row][col + i] = word[i];
          }
      } else if (direction === 'vertical') {
          for (let i = 0; i < word.length; i++) {
              grid[row + i][col] = word[i];
          }
      }
      positions.push({ word, row, col, direction });
    };
  
    filteredWords.forEach(word => {
        let placed = false;
        for (let i = 0; i < gridSize && !placed; i++) {
            for (let j = 0; j < gridSize && !placed; j++) {
                const directions = ['horizontal', 'vertical'];
                for (let direction of directions) {
                    if (canPlaceWord(word, i, j, direction)) {
                        placeWord(word, i, j, direction);
                        placed = true;
                        break;
                    }
                }
            }
        }
    });
  
    return { positions, gridSize, reste }; // Retourner le tableau reste avec les mots non traités
  };
  export const generateCrosswordName = (words) => {
    const names = words.map(word => word.word);
    const gridSize = calculateGridSize(names);
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    const positions = [];
    const reste = []; // Tableau pour les mots trop longs
  
    // Filtrer les mots de plus de 12 caractères
    const filteredWords = names.filter(word => {
      if (word.length > 12) {
        reste.push(word); // Ajouter les mots trop longs au tableau reste
        return false; // Exclure ces mots du traitement
      }
      return true;
    });
  
    const canPlaceWord = (word, row, col, direction) => {
      if (direction === 'horizontal') {
          if (col + word.length > gridSize) return false;
          for (let i = 0; i < word.length; i++) {
              if (grid[row][col + i] && grid[row][col + i] !== word[i]) return false;
          }
      } else if (direction === 'vertical') {
          if (row + word.length > gridSize) return false;
          for (let i = 0; i < word.length; i++) {
              if (grid[row + i][col] && grid[row + i][col] !== word[i]) return false;
          }
      }
      return true;
    };
  
    const placeWord = (word, row, col, direction) => {
      if (direction === 'horizontal') {
          for (let i = 0; i < word.length; i++) {
              grid[row][col + i] = word[i];
          }
      } else if (direction === 'vertical') {
          for (let i = 0; i < word.length; i++) {
              grid[row + i][col] = word[i];
          }
      }
      positions.push({ word, row, col, direction });
    };
  
    filteredWords.forEach(word => {
        let placed = false;
        for (let i = 0; i < gridSize && !placed; i++) {
            for (let j = 0; j < gridSize && !placed; j++) {
                const directions = ['horizontal', 'vertical'];
                for (let direction of directions) {
                    if (canPlaceWord(word, i, j, direction)) {
                        placeWord(word, i, j, direction);
                        placed = true;
                        break;
                    }
                }
            }
        }
    });
  
    return { positions, gridSize, reste }; // Retourner le tableau reste avec les mots non traités
  };
  
  
// export const generateCrossword = (names) => {
//     const gridSize = calculateGridSize(words);
//     const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
//     const positions = [];
  
//     const canPlaceWord = (word, row, col, direction) => {
//       if (direction === 'horizontal') {
//           if (col + word.length > gridSize) return false;
//           for (let i = 0; i < word.length; i++) {
//               if (grid[row][col + i] && grid[row][col + i] !== word[i]) return false;
//           }
//       } else if (direction === 'vertical') {
//           if (row + word.length > gridSize) return false;
//           for (let i = 0; i < word.length; i++) {
//               if (grid[row + i][col] && grid[row + i][col] !== word[i]) return false;
//           }
//       }
//       return true;
//   };
  
//   const placeWord = (word, row, col, direction) => {
//       if (direction === 'horizontal') {
//           for (let i = 0; i < word.length; i++) {
//               grid[row][col + i] = word[i];
//           }
//       } else if (direction === 'vertical') {
//           for (let i = 0; i < word.length; i++) {
//               grid[row + i][col] = word[i];
//           }
//       }
//       positions.push({ word, row, col, direction });
//   };
  
//   const directions = ['horizontal', 'vertical'];
//   words.sort((a, b) => b.length - a.length); // Commencez avec le mot le plus long
  
//   // Commencez par placer le mot le plus long au centre de la grille
//   let centerRow = Math.floor(gridSize / 2);
//   let centerCol = Math.floor(gridSize / 2);
//   placeWord(words[0], centerRow, centerCol - Math.floor(words[0].length / 2), 'horizontal');
  
//   words.slice(1).forEach(word => {
//       let placed = false;
//       for (let i = 0; i < gridSize && !placed; i++) {
//           for (let j = 0; j < gridSize && !placed; j++) {
//               for (let direction of directions) {
//                   if (canPlaceWord(word, i, j, direction)) {
//                       placeWord(word, i, j, direction);
//                       placed = true;
//                       break;
//                   }
//               }
//           }
//       }
//   });
  
//   // Centre le contenu de la grille pour éviter qu'il soit regroupé d'un côté
//   const minRow = Math.min(...positions.map(p => p.row));
//   const minCol = Math.min(...positions.map(p => p.col));
//   const maxRow = Math.max(...positions.map(p => p.row + (p.direction === 'vertical' ? p.word.length : 0)));
//   const maxCol = Math.max(...positions.map(p => p.col + (p.direction === 'horizontal' ? p.word.length : 0)));
//   const offsetX = Math.floor((gridSize - (maxCol - minCol)) / 2) - minCol;
//   const offsetY = Math.floor((gridSize - (maxRow - minRow)) / 2) - minRow;
  
//   positions.forEach(pos => {
//       pos.row += offsetY;
//       pos.col += offsetX;
//   });
  
//   return { positions, gridSize };
//   };
  
// export const generateCrossword = (words) => {
//     const gridSize = calculateGridSize(words);
//     const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
//     const positions = [];
  
//     const canPlaceWord = (word, row, col, direction) => {
//       if (direction === 'horizontal') {
//           if (col + word.length > gridSize) return false;
//           for (let i = 0; i < word.length; i++) {
//               if (grid[row][col + i] && grid[row][col + i] !== word[i]) return false;
//           }
//       } else if (direction === 'vertical') {
//           if (row + word.length > gridSize) return false;
//           for (let i = 0; i < word.length; i++) {
//               if (grid[row + i][col] && grid[row + i][col] !== word[i]) return false;
//           }
//       }
//       return true;
//   };
  
//   const placeWord = (word, row, col, direction) => {
//       if (direction === 'horizontal') {
//           for (let i = 0; i < word.length; i++) {
//               grid[row][col + i] = word[i];
//           }
//       } else if (direction === 'vertical') {
//           for (let i = 0; i < word.length; i++) {
//               grid[row + i][col] = word[i];
//           }
//       }
//       positions.push({ word, row, col, direction });
//   };
  
//   const directions = ['horizontal', 'vertical'];
//   words.sort((a, b) => b.length - a.length);
  
//   let centerRow = Math.floor(gridSize / 2);
//   let centerCol = Math.floor(gridSize / 2);
  
//   words.forEach(word => {
//       let placed = false;
//       let attemptCount = 0;
//       while (!placed && attemptCount < 100) {
//           const rowOffset = Math.floor(Math.random() * (gridSize / 2));
//           const colOffset = Math.floor(Math.random() * (gridSize / 2));
//           const startRow = centerRow - rowOffset;
//           const startCol = centerCol - colOffset;
          
//           for (let direction of directions) {
//               if (canPlaceWord(word, startRow, startCol, direction)) {
//                   placeWord(word, startRow, startCol, direction);
//                   placed = true;
//                   break;
//               }
//           }
//           attemptCount++;
//       }
//   });
  
//   // Centrage de la grille pour un placement équilibré des mots
//   const minRow = Math.min(...positions.map(p => p.row));
//   const minCol = Math.min(...positions.map(p => p.col));
//   const maxRow = Math.max(...positions.map(p => p.row + (p.direction === 'vertical' ? p.word.length : 0)));
//   const maxCol = Math.max(...positions.map(p => p.col + (p.direction === 'horizontal' ? p.word.length : 0)));
  
//   const offsetX = Math.floor((gridSize - (maxCol - minCol)) / 2) - minCol;
//   const offsetY = Math.floor((gridSize - (maxRow - minRow)) / 2) - minRow;
  
//   positions.forEach(pos => {
//       pos.row += offsetY;
//       pos.col += offsetX;
//   });
  
//   return { positions, gridSize };
//   };
  

  
    