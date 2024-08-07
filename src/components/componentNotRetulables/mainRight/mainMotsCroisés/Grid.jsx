
// import React, { useState, useEffect } from 'react';

// export function Grid({ data, onCellChange }) {
//   const [grid, setGrid] = useState([]);

//   useEffect(() => {
//     setGrid(renderGrid());
//   }, [data]);

//   const handleInputChange = (e, x, y) => {
//     const letter = e.target.value.toUpperCase();
//     if (letter === '' || (letter.length === 1 && /^[A-Z]$/.test(letter))) {
//       const newGrid = grid.map(row => [...row]);
//       newGrid[y][x] = letter;
//       setGrid(newGrid);
//       onCellChange(x, y, letter);
//     }
//   };

//   const renderGrid = () => {
//     const gridSize = data?.reduce((size, word) => {
//       word.cellule.forEach(cell => {
//         if (cell.x + 1 > size.width) size.width = cell.x + 1;
//         if (cell.y + 1 > size.height) size.height = cell.y + 1;
//       });
//       return size;
//     }, { width: 0, height: 0 });

//     const newGrid = Array.from({ length: gridSize.height }, () => Array(gridSize.width).fill(''));
//     data?.forEach((word) => {
//       if (word.cellule && Array.isArray(word.cellule)) {
//         word.cellule.forEach((cell) => {
//           newGrid[cell.y][cell.x] = cell.lettre;
//         });
//       }
//     });
//     return newGrid;
//   };

//   return (
//     <div className="sous_parent_main_croisés_contenair">
//       {grid.flatMap((row, y) =>
//         row?.map((cell, x) => (
//           <input
//             className="cell"
//             key={`${x}-${y}`}
//             value={cell || ''}
//             onChange={(e) => handleInputChange(e, x, y)}
//           />
//         ))
//       )}
//     </div>
//   );
// }

 import React from 'react';

export const Grid = ({positions,gridSize}) => {
  
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

  // Placer les mots dans la grille
  positions.forEach(({ word, row, col, direction }) => {
    if (direction === 'horizontal') {
      for (let i = 0; i < word.length; i++) {
        grid[row][col + i] = word[i];
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col] = word[i];
      }
    }
  });

  return (
    <div className="sous_parent_main_croisés_contenair" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
          value={cell}
          style={{ 
                           backgroundColor: cell === '' ? 'transparent' : 'white',
                           border: cell === '' ? 'grey' : '',
                         }}/>
           
        ))
      )}
    </div>
  );
};

// export const Grid = ({positions,gridSize}) => {
    
//   const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

//   // Placer les mots dans la grille
//   positions.forEach(({ word, row, col, direction }) => {
//     if (direction === 'horizontal') {
//       for (let i = 0; i < word.length; i++) {
//         grid[row][col + i] = word[i];
//       }
//     } else if (direction === 'vertical') {
//       for (let i = 0; i < word.length; i++) {
//         grid[row + i][col] = word[i];
//       }
//     }
//   });

//   return (
//     <div className="sous_parent_main_croisés_contenair" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
//       {grid.map((row, rowIndex) =>
//         row.map((cell, colIndex) => (
//           <input
//             key={`${rowIndex}-${colIndex}`}
//             value={cell}
//             style={{ 
//               backgroundColor: cell === '' ? 'transparent' : 'white',
//                border: cell === '' ? 'grey' : '',
//             }}
//           />
//         ))
//       )}
//     </div>
//   );
// };
/****************remplir les cases vides avec des mots aleatoires */
// export const Grid = ({positions,gridSize}) => {
  
//   const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

//   // Placer les mots dans la grille
//   positions.forEach(({ word, row, col, direction }) => {
//     if (direction === 'horizontal') {
//       for (let i = 0; i < word.length; i++) {
//         grid[row][col + i] = word[i];
//       }
//     } else if (direction === 'vertical') {
//       for (let i = 0; i < word.length; i++) {
//         grid[row + i][col] = word[i];
//       }
//     }
//   });

//   // Remplir les cases vides avec des lettres aléatoires
//   const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   for (let row = 0; row < gridSize; row++) {
//     for (let col = 0; col < gridSize; col++) {
//       if (grid[row][col] === '') {
//         grid[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
//       }
//     }
//   }

//   return (
//     <div className="sous_parent_main_croisés_contenair" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
//       {grid.map((row, rowIndex) =>
//         row.map((cell, colIndex) => (
//           <input
//             key={`${rowIndex}-${colIndex}`}
//             value={cell}
//             style={{ 
//               backgroundColor: 'white',
//               color: 'black',
//               border: '1px solid #ccc',
//               textAlign: 'center'
//             }}
//           />
//         ))
//       )}
//     </div>
//   );
// };