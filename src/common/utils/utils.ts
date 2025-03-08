// shuffle array
// credit to geeksforgeeks for fisher-yates algorithm implementation
export function shuffleArray(arr: any) {
  let newArray = arr;
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
