const symbols = ['&#9830', '&#9829', '&#9824', '&#9827'];
const values = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

export const getRandomCard = () => {
  return {
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    value: values[Math.floor(Math.random() * values.length)],
  };
};
