import comments from '@/data/comments_data'

export default {
  namespaced: true,
  state: {
    comments: JSON.parse(localStorage.getItem("comments")) ?? comments 
  },
  getters: {
    getComments: (state) => state.comments,
    getCommentById: (state) => (id) => state.comments.find(i => i.id === id),
    getCommentsByRecipeId: (state) => (id) => state.comments.filter(i => i.recipeId === id)
  },
  mutations: {
    SET_COMMENTS: (state, payload) => {
      state.comments = payload
      localStorage.setItem('comments', JSON.stringify(state.comments))
    },
    ADD_COMMENT: (state, payload) => {
      state.comments.push(payload)
      localStorage.setItem('comments', JSON.stringify(state.comments))
    },
    REMOVE_COMMENT: (state, id) => {
      let hasReqId = (item) => item.id === id
      let index = state.comments.findIndex(hasReqId)
      if (index > -1) {
        state.comments.splice(index, 1)
      }
    }
  },
  actions: {
    loadComments: (context, payload) => {
      context.commit('SET_COMMENTS', payload)
    },
    addComment: (context, payload) => {
      context.commit('ADD_COMMENT', payload)
    },
    removeComment: (context, id) => {
      context.commit('ADD_COMMENT', id)
    }
  }
}