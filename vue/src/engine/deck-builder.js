export class DeckBuilder {
  
  constructor(deckSize, minRank, maxRank, cardsNames) {
    this.deckSize = deckSize
    this.minRank = minRank
    this.maxRank = maxRank
    this.cardsNames = cardsNames
  }

  generateDeck() {
    let deck = []
    for (let i = 0; i < this.deckSize; i++) {
      deck.push({
        id: i,
        name: this.cardsNames[Math.floor(Math.random() * this.cardsNames.length)],
        rank: Math.floor(Math.random() * (this.maxRank - this.minRank + 1) + 1)
      })
    }
    return deck
  }

}