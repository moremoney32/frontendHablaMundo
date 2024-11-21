

  import React from 'react';
  import "./mainMotsCroisés.css"

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
//           value={cell}
//           style={{ 
//                            backgroundColor: cell === '' ? 'transparent' : 'white',
//                            border: cell === '' ? 'grey' : '',
//                          }}/>
           
//         ))
//       )}
//     </div>
//   );
// };

export const Grid = ({ positions, gridSize, focusedWord }) => {
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

  // Placer les mots dans la grille
  positions.forEach(({ word, row, col, direction }) => {
    if (direction === 'horizontal') {
      for (let i = 0; i < word.length; i++) {
        grid[row][col + i] = { letter: word[i], word };
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col] = { letter: word[i], word };
      }
    }
  });

  return (
    <div
      className="sous_parent_main_croisés_contenair"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            value={cell.letter || ''}
            readOnly
            style={{
              backgroundColor: cell.letter ? 'white' : 'transparent',
              color: cell.word === focusedWord ? '#24D26D' : 'black',
              fontWeight: cell.word === focusedWord ? '1000' : 'normal',
              border: cell.letter ? '1px solid grey' : '',
            }}
          />
        ))
      )}
    </div>
  );
};
