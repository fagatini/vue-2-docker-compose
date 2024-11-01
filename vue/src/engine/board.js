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

  addFirstLineCard(card) {
    if (MAX_CARDS_PER_LINE > this.firstLineCards.length) {
      this.firstLineCards = [...this.firstLineCards, card]
      return true;
    }

    return false;
  }

  addSecondLineCard(card) {
    if (MAX_CARDS_PER_LINE > this.secondLineCards.length) {
      this.secondLineCards = [...this.secondLineCards, card]
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

  addCard(card) {
    switch (card.type) {
      case CardType.MELEE:
        this.addFirstLineCard(card);
        break;

      case CardType.RANGE:
        this.addSecondLineCard(card);
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
