// export const calculateGridSize = (data) => {
//     let maxX = 0;
//     let maxY = 0;
  
//     data.forEach(word => {
//       word.cellule.forEach(cell => {
//         if (cell.x > maxX) maxX = cell.x;
//         if (cell.y > maxY) maxY = cell.y;
//       });
//     });
  
//     return Math.max(maxX, maxY) + 1; // Adding 1 to include the zero index
//   };
export const calculateGridSize = (words) => {
    if (!words || words.length === 0) return 0;
    const maxLength = words.reduce((max, word) => Math.max(max, word.length), 0);
    return Math.max(maxLength, words.length) + 5; // Ajoutez un peu d'espace pour éviter les chevauchements
  };
  
  
  