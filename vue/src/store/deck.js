import cardStore from "./cards";

export default {
  namespaced: true,
  state: {
    startingDeck: [],
    deck: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 1, 2 ],
    hand: [0, 1, 2, 3, 3,],
    drawPile: [1, 2,],
    discardPile: [0, 0, 1, 1, 1, 2, 2],
  },
  getters: {
    getDeck: (state) => state.deck.map((index) => cardStore.state.cards[index]),
    getHand: (state) => state.hand.map((index) => cardStore.state.cards[index]),
    getDrawPile: (state) => state.drawPile.map((index) => cardStore.state.cards[index]),
    getDiscardPile: (state) => state.discardPile.map((index) => cardStore.state.cards[index]),
  },
};
