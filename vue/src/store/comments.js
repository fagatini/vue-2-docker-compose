import comments from '@/data/comments_data'

export default {
  namespaced: true,
  state: {
    comments: JSON.parse(localStorage.getItem("comments")) ?? comments
  },
  getters: {
    getComments: (state) => state.comments,
    getCommentById: (state) => (id) => state.comments.find(i => i.id === id),
    getCommentsByRecipeId: (state) => (id) => state.comments.filter(i => i.recipe_id === id)
  },
  mutations: {
    SET_COMMENTS: (state, payload) => {
      state.comments = payload
    },
    ADD_COMMENT: (state, payload) => {
      state.comments.push(payload)
      localStorage.setItem('comments', JSON.stringify(state.comments))
    }
  },
  actions: {
    loadComments: (context, payload = []) => {
      context.commit('SET_COMMENTS', payload)
    },
    addComment: (context, payload) => {
      context.commit('ADD_COMMENT', payload)
    }
  }
}