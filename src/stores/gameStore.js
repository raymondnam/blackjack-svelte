import { writable } from 'svelte/store';
import { getRandomCard, getCardPoints } from '../utils/gameLogic';

const initialState = {
  playerCards: [],
  houseCards: [],
  playerPoints: 0,
  housePoints: 0,
  bet: 0,
  chips: 1000,
  phase: 'BET',
};

function udpatePhase({ phase, playerPoints, housePoints }) {
  if (playerPoints === 21) return 'WIN';
  if (playerPoints > 21) return 'LOST';
  if (phase === 'WAITING') {
    return playerPoints > housePoints ? 'WIN' : 'LOST';
  }
  return phase;
}

function updateChips(state) {
  const { phase, chips, bet } = state;
  if (phase === 'WIN') {
    return {
      chips: chips + bet * 2,
      bet: 0,
    };
  }
  if (phase === 'LOST') {
    return {
      ...state,
      bet: 0,
    };
  }
  return state;
}

function calculatePoints(state) {
  return {
    playerPoints: getCardPoints(state.playerCards),
    housePoints: getCardPoints(state.houseCards.filter(card => !card.isHidden)),
  };
}

function computeResults(state) {
  const { playerPoints, housePoints } = calculatePoints(state);

  let phase = udpatePhase({
    phase: state.phase,
    playerPoints,
    housePoints,
  });

  const { bet, chips } = updateChips({
    phase,
    bet: state.bet,
    chips: state.chips,
  });

  return {
    ...state,
    playerPoints,
    housePoints,
    phase,
    bet,
    chips,
  };
}

function playHouseTurn(houseCards) {
  let cards = houseCards.map(card => ({ ...card, isHidden: false }));
  // TODO: draw more than 2 cards
  return cards;
}

function createStore() {
  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    startGame: () => {
      update(state =>
        computeResults({
          ...state,
          phase: 'PLAYING',
          // draw 2 cards
          playerCards: [getRandomCard(), getRandomCard()],
          // draw 2 cards (included 1 hidden)
          houseCards: [getRandomCard(), { ...getRandomCard(), isHidden: true }],
        }),
      );
    },
    placeBet: bet =>
      update(state => ({
        ...state,
        bet: state.bet + bet,
        chips: state.chips - bet,
      })),
    hit: () =>
      update(state =>
        computeResults({
          ...state,
          // draw 1 card
          playerCards: [...state.playerCards, getRandomCard()],
        }),
      ),
    stand: () =>
      update(state =>
        computeResults({
          ...state,
          houseCards: playHouseTurn(state.houseCards),
          phase: 'WAITING',
        }),
      ),
    continue: () =>
      update(state => ({
        ...state,
        phase: 'BET',
      })),
    reset: () => set(initialState),
  };
}

export default createStore();
