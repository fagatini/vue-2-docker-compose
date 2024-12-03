import { Board } from '@/engine/board';
import { MAX_CARDS_IN_HAND, MAX_MULLIGAN_CARDS_QUANTITY, NEW_ROUND_DRAW_CARDS_QUANTITY } from '@/engine/constants';
import { shuffleArray } from '@/utils/utils';

export class Player {
  gameScore = 0;
  deck = [];
  cards = [];
  board = new Board();
  passed = false;

  constructor(deck) {
    this.deck = shuffleArray(deck);
    this.cards = this.deck.splice(0, MAX_CARDS_IN_HAND);
  }

  performMulligan(indexesToRemove) {
    indexesToRemove = indexesToRemove.splice(0, MAX_MULLIGAN_CARDS_QUANTITY);
    const newCards = this.deck.splice(0, indexesToRemove.length);

    const removedCards = indexesToRemove.map((indexToRemove, i) => {
      const removedCard = this.cards[indexToRemove];
      this.cards[indexToRemove] = newCards[i];
      return removedCard;
    });

    this.deck.push(...removedCards);
    this.deck = shuffleArray(this.deck);
  }

  playCard(cardIndex, position) {
    const card = this.cards[cardIndex];
    this.cards.splice(cardIndex, 1);
    card.new = true;
    return this.board.addCard(card, position);
  }

  pass() {
    this.passed = true;
  }

  drawCards(amount) {
    const newCards = this.deck.splice(0, amount);
    newCards.splice(MAX_CARDS_IN_HAND - this.cards.length)
    this.cards.push(...newCards);
  }

  prepareToRound() {
    this.passed = false;
    this.board.reset();
    this.drawCards(NEW_ROUND_DRAW_CARDS_QUANTITY);
  }

  removeCardFromBoard(index, type) {
    const card = this.board.getCard(index, type);
    if (!card.new) {
      return;
    }

    const removed = this.board.removeCard(index, type);
    this.cards.push(removed);
  }
}
