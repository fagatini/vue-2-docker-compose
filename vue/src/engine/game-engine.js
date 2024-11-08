import { Player } from '@/engine/player';
import {
  COUNTDOWN_STEP_MS,
  GamePhases,
  INIT_DECK,
  MAX_OPPONENT_WAIT_MS, OPPONENT_TURNS_PER_ROUND,
  ROUNDS_TO_WIN,
  TIME_TO_TURN_MS,
  TurnStates,
  Winners
} from '@/engine/constants';
import { sleep } from '@/utils/utils';

class GameEngine {
  player = new Player(INIT_DECK);
  opponent =  new Player(INIT_DECK);
  currentPhase = GamePhases.MULLIGAN;
  currentTurn = TurnStates.PLAYER;
  roundNumber = 1;
  opponentTurnsQuantity = 0;
  msRemainToTurn = TIME_TO_TURN_MS;
  cardPlayed = false;

  constructor() {
    setInterval(() => {
      if (this.currentTurn !== TurnStates.PLAYER) {
        return;
      }

      this.msRemainToTurn -= COUNTDOWN_STEP_MS;

      if (this.msRemainToTurn <= 0) {
        this.player.pass();
        this.endPlayerTurn();
      }
    }, COUNTDOWN_STEP_MS)
  }

  performMulligan(indexesToRemove) {
    this.player.performMulligan(indexesToRemove);
    this.currentPhase = GamePhases.ROUND_IN_PROGRESS;
  }

  endPlayerTurn(passed) {
    this.player.board.firstLineCards.map(card => card.new = false)
    this.player.board.secondLineCards.map(card => card.new = false)

    if (this.opponent.passed) {
      if (passed) {
        this.endRound();
      } else {
        this.endOpponentTurn()
      }

      return;
    }

    if (passed) {
      this.player.pass();
    }

    this.currentTurn = TurnStates.OPPONENT;
    void this.performOpponentActions();
  }

  getRemainTurnSeconds() {
    return this.msRemainToTurn / 1000;
  }

  playCard(cardIndex) {
    if (this.currentTurn !== TurnStates.PLAYER || this.cardPlayed) {
      return;
    }

    this.cardPlayed = true;
    this.player.playCard(cardIndex);
  }

  endOpponentTurn(passed) {
    if (this.player.passed) {
      if (passed) {
        this.endRound();
      } else {
        this.endPlayerTurn();
      }

      return;
    }

    if (passed) {
      this.opponent.pass();
    }

    this.currentTurn = TurnStates.PLAYER;
    this.msRemainToTurn = TIME_TO_TURN_MS;
    this.cardPlayed = false;
  }

  async performOpponentActions() {
    if (this.currentTurn !== TurnStates.OPPONENT || this.opponent.passed) {
      return;
    }

    await sleep(Math.floor(Math.random() * MAX_OPPONENT_WAIT_MS));

    const cards = this.opponent.cards;

    if (!cards.length) {
      return;
    }

    const bestCardIndex = cards.reduce((bestCardIndex, card, i) => card.score > cards[bestCardIndex].score ? i : bestCardIndex, 0);
    this.opponent.playCard(bestCardIndex);
    this.opponentTurnsQuantity++;
    this.endOpponentTurn(this.opponentTurnsQuantity >= OPPONENT_TURNS_PER_ROUND);
  }

  endRound() {
    if (this.player.board.getTotalScore() > this.opponent.board.getTotalScore()) {
      this.player.gameScore++;
    } else {
      this.opponent.gameScore++;
    }

    const winner = this.getWinner();

    if (!winner) {
      this.roundNumber++;
    } else {
      this.currentPhase = GamePhases.END;
    }

    this.player.prepareToRound();
    this.opponent.prepareToRound();
    this.opponentTurnsQuantity = 0;
    this.msRemainToTurn = TIME_TO_TURN_MS;
    this.cardPlayed = false;

    if (this.roundNumber % 2 === 0) {
      this.currentTurn = TurnStates.OPPONENT
      void this.performOpponentActions();
    } else {
      this.currentTurn = TurnStates.PLAYER
    }

    return winner;
  }

  getWinner() {
    if (this.player.gameScore >= ROUNDS_TO_WIN) {
      this.currentPhase = GamePhases.END;
      return Winners.PLAYER;
    }

    if (this.opponent.gameScore >= ROUNDS_TO_WIN) {
      this.currentPhase = GamePhases.END;
      return Winners.OPPONENT;
    }

    return null;
  }

  removeCardFromBoard(index, type) {
    this.cardPlayed = false;
    this.player.removeCardFromBoard(index, type);
  }

  restart() {
    this.player = new Player(INIT_DECK);
    this.opponent =  new Player(INIT_DECK);
    this.currentTurn = TurnStates.PLAYER;
    this.roundNumber = 1;
    this.opponentTurnsQuantity = 0;
    this.msRemainToTurn = TIME_TO_TURN_MS;
    this.cardPlayed = false;
  }
}

const engine = new GameEngine();

export const getGameEngineSingleton = () => engine;
