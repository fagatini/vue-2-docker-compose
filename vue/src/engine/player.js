export class Player{
    cards = [];
    gameScore = 0;
    handSize = 10;

    playCard(cardId){
        let cardIndex = this.cards.findIndex(card => card.id == cardId);
        let card = this.cards[cardIndex];
        this.cards.splice(cardIndex, 1);
        return card;
    }
}