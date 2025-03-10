// Function to calculate how many words remain for each letter at a given position
function calculateRemainingWords(words, position) {
  const letterGroups = {};

  // Group words by the letter at the given position
  words.forEach(item => {
    const letter = item.word.replace(/\s+/g, '')[position - 1] || null; // Handle shorter words gracefully
    if (letter) {
      if (!letterGroups[letter]) {
        letterGroups[letter] = [];
      }
      letterGroups[letter].push(item.word);
    }
  });

  // Calculate how many words would remain for each letter
  const result = Object.keys(letterGroups).map(letter => {
    return {letter, remaining: letterGroups[letter].length};
  });

  return result;
}

// Function to find the best position to narrow down the list, excluding specific positions
function findBestPosition(words, excludedPositions) {
  const wordLength = words[0].word.replace(/\s+/g, '').length; // Assuming all words have at least one letter 
  let bestPosition = null;
  let bestScore = Infinity;

  // Iterate over all possible positions (1-based index)
  for (let i = 1; i <= wordLength; i++) {
    // Skip positions that are in the excluded array
    if (excludedPositions.includes(i)) {
      continue;
    }

    const remainingForPosition = calculateRemainingWords(words, i);

    // Find the maximum remaining words if filtered by any letter at this position
    const maxRemaining = Math.max(
      ...remainingForPosition.map(l => l.remaining),
    );

    // If this position gives a better reduction in the list, update the best position
    if (maxRemaining < bestScore) {
      bestScore = maxRemaining;
      bestPosition = i;
    }
  }

  return bestPosition;
}

// Example: Finding the best position, excluding positions 1, 3, and 4
// const excludedPositions = [1, 3, 4];
//   const bestPosition = findBestPosition(data, excludedPositions);
//   console.log(`Best position to narrow down the list (excluding positions 1, 3, and 4): ${bestPosition}`);
export {findBestPosition};
