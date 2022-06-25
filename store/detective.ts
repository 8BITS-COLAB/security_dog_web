type Breach = {
  has_password: boolean
  password: string
  sha1: string
  sources: string[]
}

type State = {
  breaches: Breach[]
}

export const state = (): State => ({
  breaches: [],
})

export const mutations = {
  setBreaches(state: State, breaches: Breach[]) {
    state.breaches = breaches
  },
}

export const getters = {
  getBreaches: (state: State) => state.breaches,
}

export const actions = {
  async fetchBreaches({ commit }: any, key: string) {
    const breaches = await (this as any).$axios.$get(`/detective`, {
      params: {
        key,
      },
    })

    if (!breaches) {
      commit('feedbacks/setFeedback', 'No breaches found', { root: true })
    }

    commit('setBreaches', breaches || [])
  },
}
