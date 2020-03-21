import { writable } from 'svelte/store';
import { getRandomCard, getCardPoints } from '../utils/gameLogic';

const initialState = {
  playerCards: [],
  houseCards: [],
  playerPoints: 0,
  housePoints: 0,
  bet: 0,
  chips: 1000,
  winner: null,
  phase: 'BET',
};

function calculatePoints(state) {
  const playerPoints = getCardPoints(state.playerCards);
  const housePoints = getCardPoints(
    state.houseCards.filter(card => !card.isHidden),
  );

  let updatedPhase = state.phase;
  if (playerPoints === 21) {
    updatedPhase = 'WIN';
  } else if (playerPoints > 21) {
    updatedPhase = 'LOST';
  } else if (state.phase === 'WAITING') {
    if (playerPoints > housePoints) {
      updatedPhase = 'WIN';
    } else {
      updatedPhase = 'LOST';
    }
  }
  let updatedBet = state.bet;
  let updatedChips = state.chips;

  if (updatedPhase === 'WIN') {
    updatedChips += state.bet * 2;
    updatedBet = 0;
  } else if (updatedPhase === 'LOST') {
    updatedBet = 0;
  }

  return {
    ...state,
    playerPoints,
    housePoints,
    phase: updatedPhase,
    bet: updatedBet,
    chips: updatedChips,
  };
}

function playHouseTurn(houseCards) {
  let cards = houseCards.map(card => ({ ...card, isHidden: false }));

  return cards;
}

function createStore() {
  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    startGame: () => {
      update(state => {
        return calculatePoints({
          ...state,
          phase: 'PLAYING',
          playerCards: [getRandomCard(), getRandomCard()],
          houseCards: [getRandomCard(), { ...getRandomCard(), isHidden: true }],
        });
      });
    },
    placeBet: bet =>
      update(state => ({
        ...state,
        bet: state.bet + bet,
        chips: state.chips - bet,
      })),
    hit: () =>
      update(state =>
        calculatePoints({
          ...state,
          playerCards: [...state.playerCards, getRandomCard()],
        }),
      ),
    stand: () =>
      update(state =>
        calculatePoints({
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
