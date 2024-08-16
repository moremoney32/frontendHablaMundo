 import { calculateGridSize } from "./calculGrillesLength";
export const generateCrossword = (words) => {
   
    const gridSize = calculateGridSize(words);
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    const positions = [];
    const reste = []; // Tableau pour les mots trop longs
  
    // Filtrer les mots de plus de 16 caractères
    const filteredWords = words.filter(word => {
      if (word.length > 16) {
        reste.push(word); // Ajouter les mots trop longs au tableau reste
        return false; // Exclure ces mots du traitement
      }
      return true;
    });
  
    // const canPlaceWord = (word, row, col, direction) => {
    //   if (direction === 'horizontal') {
    //       if (col + word.length > gridSize) return false;
    //       for (let i = 0; i < word.length; i++) {
    //           if (grid[row][col + i] && grid[row][col + i] !== word[i]) return false;
    //       }
    //   } else if (direction === 'vertical') {
    //       if (row + word.length > gridSize) return false;
    //       for (let i = 0; i < word.length; i++) {
    //           if (grid[row + i][col] && grid[row + i][col] !== word[i]) return false;
    //       }
    //   }
    //   return true;
    // };
    const canPlaceWord = (word, row, col, direction) => {
        let hasIntersection = false;
        let canPlace = true;
    
        if (direction === 'horizontal') {
            if (col + word.length > gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                const currentChar = grid[row][col + i];
                if (currentChar && currentChar !== word[i]) {
                    return false;
                }
                if (currentChar && currentChar === word[i]) {
                    hasIntersection = true;
                }
            }
        } else if (direction === 'vertical') {
            if (row + word.length > gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                const currentChar = grid[row + i][col];
                if (currentChar && currentChar !== word[i]) {
                    return false;
                }
                if (currentChar && currentChar === word[i]) {
                    hasIntersection = true;
                }
            }
        }
    
        // Si aucune intersection significative, séparer les mots par un espace
        if (!hasIntersection) {
            if (direction === 'horizontal') {
                if (col > 0 && grid[row][col - 1] !== '') canPlace = false;
                if (col + word.length < gridSize && grid[row][col + word.length] !== '') canPlace = false;
            } else if (direction === 'vertical') {
                if (row > 0 && grid[row - 1][col] !== '') canPlace = false;
                if (row + word.length < gridSize && grid[row + word.length][col] !== '') canPlace = false;
            }
        }
    
        return canPlace;
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
//   export const generateCrosswordName = (words) => {
//     const names = words.map(word => word.word);
//     const gridSize = calculateGridSize(names);
//     const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
//     const positions = [];
//     const reste = []; // Tableau pour les mots trop longs
  
//     // Filtrer les mots de plus de 12 caractères
//     const filteredWords = names.filter(word => {
//       if (word.length > 12) {
//         reste.push(word); // Ajouter les mots trop longs au tableau reste
//         return false; // Exclure ces mots du traitement
//       }
//       return true;
//     });
  
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
//     };
  
//     const placeWord = (word, row, col, direction) => {
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
//     };
  
//     filteredWords.forEach(word => {
//         let placed = false;
//         for (let i = 0; i < gridSize && !placed; i++) {
//             for (let j = 0; j < gridSize && !placed; j++) {
//                 const directions = ['horizontal', 'vertical'];
//                 for (let direction of directions) {
//                     if (canPlaceWord(word, i, j, direction)) {
//                         placeWord(word, i, j, direction);
//                         placed = true;
//                         break;
//                     }
//                 }
//             }
//         }
//     });
  
//     return { positions, gridSize, reste }; // Retourner le tableau reste avec les mots non traités
//   };
  
  
