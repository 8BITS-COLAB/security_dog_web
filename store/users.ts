import { User } from '../types/user'

type State = {
  currentUser: User | null
}

export const state = (): State => ({
  currentUser: null,
})

export const getters = {
  getCurrentUser: (state: State) => state.currentUser,
}

export const mutations = {
  setCurrentUser(state: State, user: User) {
    state.currentUser = user
  },
}

export const actions = {
  async fetchCurrentUser({ commit }: any) {
    const { data } = await (this as any).$axios.$get('/auth/profile')

    commit('setCurrentUser', data)
  },
}
