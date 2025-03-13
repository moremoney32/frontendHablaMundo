//   import { calculateGridSize } from "./calculGrillesLength";



// export const generateCrossword = (words) => {
//     const gridSize = calculateGridSize(words);
//     const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
//     const positions = [];
//     const reste = [];

//     // Filtrer les mots de plus de 15 caractères
//     const filteredWords = words.filter(word => {
//         if (word.length > 15) {
//             reste.push(word);
//             return false;
//         }
//         return true;
//     });
 

//     const canPlaceWord = (word, row, col, direction) => {
//         if (direction === 'horizontal') {
//             if (col + word.length > gridSize) return false;
//             for (let i = 0; i < word.length; i++) {
//                 if (grid[row][col + i] && grid[row][col + i] !== word[i]) return false;
//             }
//         } else if (direction === 'vertical') {
//             if (row + word.length > gridSize) return false;
//             for (let i = 0; i < word.length; i++) {
//                 if (grid[row + i][col] && grid[row + i][col] !== word[i]) return false;
//             }
//         }
//         return true;
//     };

//     const placeWord = (word, row, col, direction) => {
//         if (direction === 'horizontal') {
//             for (let i = 0; i < word.length; i++) {
//                 grid[row][col + i] = word[i];
//             }
//         } else if (direction === 'vertical') {
//             for (let i = 0; i < word.length; i++) {
//                 grid[row + i][col] = word[i];
//             }
//         }
//         positions.push({ word, row, col, direction });
//     };

//     filteredWords.forEach((word, index) => {
//         let placed = false;
//         for (let i = 0; i < gridSize && !placed; i++) {
//             for (let j = 0; j < gridSize && !placed; j++) {
//                 const directions = ['horizontal', 'vertical'];
//                 for (let direction of directions) {
//                     if (canPlaceWord(word, i, j, direction)) {
//                         // Vérifier si cette position est déjà utilisée par un autre mot identique
//                         if (!positions.some(pos => pos.word === word && pos.row === i && pos.col === j && pos.direction === direction)) {
//                             placeWord(word, i, j, direction);
//                             placed = true;
//                             break;
//                         }
//                     }
//                 }
//             }
//         }

//         // Si le mot n'a pas pu être placé, l'ajouter à la liste des restes
//         if (!placed) {
//           return  reste.push(word);
//         }
//     });

//     return { positions, gridSize, reste };
// };



import { calculateGridSize } from "./calculGrillesLength";

export const generateCrossword = (words) => {
    const gridSize = calculateGridSize(words);
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    const positions = [];
    const reste = [];

    // Filtrer les mots de plus de 15 caractères
    const filteredWords = words.filter(word => {
        if (word.length > 60) {
            reste.push(word);
            return false;
        }
        return true;
    });

    // Vérifie si un mot peut être placé à une position donnée
    const canPlaceWord = (word, row, col, direction) => {
        if (direction === 'horizontal') {
            if (col + word.length > gridSize) return false;
            // Vérifier si les cellules sont libres
            for (let i = 0; i < word.length; i++) {
                if (grid[row][col + i] !== '') return false;
            }
        } else if (direction === 'vertical') {
            if (row + word.length > gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[row + i][col] !== '') return false;
            }
        }
        return true;
    };

    // Place un mot dans la grille
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

    // Placer les mots dans la grille
    filteredWords.forEach((word, index) => {
        let placed = false;
        
        for (let i = 0; i < gridSize && !placed; i++) {
            for (let j = 0; j < gridSize && !placed; j++) {
                const directions = ['horizontal', 'vertical'];
                for (let direction of directions) {
                    // Vérifie si le mot peut être placé et s'il n'a pas été déjà placé aux mêmes coordonnées
                    if (canPlaceWord(word, i, j, direction) &&
                        !positions.some(pos => pos.word === word && pos.row === i && pos.col === j && pos.direction === direction)) {
                        placeWord(word, i, j, direction);
                        placed = true;
                        break;
                    }
                }
            }
        }

        // Si le mot n'a pas pu être placé, l'ajouter à la liste des restes
        if (!placed) {
            reste.push(word);
        }
    });

    // Retourne la grille, les positions des mots, et les restes
    return { positions, gridSize, reste };
};
