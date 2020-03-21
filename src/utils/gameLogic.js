const symbols = ['&#9830', '&#9829', '&#9824', '&#9827'];
const valueDictionary = {
  A: 11,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 10,
  Q: 10,
  K: 10,
};

const values = Object.keys(valueDictionary);

export const getRandomCard = () => {
  return {
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    value: values[Math.floor(Math.random() * values.length)],
  };
};

export const getCardPoints = cards => {
  const aces = cards.filter(card => card.value === 'A');
  const otherCards = cards.filter(card => card.value !== 'A');

  let currentTotal = otherCards.reduce((total, card) => {
    const cardValue = valueDictionary[card.value];
    return total + cardValue;
  }, 0);

  aces.forEach(ace => {
    currentTotal += 11;
    // if (currentTotal < 21) {
    //   currentTotal += 9; // 10
    // }
    // if (currentTotal < 21) {
    //   currentTotal += 1; // 11
    // }
  });

  return currentTotal;
};
