import { Registry } from '~/types/registry'

type State = {
  registries: Registry[]
  currentRegistry: Registry | null
}

export const state = (): State => ({
  registries: [],
  currentRegistry: null,
})

export const getters = {
  getRegistries: (state: State) => state.registries,
  getCurrentRegistry: (state: State) => state.currentRegistry,
}

export const mutations = {
  setRegistries(state: State, registries: Registry[]) {
    state.registries = registries
  },
  setCurrentRegistry(state: State, registry: Registry) {
    state.currentRegistry = registry
  },
}

export const actions = {
  async fetchRegistries({ commit, rootState }: any) {
    const { data } = await (this as any).$axios.$get(
      `/users/${rootState.users.currentUser.id}/registries`
    )

    commit('setRegistries', data)
  },
  async updateRegistry({ dispatch, rootState }: any, registry: Registry) {
    await (this as any).$axios.$put(
      `/users/${rootState.users.currentUser.id}/registries/${registry.id}`,
      { registry }
    )

    dispatch('fetchRegistries')
  },
}
