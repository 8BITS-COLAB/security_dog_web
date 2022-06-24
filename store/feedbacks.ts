type State = {
  feedback: string
}

export const state = (): State => ({
  feedback: '',
})

export const getters = {
  getFeedback: (state: State) => state.feedback,
}

export const mutations = {
  setFeedback(state: State, feedback: string) {
    state.feedback = feedback
  },
}
