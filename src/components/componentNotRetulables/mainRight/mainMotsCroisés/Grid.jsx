import React from 'react';

export function Grid({data,onCellChange}) {
  const gridSize = 25; 

  const handleInputChange = (e, x, y) => {
    const letter = e.target.value.toUpperCase();
    if (letter.length === 1 && /^[A-Z]$/.test(letter)) {
      onCellChange(x, y, letter);
    }
  };
  const renderGrid = () => {
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
    data?.forEach((word) => {
      if (word.cellule && Array.isArray(word.cellule)) {
        word.cellule.forEach((cell) => {
          grid[cell.y][cell.x] = cell.lettre;
        });
      }
    });
    return grid;
  };

  return (
    <div className="sous_parent_main_croisés_contenair">
    {renderGrid().flatMap((row, y) =>
      row?.map((cell, x) => (
        <input
          className="cell"
          key={`${x}-${y}`} // Clé unique
          value={cell || ''}
          onChange={(e) => handleInputChange(e, x, y)}
        />
      ))
    )}
  </div>
  );
}

// import React from 'react';

// export function Grid({ data, onCellChange }) {
//   const gridSize = data?.reduce((size, word) => {
//     word.cellule.forEach(cell => {
//       if (cell.x + 1 > size.width) size.width = cell.x + 1;
//       if (cell.y + 1 > size.height) size.height = cell.y + 1;
//     });
//     return size;
//   }, { width: 0, height: 0 });

//   const handleInputChange = (e, x, y) => {
//     const letter = e.target.value.toUpperCase();
//     if (letter.length === 1 && /^[A-Z]$/.test(letter)) {
//       onCellChange(x, y, letter);
//     }
//   };

//   const renderGrid = () => {
//     const grid = Array.from({ length: gridSize.height }, () => Array(gridSize.width).fill(''));
//     data?.forEach((word) => {
//       if (word.cellule && Array.isArray(word.cellule)) {
//         word.cellule.forEach((cell) => {
//           grid[cell.y][cell.x] = cell.lettre;
//         });
//       }
//     });
//     return grid;
//   };

//   return (
//     <div className="sous_parent_main_croisés_contenair">
//       {renderGrid().flatMap((row, y) =>
//         row?.map((cell, x) => (
//           <input
//             className="cell"
//             key={`${x}-${y}`} // Unique key
//             value={cell || ''}
//             onChange={(e) => handleInputChange(e, x, y)}
//           />
//         ))
//       )}
//     </div>
//   );
// }