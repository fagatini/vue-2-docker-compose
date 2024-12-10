export const DECK = [
    {id: 0, name: "Ведро", rank: 2},
    {id: 1, name: "Ложка", rank: 3},
    {id: 2, name: "Крот", rank: 3},
    {id: 3, name: "Дупло", rank: 4},
    {id: 4, name: "Спица", rank: 6},
    {id: 5, name: "Кулак", rank: 7},
    {id: 6, name: "Камень", rank: 7},
    {id: 7, name: "Ящерица", rank: 8},
    {id: 8, name: "Рогатка", rank: 9},
    {id: 9, name: "Солнце", rank: 10},
    {id: 11, name: "Булавка", rank: 5},
    {id: 12, name: "Палка", rank: 2},
    {id: 13, name: "Ножницы", rank: 6},
    {id: 14, name: "Бобр", rank: 11},
    {id: 15, name: "Кирпич", rank: 11},
    {id: 16, name: "Жаба", rank: 4},
    {id: 17, name: "Журавль", rank: 8},
    {id: 18, name: "Бумага", rank: 2},
    {id: 19, name: "Коробка", rank: 2},
    {id: 20, name: "Песок", rank: 5},
  ]

export const WinnerStates = {
    NONE : 'NONE',
    PLAYER_WINS : 'PLAYER_WINS',
    BOT_WINS : 'BOT_WINS',
    DRAW : 'DRAW',
}

export const TurnStates = {
    PLAYER : 'PLAYER',
    BOT : 'BOT',
}

export const POINTS_TO_WIN = 10;

export const MAX_CARDS_IN_HAND = 10;