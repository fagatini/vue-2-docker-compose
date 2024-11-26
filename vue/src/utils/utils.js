export const shuffleArray = (array) => {
  const result = [...array];

  for (let i = result.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

export const sleep = (ms) => new Promise(res => {
  setTimeout(res, ms);
});

export const getCardDropPosition = (cardNodes, x) => {
  let position = 0;

  for (const node of cardNodes) {
    const { left, right } = node.getBoundingClientRect();
    const mid = (left + right) / 2;

    if (x < mid) {
      return position
    }

    position++;
  }

  return position;
}
