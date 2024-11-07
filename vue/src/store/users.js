import users from '@/data/users_data'

export default {
  namespaced: true,
  state: {
    users: JSON.parse(localStorage.getItem("users")) ?? users
  },
  getters: {
    getUserById: (state) => (id) => state.users.find(i => i.id === id),
  },
  mutations: {
    SET_USERS: (state, payload) => {
      state.users = payload
    },
    ADD_USER: (state, payload) => {
      state.users.push(payload)
      localStorage.setItem('users', JSON.stringify(state.users))
    }
  },
  actions: {
    loadUsers: (context, payload = []) => {
      context.commit('SET_USERS', payload)
    },
    addUser: (context, payload) => {
      context.commit('ADD_USER', payload)
    }
  }
}