import { CardType, MAX_CARDS_PER_LINE, TurnStates } from '@/engine/constants';
import { getGameEngineSingleton } from '@/engine/game-engine';

export class Board {
  firstLineCards = [];
  secondLineCards = [];

  getFirstLineScore() {
    return this.firstLineCards.reduce((score, card) => score + card.score, 0);
  }

  getSecondLineScore() {
    return this.secondLineCards.reduce((score, card) => score + card.score, 0);
  }

  getTotalScore() {
    return this.getFirstLineScore() + this.getSecondLineScore();
  }

  addFirstLineCard(card, position) {
    if (MAX_CARDS_PER_LINE > this.firstLineCards.length) {
      if (position !== undefined) {
        this.firstLineCards.splice(position, 0, card);
      } else {
        this.firstLineCards = [...this.firstLineCards, card];
      }
      return true;
    }

    return false;
  }

  addSecondLineCard(card, position) {
    if (MAX_CARDS_PER_LINE > this.secondLineCards.length) {
      if (position !== undefined) {
        this.secondLineCards.splice(position, 0, card);
      } else {
        this.secondLineCards = [...this.secondLineCards, card];
      }
      return true;
    }

    return false;
  }

  removeCardFromFirstLine(index) {
    const removed = this.firstLineCards.splice(index, 1);
    this.firstLineCards = [...this.firstLineCards];
    return removed[0];
  }

  removeCardFromSecondLine(index) {
    const removed = this.secondLineCards.splice(index, 1);
    this.secondLineCards = [...this.secondLineCards];
    return removed[0];
  }

  removeCard(index, type) {
    const engine = getGameEngineSingleton();

    if (engine.currentTurn !== TurnStates.PLAYER) {
      return;
    }

    if (type === CardType.MELEE) {
      return this.removeCardFromFirstLine(index);
    } else {
      return this.removeCardFromSecondLine(index);
    }
  }

  addCard(card, position) {
    switch (card.type) {
      case CardType.MELEE:
        this.addFirstLineCard(card, position);
        break;

      case CardType.RANGE:
        this.addSecondLineCard(card, position);
        break;

      default:
        console.error('Invalid cardType: ', card);
    }
  }

  getCard(index, type) {
    if (type === CardType.MELEE) {
      return this.firstLineCards[index];
    } else {
      return this.secondLineCards[index];
    }
  }

  reset() {
    this.firstLineCards = [];
    this.secondLineCards = [];
  }
}
