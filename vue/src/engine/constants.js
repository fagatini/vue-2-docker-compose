export const MAX_CARDS_PER_LINE = 7;

export const GamePhases = {
  MULLIGAN: 'MULLIGAN',
  ROUND_IN_PROGRESS: 'ROUND_IN_PROGRESS',
  END: 'END',
};

export const TurnStates = {
  PLAYER: 'PLAYER',
  OPPONENT: 'OPPONENT',
};

export const Winners = {
  PLAYER: 'PLAYER',
  OPPONENT: 'OPPONENT',
}

export const CardType = {
  MELEE: 'MELEE',
  RANGE: 'RANGE',
};

export const CARDS_IN_DECK_QUANTITY = 30;

let cardId = 1;

export const INIT_DECK = new Array(CARDS_IN_DECK_QUANTITY).fill({
  score: 1,
  new: false,
}).map(card => ({...card, type: ++cardId % 2 === 0 ? CardType.MELEE : CardType.RANGE}));

export const MAX_CARDS_IN_HAND = 10;

export const MAX_MULLIGAN_CARDS_QUANTITY = 3;

export const ROUNDS_TO_WIN = 2;

export const NEW_ROUND_DRAW_CARDS_QUANTITY = 3;

export const TIME_TO_TURN_S = 60;

export const TIME_TO_TURN_MS = TIME_TO_TURN_S * 1000;

export const MAX_OPPONENT_WAIT_MS = 5000;

export const COUNTDOWN_STEP_MS = 1000;
