const symbols = ['&#9830', '&#9829', '&#9824', '&#9827'];
const valueDictionary = {
  A: 11, // TODO: handle 1, 10, 11 values
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
  return cards.reduce((total, card) => {
    const cardValue = valueDictionary[card.value];
    return total + cardValue;
  }, 0);
};
