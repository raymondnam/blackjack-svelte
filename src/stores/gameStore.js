import { writable } from 'svelte/store';
import { getRandomCard } from '../utils/gameLogic';

const initialState = {
  playerCards: [],
  houseCards: [],
  turn: 'player',
  bet: null,
  chips: 1000,
  winner: null,
  phase: 'BET',
};

function createStore() {
  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    startGame: () =>
      update(state => ({
        ...state,
        turn: 'house',
        phase: 'PLAYING',
        playerCards: [getRandomCard(), getRandomCard()],
        houseCards: [getRandomCard(), { ...getRandomCard(), isHidden: true }],
      })),
    placeBet: bet =>
      update(state => ({
        ...state,
        bet: state.bet + bet,
        chips: state.chips - bet,
      })),
    hit: () =>
      update(state => ({
        ...state,
        playerCards: [...state.playerCards, getRandomCard()],
      })),
    stand: () =>
      update(state => ({
        ...state,
        turn: 'house',
      })),
    reset: () => set(initialState),
  };
}

export default createStore();
