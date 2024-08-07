
export const calculateGridSize = (words) => {
  // Filtrer les mots qui dépassent 12 caractères et les stocker dans un tableau séparé
  const filteredWords = words.filter(word => word.length <= 12);
  const rest = words.filter(word => word.length > 12);

  // Calculer la taille de la grille en fonction des mots filtrés
  const longestWord = filteredWords.reduce((max, word) => Math.max(max, word.length), 0);
  const totalLetters = filteredWords.reduce((sum, word) => sum + word.length, 0);
  const Size = Math.max(longestWord, Math.ceil(Math.sqrt(totalLetters)));
  return Size;

};

  
  
  