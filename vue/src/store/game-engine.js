import { GameEngine } from "@/engine/game-engine";

export default {
    namespaced: true,
    state: {
        engine: new GameEngine()
    },
    getters: {
        getPlayerCards: (state) => state.engine.player.cards,
        getBotCards: (state) => state.engine.bot.cards,
        getCardsOnBoard: (state) => state.engine.board,
        getPlayerScore: (state) => state.engine.player.gameScore,
        getBotScore: (state) => state.engine.bot.gameScore,
        getTurn: (state) => state.engine.turn,
        getWinner: (state) => state.engine.winner
    },
    mutations: {
        MAKE_PLAYER_MOVE: (state, cardId) => {
            state.engine.makePlayerMove(cardId)
        },
        START_NEW_GAME: (state) => {
            state.engine.startNewGame()
        },
    },
    actions: {
        makePlayerMove: (context, cardId) => {
            context.commit('MAKE_PLAYER_MOVE', cardId)
        },
        startNewGame: (context) => {
            context.commit('START_NEW_GAME')
        }
    }
}