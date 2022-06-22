type State = {
  error: string
}

export const state = (): State => ({
  error: '',
})

export const getters = {
  getError: (state: State) => state.error,
}

export const mutations = {
  setError(state: State, error: string) {
    state.error = error
  },
}
