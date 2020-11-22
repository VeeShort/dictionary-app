export const prepareDictionaryList = (list = []) => {
  const finalList = {};

  list.sort((a, b) => (a.en > b.en) ? 1 : -1);
  list.forEach(({ startLetter, en, translation }) => {
    if (!finalList[startLetter]) {
      finalList[startLetter] = [];
    }
    finalList[startLetter].push({ en, translation });
  });
  console.log('finalList:', finalList);
  return finalList;
};
