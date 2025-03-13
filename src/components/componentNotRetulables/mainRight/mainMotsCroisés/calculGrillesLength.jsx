
// export const calculateGridSize = (words) => {
//   // Filtrer les mots qui sont  strictement inferieurs à 16 caractères.
//   const filteredWords = words.filter(word => word.length <= 15);
//   // Calculer la taille de la grille en fonction des mots filtrés
//   const longestWord = filteredWords.reduce((max, word) => Math.max(max, word.length), 0);
//   const totalLetters = filteredWords.reduce((sum, word) => sum + word.length, 0);
//   const Size = Math.max(longestWord + 3, Math.ceil(Math.sqrt(totalLetters)));
//   return Size;
// };
// export const calculateGridSize = (words) => {
//   // Filtrer les mots qui sont strictement inférieurs à 16 caractères.
//   const filteredWords = words.filter(word => word.length <= 15);
//   // Calculer la taille de la grille en fonction des mots filtrés
//   const longestWord = filteredWords.reduce((max, word) => Math.max(max, word.length), 0);
//   const totalLetters = filteredWords.reduce((sum, word) => sum + word.length, 0);
//   const estimatedSize = Math.ceil(Math.sqrt(totalLetters)) + Math.ceil(longestWord / 2);
//   return Math.max(longestWord +1, estimatedSize); // Ajout de marge pour plus de flexibilité
// };
//pas bon celui du haut
/****ca plus bas tient le coup */
export const calculateGridSize = (words) => {
  // Filtrer les mots qui sont strictement inférieurs à 16 caractères.
  const filteredWords = words.filter(word => word.length <= 60);

  // Calculer la taille de la grille en fonction des mots filtrés
  const longestWord = filteredWords.reduce((max, word) => Math.max(max, word.length), 0);
  const totalLetters = filteredWords.reduce((sum, word) => sum + word.length, 0);

  // Ajuster la taille de la grille pour avoir un peu d'espace supplémentaire
  const baseSize = Math.max(longestWord, Math.ceil(Math.sqrt(totalLetters)));
  const adjustedSize = Math.ceil(baseSize * 1.1); // Ajuster avec une marge de 10%

  return adjustedSize;
};

// export const calculateGridSize = (words) => {
//   const filteredWords = words.filter(word => word.length <= 15);
//   const longestWord = filteredWords.reduce((max, word) => Math.max(max, word.length), 0);
//   const totalLetters = filteredWords.reduce((sum, word) => sum + word.length, 0);

//   // Ajouter une marge de sécurité de 20% à la taille calculée
//   const margin = Math.ceil(Math.sqrt(totalLetters) * 0.05);
//   const size = Math.max(longestWord, Math.ceil(Math.sqrt(totalLetters))) + margin;

//   return size;
// };
  
  
  